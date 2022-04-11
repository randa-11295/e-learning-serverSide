const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
    },
    cart:[
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref:"courses"
    }    ]
  },


  {
    timestamps: true,
  }
);


const User = mongoose.model("users",userSchema)
// const Address = mongoose.model("Users.address", addressSchema)

module.exports={User }