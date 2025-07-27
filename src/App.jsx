import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./context/ThemeContext";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Item } from "./components/Item";
import Contact from "./pages/Contact";
import { SearchContext } from "./context/SearchContext";
import { AddCart } from "./pages/AddCart";
import { DashboardHome } from "./dashboard/DashboardHome";
import { UploadProduct } from "./dashboard/UploadProduct";
import { UpdateProduct } from "./dashboard/UpdateProduct";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import { Footer } from "./pages/Footer";
import { AboutUs } from "./pages/AboutUs";
import Razorpay from "./components/Razorpay";
import Payment from "./components/Payment";
import { ProductConetxt } from "./context/ProductContext";

export const App = () => {
  const [theme, setTheme] = useState("light");
  const [mobileView, setMobileView] = useState(false);
  const [productDetails, setProductDetails] = useState({});

  const [searchTerm, setSearchTerm] = useState();
  return (
    <>
      <Router>
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <ThemeContext.Provider
            value={{ theme, setTheme, mobileView, setMobileView }}
          >
            <ProductConetxt.Provider
              value={{ productDetails, setProductDetails }}
            >
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Item />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/oredred" element={<Razorpay />} />
                <Route path="/payment" element={<Payment />} />

                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/addcart" element={<AddCart />} />
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/product/update/:id" element={<UpdateProduct />} />
                <Route
                  path="/dashboard/uploadproduct"
                  element={<UploadProduct />}
                />
              </Routes>
              <Footer />
            </ProductConetxt.Provider>
          </ThemeContext.Provider>
        </SearchContext.Provider>
      </Router>
    </>
  );
};
