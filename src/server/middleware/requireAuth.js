import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";



const verifyToken = (token) => {

    try {

        return jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            throw new Error("Token expired");
        } else if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token");
        }
        throw new Error("Authorization error");
    }

};



const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers;



    if (!authorization || !authorization.startsWith("Bearer ")) {

        return res.status(401).json({ error: "Authorization token required" });

    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = verifyToken(token);
        const user = await User.findOne({ _id }).select('_id isLogged');
        
        req.user = user;
        next();

    } catch (error) {

        console.log(error.message);

        if (error.message === "Token expired") {
            return res.status(403).json({ error: "Token expired" });
        }

        res.status(401).json({ error: error.message });
    }

};

export { requireAuth };
