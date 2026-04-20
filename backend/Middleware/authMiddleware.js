const jwt=require("jsonwebtoken");

const authMidlleware = ((req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log("Authorization header: ", !authHeader);
        // console.log("authHeader starts with 'Bearer ': ", authHeader && authHeader.startsWith("Bearer "));
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            // console.log("Missing or invalid Authorization header.");
            return res.status(401).json({ msg: "Unauthorized."});
        }
        const token = authHeader.split(" ")[1];
        // console.log("Extracted token: ", token);
        // console.log("SECRET:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded user from token: ", decoded);
        req.user=decoded;
        next();
    }
    catch(err) {
        // console.log("Token verification error: ", err.message);
        return res.status(401).json({ msg: "Invalid token."});
    }
})

module.exports=authMidlleware;