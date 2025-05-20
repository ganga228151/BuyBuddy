import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { getAuthToken } from "../utils/checkToken";
import Razorpay from "./Razorpay";
import { ProductConetxt } from "../context/ProductContext";
import BargainBot from "./BargainBot";

export const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
    const {setProductDetails}=useContext(ProductConetxt);

  // Submit order to backend
  const submitOrder = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        "https://buyboddy-backend.onrender.com/api/user/place-order",
        // "http://localhost:5000/api/user/place-order",
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
      navigate("/payment")
    } catch (error) {
      setMessage(error.response?.data?.message || "Order failed");
    }
  };

  // Fetch product data from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://buyboddy-backend.onrender.com/api/product/${id}`
          // `http://localhost:5000/api/product/${id}`
        );
        setProduct(response.data.response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add product to cart
  const handleOrderedProducts = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `https://buyboddy-backend.onrender.com/api/user/add-to-cart/${id}`,
        // `http://localhost:5000/api/user/add-to-cart/${id}`,
      
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/addcart");
    } catch (error) {
      alert(error.response?.data?.message + " Failed to add to cart");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">Product not found</p>;

  const handleBuyNow = (product) => {
  setProductDetails(product);
  navigate("/payment")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex-1 lg:flex items-center justify-center p-6">
      <motion.section
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white  p-8 rounded-lg shadow-lg w-full max-w-3xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.img
            src={product.image?.url}
            alt={product.name}
            className="w-64 h-64 rounded-lg object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-semibold">Price: ₹{product.price}</p>
            <p className="text-lg">Quantity: {product.Qty || 0}</p>
            <p className="text-lg">Category: {product.category || "N/A"}</p>
            <div className="flex gap-4 mt-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                onClick={() => handleOrderedProducts(product._id)}
              >
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-green-600 text-white px-4 py-2 rounded shadow"
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </motion.button>
              {/* <Razorpay/> */}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white p-6 rounded shadow-md w-96">
                <h3 className="text-xl font-semibold mb-4">Order {selectedProduct?.name}</h3>
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2 border rounded mb-3"
                />
                <label>Customer Name:</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 border rounded mb-3"
                />
                <label>Customer Address:</label>
                <textarea
                  placeholder="Your Address"
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full p-2 border rounded mb-3"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={submitOrder}
                  className="bg-blue-600 text-white w-full py-2 rounded mb-2"
                >
                  Confirm Order
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowForm(false)}
                  className="bg-gray-600 text-white w-full py-2 rounded"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {message && (
          <p className="text-center text-green-500 font-semibold mt-4">
            {message}
          </p>
        )}
      </motion.section>
      <BargainBot originalPrice={product.price}/>
    </div>
  );
};
