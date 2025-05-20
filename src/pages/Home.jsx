import { useContext, useEffect, useState } from "react";
import { Slider } from "../components/Slider";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { getAllproducts } from "../../api";

export const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    try {
      const res = await getAllproducts();
      console.log(res.data.response);
      setProducts(res.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <section
        className={`flex flex-col items-center justify-center min-h-screen p-10 transition-colors duration-300 ${
          theme === "light"
            ? "bg-black text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <h2 className="text-4xl font-bold mb-10">Welcome to Our Store</h2>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {items?.map((item, index) => (
            <motion.li
              key={index}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-xl shadow-md hover:shadow-xl transition-all`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="text-sm font-medium text-gray-500">
                  Qty: {item.Qty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-green-600 font-bold">₹{item.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-1 transition-all"
                >
                  Buy Now
                </motion.button>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="w-full mt-10 mb-10">
          <Slider products={products} category="Popular Products" />
        </div>
      </section>
    </>
  );
};
