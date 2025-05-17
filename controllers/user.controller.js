import { User } from "../models/user.model.js";
import { checkEmpty } from "../utils/checkempty.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!checkEmpty(name, email, password)) {
        return res.json({
            message: "all feilds are required"
        });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try {
        user = await User.create({
            name,
            email,
            password: hashedPassword
        });
    } catch (error) {
        return res.json({
            message: "server error",
            error: error
        });
    }

    if (!user) {
        return res.json({
            message: "user not registered"
        });
    }

    let token;
    try {
        token = jwt.sign({ userId: user._id }, "hfuhergfrgrthgtyihrtjoyopijtprpyretytorwoprtrkpk");
    } catch (error) {
        return res.json({
            message: "server error",
            error: error
        });
    }

    if (!token) {
        return res.json({
            message: "token not generated"
        });
    }

    return res.json({
        message: "password hashed",
        token,
        name: user.name,
        email: user.email
    });

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!checkEmpty(email, password)) {
        return res.json({
            message: "all feilds are required"
        });
    }
    let user;
    try {
        user = await User.findOne({ email: email });
    } catch (error) {
        return res.json({
            message: "server error",
            error: error.message
        });
    }
    if (!user) {
        return res.json({
            message: "user not found invalid email"
        });
    }
    let isMatchedPassword;

    try {
        isMatchedPassword = await bcrypt.compare(password, user.password);
    } catch (error) {
        return res.status(500).json({
            message: "Server error while comparing passwords",
            error: error.message
        });
    }

    // Optional: check if password matches and handle accordingly
    if (!isMatchedPassword) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }


    if (!isMatchedPassword) {
        return res.json({
            message: "password not matched"
        });
    }

    let token;
    try {
        token = jwt.sign({ userId: user._id }, "hfuhergfrgrthgtyihrtjoyopijtprpyretytorwoprtrkpk")
    } catch (error) {
        return res.json({
            message: "server error",
            error: error.message
        });
    }
    if (!token) {
        return res.json({
            message: "token not generated"
        });
    }

    return res.json({
        message: "user logged in successfully",
        token: token,
        user
    })
}

export const getUserById = async (req, res) => {
   
    let user;
    try {
        user = await User.findById({ _id: req.user });
    } catch (error) {
        return res.json({
            message: "server error",
            error: error.message
        });
    }
    if (!user) {
        return res.json({
            message: "user not found"
        });
    }

    return res.json({
        message: "user get successfully",
        user: user
    });
}