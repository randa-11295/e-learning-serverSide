const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    }
   
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("courses",coursesSchema)
module.exports={Course}