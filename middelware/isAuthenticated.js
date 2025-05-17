import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const isAutehnticated = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({
            message: "unauthrized person"
        });
    }
    let token;
    try {
        token = authHeader.split(' ')[1];
    } catch (error) {
        return res.json({
            message: "server error",
            error: error.message
        });
    }
    if (!token) {
        return res.json({
            message: "token not found"
        });
    }

    const decoded = jwt.verify(token, "hfuhergfrgrthgtyihrtjoyopijtprpyretytorwoprtrkpk");

    if (!decoded.userId) {
        return res.json({
            message: "user id not found"
        });
    }

    let user;

    try {
        user = await User.findById({ _id: decoded.userId })
    } catch (error) {
        return res.json({
            message: "server error",
            error: error.message
        })
    }

    if (!user) {
        return res.json({
            message: "user  not found"
        });
    }

    req.user = user._id;
    next();

}