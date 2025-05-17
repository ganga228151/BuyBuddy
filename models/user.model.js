import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productName: String,
  quantity: {
    type: Number,
    default: 1,
  },
  customerName: String,
  customerAddress: String,
  paymentId: String,
  orderId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "owner"],
      default: "customer",
    },
    carts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    orders: [orderSchema],  // orders as array of orderSchema
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
