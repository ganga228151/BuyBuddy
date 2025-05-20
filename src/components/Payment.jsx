import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductConetxt } from "../context/ProductContext";

const Payment = () => {
  const navigate = useNavigate();
  const { productDetails } = useContext(ProductConetxt);
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [scanner, setScanner] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.cardNumber || !form.expiry || !form.cvv) {
      return setError("All fields are required");
    }

    if (form.cardNumber.length !== 16 || isNaN(form.cardNumber)) {
      return setError("Invalid card number");
    }

    if (form.cvv.length !== 3 || isNaN(form.cvv)) {
      return setError("Invalid CVV");
    }

    setError("");
    // Fake success and navigate
    alert("Payment Successful!");
    navigate("/oredred", {
      state: {
        product: {
          name: "Premium Face Serum",
          price: productDetails.price,
          productId: productDetails._id,
          productName: productDetails.name,
          productDescription: productDetails.description,
          productCategory: productDetails.category,
          productQty: productDetails.Qty,
          productImage: productDetails.image,
          productImageUrl: productDetails.image.url,
          productImagePublicId: productDetails.image.public_id,
        },
      },
    });
  };

  const handleCashOnDelivery = () => {
    // Fake success and navigate
    alert("Cash on Delivery Selected!");
    navigate("/oredred", {
      state: {
        product: {
          name: "Premium Face Serum",
          price: productDetails.price,
          productId: productDetails._id,
          productName: productDetails.name,
          productDescription: productDetails.description,
          productCategory: productDetails.category,
          productQty: productDetails.Qty,
          productImage: productDetails.image,
          productImageUrl: productDetails.image.url,
          productImagePublicId: productDetails.image.public_id,
        },
      },
    });
  };
  const handleScan = () => {
    // Fake success and navigate
    alert("Scan to Pay Selected!");
    // open pop up for scan
    // scanner ? setScanner(false) : setScanner(true);

    navigate("/oredred", {
      state: {
        product: {
          price: productDetails.price,
          productId: productDetails._id,
          productName: productDetails.name,
          productDescription: productDetails.description,
          productCategory: productDetails.category,
          productQty: productDetails.Qty,
          productImage: productDetails.image,
          productImageUrl: productDetails.image.url,
          productImagePublicId: productDetails.image.public_id,
        },
      },
    });
  };
  // const handleScan = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl space-y-4 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Card Payment
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          maxLength="16"
          value={form.cardNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            maxLength="5"
            value={form.expiry}
            onChange={handleChange}
            className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            maxLength="3"
            value={form.cvv}
            onChange={handleChange}
            className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Pay ₹ {productDetails.price}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleCashOnDelivery}
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          cash on delivery
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleScan}
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Pay with scan
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Payment;
