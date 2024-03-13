const Razorpay = require("razorpay");
const Order = require("../models/orders");
require("dotenv").config();

exports.purchasePremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      const purchaseOrder = new Order({
        orderId: order.id,
        status: "PENDING",
        userId: req.user._id,
      });
      purchaseOrder.save();

      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (error) {
    res.status(403).json({ message: "something went wrong", error: error });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    await Order.findOneAndUpdate(
      { orderId: order_id },
      {
        $set: {
          paymentId: payment_id,
          status: "SUCCESSFUL",
        },
      }
    );
    await req.user.updateOne({ isPremium: true });
    return res
      .status(202)
      .json({ success: true, message: "Transaction Successfull" });
  } catch (error) {
    res.status(403).json({ message: "something went wrong", error: error });
  }
};
