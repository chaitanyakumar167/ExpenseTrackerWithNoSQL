const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPremium:{
    type:Boolean,
    default:false
  },
  totalExpenses:{
    type:Number,
    default:0
  }
});

module.exports = mongoose.model('User',userSchema);
