const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const connectDB = async ()=>{
    // const conn= await mongoose.connect(process.env.MONGO_URI, {
    const conn= await mongoose.connect('mongodb+srv://Peem:0858@vacqcluster.5vzfl.mongodb.net/VacQAssignment5?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        // useUnifiedTopologu: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports=connectDB;