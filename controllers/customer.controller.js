import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";



export const addToCart = async (req, res) => {
  const { id } = req.params; // product ID
  const userId = req.user;   // assuming auth middleware sets req.user to userId

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not authenticated" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product already in user's cart (assuming carts is array of ObjectIds)
    const productInCart = user.carts.some(cartProdId => cartProdId.equals(product._id));
    if (productInCart) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    // Add product to user's cart
    user.carts.push(product._id);
    await user.save();

    // Add user to product's cartUsers
    if (!product.cartUsers) {
      product.cartUsers = [];
    }
    const userInProductCart = product.cartUsers.some(cartUserId => cartUserId.equals(user._id));
    if (!userInProductCart) {
      product.cartUsers.push(user._id);
      await product.save();
    }

    return res.status(200).json({ message: "Product added to cart successfully" });

  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


export const deleteCartProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.user;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Remove product from user's cart
        user.carts = user.carts.filter(productId => productId.toString() !== id);
        await user.save();

        // Remove user from product's cartUsers
        product.cartUsers = product.cartUsers.filter(cartUserId => cartUserId.toString() !== userId);
        await product.save();

        return res.status(200).json({ message: "Product removed from cart successfully" });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export const getCartProducts = async (req, res) => {
  try {
    // Assuming req.user is populated by your auth middleware
    const userId = req.user;

    // Find user and populate carts (product details)
    const user = await User.findById(userId).populate("carts");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send back the populated carts array
    res.json({ carts: user.carts });
  } catch (error) {
    console.error("Error in getCartProducts:", error);
    res.status(500).json({ message: "Server error" });
  }
};



