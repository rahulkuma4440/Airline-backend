const bcrypt=require("bcryptjs");
const User=require("../model/User.js");
const jwt=require("jsonwebtoken");

exports.login=async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user=await User.findOne({email});
        if(!user) {
            return res.status(400).json({  msg: "Invalid email or password" });
        }

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const token=jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.status(200).json({
            msg: "Login successful",
            token
        })

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

exports.register=async(req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingUser=await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user=await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token=jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.status(201).json({
            msg: "User registered successfully",
            token
        })

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}