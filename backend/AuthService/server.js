const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./authRoutes.js'));

const PORT=process.env.PORT||5002;

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Auth Service running on port ${PORT}`);
    })
}).catch(err => console.log("Error loading auth mongoose")); 