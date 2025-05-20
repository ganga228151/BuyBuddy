import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { SearchContext } from "../context/SearchContext";
import { getAuthToken } from "../utils/checkToken";
import { ThemeContext } from "../context/ThemeContext";

export const AddCart = () => {
  const { searchTerm } = useContext(SearchContext);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { theme } = useContext(ThemeContext);

  // Fetch ordered products from backend
  const fetchOrderedProducts = async () => {
    try {
      const token = getAuthToken();
      const { data } = await axios.get(
        "https://buyboddy-backend.onrender.com/api/user/cart-products",
        // "http://localhost:5000/api/user/cart-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.carts?.length >= 0) {
        console.log("✅ Cart Products Fetched Successfully:");
        console.table(data?.carts);
      }

      setOrderedProducts(data?.carts || []);
    } catch (error) {
      console.error("❌ Error fetching cart products:");
      console.error(error.response?.data || error.message);
    }
  };

  // Remove product from the cart
  const removeProduct = async (id) => {
    try {
      const token = getAuthToken();
      await axios.delete(
        `https://buyboddy-backend.onrender.com/api/user/delete-from-cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("🗑️ Product removed successfully");
      setOrderedProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("❌ Error removing product:");
      console.error(error.response?.data || error.message);
      alert("⚠️ Failed to remove product from cart.");
    }
  };

  useEffect(() => {
    fetchOrderedProducts();
  }, []);

  return (
    <div
      className={
        theme === "light"
          ? "min-h-screen p-6 bg-black text-white"
          : "min-h-screen p-6 bg-white text-black"
      }
    >
      <h1 className="text-center text-4xl font-bold my-8">Your Cart</h1>

      <section className="flex flex-wrap justify-center gap-8">
        {orderedProducts?.length > 0 ? (
          orderedProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg w-80 hover:scale-105 transform transition duration-300"
            >
              <Link
                to={`/product/${product._id}`}
                className="block mb-4 text-center"
              >
                <motion.img
                  src={product.image?.url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                  whileHover={{ scale: 1.05 }}
                />
              </Link>
              <div className="mt-3">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {product?.name}
                </h3>
                <p className="text-lg text-gray-700">
                  Price: ₹{product?.price}
                </p>
                <p className="text-lg text-gray-700">
                  Quantity: {product?.Qty}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeProduct(product._id)}
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  Remove from Cart
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center text-white">
            <p className="text-2xl font-bold">No products in the cart.</p>
            <Link to="/" className="mt-4 text-lg underline">
              Continue Shopping
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
