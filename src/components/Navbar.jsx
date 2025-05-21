import { useContext, useEffect, useState } from "react";
import { FaDashcube, FaSearch } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import { BiSolidCartAdd } from "react-icons/bi";

import { ThemeContext } from "../context/ThemeContext";
import { Search } from "./Search";
// import { navMenu } from "./navMenu";
import { SideBar } from "./SideBar";
import { Link } from "react-router-dom";
import { getAuthToken } from "../utils/checkToken";
import axios from "axios";
import { FaHome, FaPhone } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa";
import { RiProductHuntFill } from "react-icons/ri";
import { SiAuthelia } from "react-icons/si";
import { SiGnuprivacyguard } from "react-icons/si";
// import { BiSolidCartAdd } from "react-icons/bi";
export const Navbar = () => {
  const { theme, setMobileView, mobileView } = useContext(ThemeContext);
 const [role, setRole] = useState("");
  const handleOpenSidebar = () => {
    setMobileView(!mobileView);
  };
 const token = getAuthToken();
 
 const loadUser = async () => {
   let res;
   try {
     res = await axios.get(`http://localhost:5000/api/user`, {
    //  res = await axios.get(`https://buyboddy-backend.onrender.com/api/user`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     console.log(res);
        setRole(res?.data?.user?.role);

   } catch (error) {
     console.log(error.message);
   }
 };
 
 useEffect(() => {
   loadUser();
 }, []);

 const navMenu = [
  {
    url: "/",
    menu: "Home",
    icon: <FaHome size={25} />,
  },
  {
    url: "/contact",
    menu: "Contact",
    icon: <RiContactsFill size={25} />,
  },

  {
    url: "/login",
    menu: "Login",
    icon: <SiAuthelia size={25} />,
  },
  {
    url: "/signup",
    menu: "signup",
    icon: <SiGnuprivacyguard size={25} />,
  },
   role !== "admin" &&{
    url: "/addcart",
    menu: `Add cart`,
    icon: <BiSolidCartAdd size={25} />,
  },
   role == "admin" && {
      url: "/dashboard",
      menu: `Dashboard`,
      icon: <FaDashcube size={25} />,
    },
];
  return (
    <>
      {mobileView && (
        <>
          <div
            className="fixed inset-0 z-40 "
            onClick={handleOpenSidebar}
          ></div>
          <div className="z-50">
            <SideBar />
          </div>
        </>
      )}
      <header
        className={
          theme === "light"
            ? "flex items-center justify-between p-5 shadow-xl shadow-gray-300 bg-white text-gray-800"
            : "flex items-center justify-between p-5 shadow-xl shadow-gray-300 bg-black text-white"
        }
      >
        <div className="lg:flex hidden text-xl font-semibold text-indigo-600">
          Logo
        </div>
        <button
          className="lg:hidden flex items-center justify-center"
          onClick={handleOpenSidebar}
        >
          <VscThreeBars size={28} />
        </button>
        <nav>
          <ul className="lg:flex hidden items-center justify-center gap-3">
            {navMenu.map((item) => (
              <li
                key={item.menu}
                className="py-2 px-3 hover:bg-indigo-100 hover:text-indigo-800 rounded cursor-pointer transition-all"
              >
                {item.menu === "Add cart" ? (
                  <Link
                    to={item.url}
                    className="flex items-center justify-center gap-2"
                  >
                    <BiSolidCartAdd size={20} /> {item.menu}
                  </Link>
                ) : (
                  <Link to={item.url}>{item.menu}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Search />
      </header>
    </>
  );
};
