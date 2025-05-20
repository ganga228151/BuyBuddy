import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { SearchContext } from "../context/SearchContext";
import { getAuthToken } from "../utils/checkToken";
import { ProductConetxt } from "../context/ProductContext";

export const Slider = ({ products }) => {
  const { searchTerm } = useContext(SearchContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const navigate = useNavigate();
  const { setProductDetails } = useContext(ProductConetxt);

  // 🔍 Search filtering
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        Object.values(product).some((value) =>
          String(value || "").toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
      )
    : products;

  // 🔄 Grouping products by category
  const groupedProducts = filteredProducts.reduce((groups, product) => {
    const category = product.category || "Uncategorized";
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});

  // 🛒 Buy Now Handler
  const handleBuyNow = (product) => {
    setProductDetails(product);
    navigate("/payment");
  };

  // ✅ Order Submit
  const submitOrder = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        "https://buyboddy-backend.onrender.com/api/user/place-order",
        {
          productId: selectedProduct._id,
          productName: selectedProduct.name,
          quantity,
          customerName,
          customerAddress,
          paymentId: "fake_payment_id",
          orderId: "fake_order_id",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setShowForm(false);
    } catch (error) {
      console.error("Order Error:", error);
      setMessage(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="mb-28">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="mb-12">
          <h1 className="text-3xl font-bold mb-5">{category}</h1>
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {categoryProducts.map((product) => (
              <motion.li
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-xl shadow-lg bg-gradient-to-br from-gray-50 to-white hover:shadow-xl"
              >
                <Link to={`product/${product._id}`}>
                  <motion.div
                    className="w-48 h-48 rounded-xl shadow-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={product.image?.url}
                      alt="product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold mt-3 text-gray-700">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-medium">From ₹{product.price}</p>
                </Link>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="py-2 px-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}

      {/* 🧾 Order Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-blue-500 p-6 rounded-xl shadow-lg w-96"
            >
              <h2 className="text-lg font-bold mb-3 text-gray-700">
                Order {selectedProduct?.name}
              </h2>

              <label className="block mb-2">Product Name:</label>
              <input
                type="text"
                value={selectedProduct?.name}
                disabled
                className="border p-2 w-full mb-3 rounded-md "
              />

              <label className="block mb-2">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-2 w-full mb-3 rounded-md"
              />

              <label className="block mb-2">Customer Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setCustomerName(e.target.value)}
                className="border p-2 w-full mb-3 rounded-md"
              />

              <label className="block mb-2">Customer Address:</label>
              <textarea
                placeholder="Enter your address"
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="border p-2 w-full mb-3 rounded-md"
              />

              <div className="flex gap-3">
                <motion.button
                  onClick={submitOrder}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                  Confirm Order
                </motion.button>
                <motion.button
                  onClick={() => setShowForm(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gray-400 text-white p-2 rounded-md"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-green-500 font-bold mt-5"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};
