//retrives envior
require('dotenv').config();

const mongoose = require("mongoose");

/*
1. improvement retrive database information from enviorment variables to hide database address
2. connection error now has better message if connection could not be made

*/
const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database`);
  }
  catch(error){
    console.log(`Unable to make a connection ${error.message}`)
    process.exit(1)
  }
};
 
module.exports = connectDB;
