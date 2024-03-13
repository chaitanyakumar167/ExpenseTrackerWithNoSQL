const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileURLSchema = new Schema({
  url: String,
  userId:{
    type:Schema.Types.ObjectId,
    required:true
  }
});

module.exports = mongoose.model("FileURL",FileURLSchema);
