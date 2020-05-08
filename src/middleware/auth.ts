import jwt from 'jsonwebtoken';
import config from '../config';
import {NextFunction, Request, Response} from "express";
import UserModel from "../models/UserModel";

export async function auth(req: Request | any, res: Response, next: NextFunction) {
    const token = req.header('Auth-Token');

    if(!token) res.status(401).json({success: false, error: 'Not authorized'});

    try {
        // verify token
        const decoded: any = jwt.verify(token!, config.jwtSecret);

        // add user to request
        req.user = await UserModel.findById(decoded.id).exec();
        next();
    } catch (e) {
        return res.status(401).json({success: false, error: e.message || e || 'Unknown error occurred'})
    }
}

export async function authAdmin(req: Request | any, res: Response, next: NextFunction) {
    await auth(req, res, () => {
        console.log(req.user)
        if(req.user.roles?.includes('admin')) {
            next();
        } else {
            res.json({success: false, error: 'You are not an admin'})
        }
    })
}
