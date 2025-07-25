import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { SearchContext } from "../context/SearchContext";
import { getAuthToken } from "../utils/checkToken";
import { ThemeContext } from "../context/ThemeContext";

export const DashboardHome = () => {
  const { searchTerm } = useContext(SearchContext);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const token = getAuthToken();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-4s44.onrender.com/api/product/all"
          //  "http://localhost:5000/api/product/all"
        
        );
        setProducts(response.data?.response);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products: " + err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://backend-4s44.onrender.com/api/product/${id}`,
        // `http://localhost:5000/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert(res.data.message);
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/product/update/${id}`);
  };

  const filteredProducts = searchTerm
    ? products?.filter((product) =>
        Object.values(product).some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        )
      )
    : products;

  const groupedByCategory = filteredProducts?.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  if (loading)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-10 text-gray-600"
      >
        Loading products...
      </motion.p>
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div
      className={
        theme === "light"
          ? "bg-black text-white p-10"
          : "bg-white text-black p-10"
      }
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mx-8 my-5 "
      >
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <Link to="/dashboard/uploadproduct">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-transform"
          >
            Upload Product +
          </motion.button>
        </Link>
      </motion.div>

      <div className="space-y-10">
        {groupedByCategory &&
          Object.keys(groupedByCategory).map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 underline underline-offset-4 decoration-blue-500">
                {category}
              </h2>
              <ul className="flex flex-wrap items-center justify-start gap-8">
                {groupedByCategory[category].map((product) => (
                  <motion.li
                    key={product?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-5 rounded-xl border border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-white transform transition-transform hover:shadow-xl"
                  >
                    <div className="block">
                      <motion.div
                        className="w-64 h-64 rounded-xl overflow-hidden shadow-md"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={product?.image?.url}
                          alt="product"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </motion.div>
                      <h3 className="text-xl font-semibold mt-4 text-gray-700">
                        {product?.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        From ₹{product?.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(product?._id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-transform"
                      >
                        Delete
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdate(product?._id)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-transform"
                      >
                        Update
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};
