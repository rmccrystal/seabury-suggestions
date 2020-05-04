import jwt from 'jsonwebtoken';
import config from '../config';
import {NextFunction, Request, Response} from "express";
import UserModel from "../models/UserModel";

export async function auth(req: Request | any, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');

    if(!token) res.status(401).json({success: false, error: 'No token provided'});

    try {
        // verify token
        const decoded: any = jwt.verify(token!, config.jwtSecret);

        // add user to request
        req.user = await UserModel.findById(decoded.id).exec();
        next();
    } catch (e) {
        return res.json({success: false, error: e.message || e || 'Unknown error occurred'})
    }
}

export async function authAdmin(req: Request | any, res: Response, next: NextFunction) {
    await auth(req, res, () => {
        if(req.user.roles?.includes('admin')) {
            next();
        } else {
            res.json({success: false, error: 'You are not an admin'})
        }
    })
}