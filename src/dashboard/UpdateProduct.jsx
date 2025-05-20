import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../utils/checkToken";
import { motion } from "framer-motion";

export const UpdateProduct = () => {
  const imageRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({ name: "", description: "", price: "", Qty: "", image: "" });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://buyboddy-backend.onrender.com/api/product/${id}`);
        // const response = await axios.get(`http://localhost:5000/api/product/${id}`);
       
        setProductData(response.data.response);
        setImagePreview(response.data.response.image.url);
      } catch (err) {
        alert("Failed to load product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageReference = () => {
    imageRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setProductData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    try {
      const res=await axios.put(`https://buyboddy-backend.onrender.com/api/product/${id}`, productData, {
      // const res=await axios.put(`http://localhost:5000/api/product/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to update product");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-2xl w-full mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200 mt-10"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="border-2 border-dashed border-blue-300 p-8 rounded-xl flex flex-col items-center mb-6"
      >
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product Preview"
            className="w-40 h-40 mb-4 object-cover rounded-lg shadow"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          name="image"
          ref={imageRef}
          onChange={handleImageChange}
        />
        <button
          onClick={handleImageReference}
          className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Upload Product Image
        </button>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <textarea
          placeholder="Product Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none resize-none"
        />
        <input
          type="number"
          placeholder="Product Price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <input
          type="number"
          placeholder="Product Quantity"
          name="Qty"
          value={productData.Qty}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
        />

        <div className="flex justify-center pt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Update Now
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
};
