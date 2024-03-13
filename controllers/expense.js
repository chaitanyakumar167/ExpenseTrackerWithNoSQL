const Expense = require("../models/expense");

const User = require("../models/user");
const UserServices = require("../services/userservices");

exports.postAddExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;

    const expense = new Expense({
      amount: amount,
      description: description,
      category: category,
      userId: req.user._id,
    });
    await expense.save();
    // const a = await User.updateOne(
    //   { _id: req.user._id },
    //   { totalExpenses: req.user.totalExpenses + amount }
    // );

    // amount is string type converting to num using + +
    req.user.totalExpenses = req.user.totalExpenses + +amount;
    req.user.save();
    return res.status(201).json(expense.id);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findByIdAndDelete(id);
    const amount = expense.amount;
    req.user.totalExpenses -= amount;
    req.user.save();
    res.status(200).json({ message: "delete sucessful" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// exports.getAllExpenses = async (req, res, next) => {
//   try {
//     const expenses = await Expense.find({userId:req.user._id});
//     res.json(expenses);
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// };

exports.getExpenses = async (req, res) => {
  try {
    const page = +req.query.page;
    const ITEMS_PER_PAGE = +req.body.numberOfRows;
    const totalExpenses = await Expense.countDocuments({
      userId: req.user._id,
    });
    const Expenses = await Expense.find({ userId: req.user._id }).select("-userId")
      .limit(ITEMS_PER_PAGE)
      .skip((page - 1) * ITEMS_PER_PAGE);
    res.status(200).json({
      Expenses: Expenses,
      currentPage: page,
      hasNextPage: page * ITEMS_PER_PAGE < totalExpenses,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalExpenses / ITEMS_PER_PAGE),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

exports.isPremiumUser = (req, res) => {
  return res.status(202).json(req.user.isPremium);
};
