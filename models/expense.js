const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId:{
    type:Schema.Types.ObjectId,
    required:true
  }
});

expenseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Expense',expenseSchema);
