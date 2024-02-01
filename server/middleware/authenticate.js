const jwt = require("jsonwebtoken");
const userSchema = require("../Model/userSchema");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        
        const rootUser = await userSchema.findOne({ _id : verifyToken._id });

        if (!rootUser) { throw new Error("User not found") }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (error) {
        res.status(401).json({ error : error.message });
    }
}

module.exports = authenticate;