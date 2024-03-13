const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema({
  id: {
    type: Schema.Types.UUID,
    required: true,
  },
  isActive: Boolean,
  userId:{
    type:Schema.Types.ObjectId,
    required: true
  }

});

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);
