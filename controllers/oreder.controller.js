import crypto from "crypto";
// import { razorpay } from "../utils/razorpayInstance.js";
import "dotenv/config"
import { User } from "../models/user.model.js";
// import mongoose from "mongoose";
export const createOrder = async (req, res) => {
  try {
    console.log("Create order request body:", req.body);
    const userId = req.user;

    const {
      productId,
      productName,
      quantity,
      customerName,
      customerAddress,
      paymentId,
      orderId,
    } = req.body;

    if (!productId || !productName || !quantity || !customerName || !customerAddress) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newOrder = {
      product: productId,
      productName,
      quantity,
      customerName,
      customerAddress,
      paymentId: paymentId || "",
      orderId: orderId || "",
      createdAt: new Date(),
    };

    user.orders.push(newOrder);
    await user.save();

    console.log("Order saved successfully for user:", userId);

    return res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user; // auth middleware se aayega

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    try {
        const user = await User.findById(userId).populate("carts");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Convert cart to orders
        const newOrders = user.carts.map(product => ({
            product: product._id,
            quantity: 1,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id
        }));

        user.orders.push(...newOrders);

        // Optionally clear cart after ordering
        user.carts = [];

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Payment verified and order placed",
            orders: newOrders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

