const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017/e-learning",
    {useNewUrlParser:true , useUnifiedTopology:true})
    mongoose.connection.on("error",
    console.error.bind(console,"Connection DB Error :"))
    
    mongoose.connection.once("open",()=>{
        console.log("db connection Successfully");
    })

}
module.exports={connectDB}