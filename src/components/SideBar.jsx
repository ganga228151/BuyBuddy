import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

import { ThemeContext } from "../context/ThemeContext";
// import { navMenu } from "./navMenu";
import { Search } from "./Search";
import { getAuthToken } from "../utils/checkToken";
import axios from "axios";
import { FaDashcube, FaHome, FaPhone } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa";
import { RiProductHuntFill } from "react-icons/ri";
import { SiAuthelia } from "react-icons/si";
import { SiGnuprivacyguard } from "react-icons/si";
import { BiSolidCartAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
export const SideBar = () => {
  const { theme, setMobileView } = useContext(ThemeContext);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    setMobileView(false);
  };
  const token = getAuthToken();

  const loadUser = async () => {
    let res;
    try {
      res = await axios.get(`https://buyboddy-backend.onrender.com/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(res?.data?.user?.role);
      console.log(res);
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
    role !== "admin" && {
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

  const handeLogout = () => {
   const confirmLogout = window.confirm("Are you sure you want to logout?");

if (confirmLogout) {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  navigate("/login");
}
  };
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 shadow-xl transition-transform duration-300 ${
          theme === "light" ? "bg-white text-gray-800" : "bg-black text-white"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-600">Menu</h2>
          <button onClick={handleCloseSidebar} className="text-xl">
            <ImCross />
          </button>
        </div>
        <div className="px-4 py-3">
          <Search />
        </div>

        <nav className="mt-4">
          <ul className="flex flex-col gap-2 px-4">
            {navMenu.map((item) => (
              <li
                key={item.menu}
                className="py-2 px-3 rounded hover:bg-indigo-100 hover:text-indigo-800 transition-all"
              >
                <Link
                  to={item?.url}
                  className="flex items-center gap-3"
                  onClick={handleCloseSidebar}
                >
                  {item?.icon && <span>{item?.icon}</span>}
                  {item?.menu}
                </Link>
              </li>
            ))}
            <button
              className="bg-red-500 py-2 px-5 text-white font-normal"
              onClick={handeLogout}
            >
              Logout
            </button>
          </ul>
        </nav>
      </aside>
    </>
  );
};
