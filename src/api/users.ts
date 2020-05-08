import express from 'express';
import {compare, genSalt, hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/UserModel';
import {authAdmin} from "../middleware/auth";

// /api/users
const router = express.Router();

router.post('/create', authAdmin, async (req, res) => {
    const {username, password, roles} = req.body;

    // Verify args
    if (!username || !password) {
        return res.json({success: false, error: 'Username or password field empty'});
    }
    if (username.length < 3 || username.length > 16) {
        return res.json({success: false, error: 'Username must be between 3 and 16 characters'});
    }
    if (password.length < 6) {
        return res.json({success: false, error: 'Password must be at least 6 characters'});
    }

    // Check if user exists
    if (await UserModel.findOne({username}).exec()) {
        return res.json({success: false, error: `User with username ${username} already exists`});
    }

    try {
        const passwordHash = await hash(password, await genSalt(10));

        const newUser = new UserModel({
            username,
            password: passwordHash,
            roles,
        });

        // save new user to database
        await newUser.save();

        // Generate jwt token
        const token = jwt.sign(
            {id: newUser.id},
            config.jwtSecret,
            {expiresIn: 3600}
        )

        return res.json({success: true, data: {id: newUser.id, token: token}})
    } catch (e) {
        return res.json({success: false, error: e.message || e || 'Unknown error occurred'});
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    // Verify args
    if (!username || !password) {
        return res.json({success: false, error: 'Username or password field empty'});
    }

    const user: Document | any = await UserModel.findOne({username}).exec()
    // Check if user exists
    if (!user) {
        return res.json({success: false, error: `User with username ${username} does not exist`});
    }

    try {
        const valid = await compare(password, user.get('password'))
        if (!valid) {
            return res.json({success: false, error: 'Invalid password'});
        }

        // Generate jwt token
        const token = jwt.sign(
            {id: user.id},
            config.jwtSecret,
            {expiresIn: 86400}
        )

        return res.json({success: true, data: {id: user.id, roles: user.roles, token: token}})
    } catch (e) {
        return res.json({success: false, error: e.message || e || 'Unknown error occurred'});
    }
})

export default router;
