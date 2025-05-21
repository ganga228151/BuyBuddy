import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductConetxt } from "../context/ProductContext";

const Razorpay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [userLocation, setUserLocation] = useState("Loading...");
  const [fullAddress, setFullAddress] = useState("");
  const { productDetails } = useContext(ProductConetxt);

  useEffect(() => {
    if (!product) {
      navigate("/"); // redirect if no product data
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const address = data.address;
          const formattedAddress = `${address.road || ""}, ${
            address.suburb || ""
          }, ${address.city || address.town || address.village || ""}, ${
            address.state || ""
          }, ${address.postcode || ""}`;
          setUserLocation(
            address.city ||
              address.town ||
              address.village ||
              "Location not found"
          );
          setFullAddress(formattedAddress);
        } catch {
          setUserLocation("Location fetch failed");
          setFullAddress("Full address not available");
        }
      },
      () => {
        setUserLocation("Location access denied");
        setFullAddress("Full address not available");
      }
    );
  }, [product, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center bg-green-50 p-6"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 text-center border border-green-300">
        <img
          src={productDetails?.image?.url}
          alt={productDetails?.name}
          className="w-32 h-32 object-cover mx-auto mb-4 rounded-xl shadow"
        />
        <h2 className="text-2xl font-bold text-green-700 mb-2">
        Ordered Successful!
        </h2>
        <p className="text-gray-800 font-semibold">{productDetails?.name}</p>
        <p className="text-gray-600 mb-2">Price: ₹{productDetails?.price}</p>
        <p className="text-gray-500">City: {userLocation}</p>
        <p className="text-gray-500 mb-6">Full Address: {fullAddress}</p>

        <p className="text-green-700 font-medium mb-6">
          Your product delivered as soon as posible🚚📦
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
        >
          Go to product search
        </button>
      </div>
    </motion.div>
  );
};

export default Razorpay;
