const adminMiddleware=(req, res, next) => {
    console.log(req.user);
    console.log(req.name);
    if(req.user.role !="admin") {
        return res.status(403).json({ msg: "Access denied. Admins only." });
    }
    next();
};

module.exports=adminMiddleware;