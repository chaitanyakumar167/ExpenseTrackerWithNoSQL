const Expense = require("../models/expense");
const Users = require("../models/user");
const FileUrl = require("../models/fileurl")
const S3Services = require("../services/s3services");
const UserServices = require("../services/userservices");

exports.showLeaderBoard = async (req, res) => {
  try {
    const leaderBoardOfUsers = await Users.find()
      .select("id name totalExpenses")
      .sort({ totalExpenses: -1 });

    res.status(200).json(leaderBoardOfUsers);
  } catch (error) {
    res.status(403).json({ error: error });
  }
};

exports.downloadExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({userId:req.user._id});
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const filename = `Expenses${userId}/${new Date()}.txt`;
    const fileURL = await S3Services.uploadToS3(stringifiedExpenses, filename);
    const uploadFileUrl =new FileUrl({ url: fileURL,userId:req.user._id });
    uploadFileUrl.save()
    res.status(200).json({ fileURL, success: true });
  } catch (error) {
    res.status(500).json({ fileURL: "", success: false, message: error });
  }
};

exports.getAllDownloadHistory = async (req, res) => {
  try {
    const downloadHistory = await FileUrl.find({userId:req.user._id});
    res.status(200).json({ downloadHistory, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};
