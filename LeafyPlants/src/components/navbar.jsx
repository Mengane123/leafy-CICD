import React, { useContext, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import SessionContext from "../context/Session";
import { useCartStore } from "../store/CartStore";
import ShoppingCart from "./ProductScreen/ShoppingCart";
 // Make sure this import is correct

const Navbar = () => {
  const session = useContext(SessionContext);
  const { sessionId, role } = useContext(SessionContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Ref to control the ShoppingCart modal
  const cartRef = useRef();

  const { cart } = useCartStore((state) => ({
    cart: state.cart,
  }));

  const handleLoginClick = () => {
    if (sessionId >= 0) {
      if (role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/UserPage');
      }
    } else {
      navigate('/Account');
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const links = [
    { id: 1, link: "/collections/plants", title: "Plants" },
    { id: 3, link: "/collections/service", title: "Service" },
    { id: 4, link: "/collections/GTools", title: "Gardening Accessories" },
    { id: 5, link: "/collections/Contact", title: "Contact us" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      if (query.includes("plant")) {
        navigate(`/collections/plants`);
      } else if (query.includes("gardening") || query.includes("Water tools") || query.includes("gardening tools") ||  query.includes("tools")) {
        navigate(`/collections/GTools`);
      } else {
        alert("No matching results found.");
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-12 py-5 font-semibold bg-[#fff6f4] min-h-[2rem] max-h-[3.5rem] shadow-md z-50">
      {/* Mobile menu icon */}
      <div className="md:hidden flex items-center">
        <div onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
          {menuOpen ? <IoCloseSharp size={28} /> : <TiThMenu size={28} />}
        </div>
      </div>

      {/* Logo */}
      <div className="flex-1 text-center md:flex-none">
        <NavLink to="/">
          <h1 className="text-green-500 font-bold text-xl md:text-2xl">LeafyPlants</h1>
        </NavLink>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex flex-row items-center gap-4 md:gap-8 mx-auto">
        {links?.map((link) => (
          <li key={link.id} className="list-none">
            <NavLink
              to={link.link}
              className="uppercase text-[#0f4c3c] text-sm md:text-base whitespace-nowrap"
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Search box and icons */}
      <div className="flex items-center gap-3 md:gap-5">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div id="search-box" className="flex flex-1 items-center px-4 bg-white rounded-full overflow-hidden min-w-[10rem] max-w-[20rem]">
            <input
              className="focus:outline-none text-xs md:text-sm font-normal w-full py-2 md:py-3 bg-transparent"
              type="search"
              placeholder="Search for plants, seeds, gardening tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch size={20} className="cursor-pointer" onClick={handleSearch} />
          </div>
        </form>

        {/* User icon */}
        <div className="flex items-center cursor-pointer" onClick={handleLoginClick}>
          <FaUserLarge size={24} />
        </div>

        {/* Shopping cart icon */}
        <div className="relative cursor-pointer" onClick={() => cartRef.current?.open()}>
          <HiOutlineShoppingCart size={23} />
          {totalItems > 0 && (
            <span className="absolute top-[-12px] right-[-10px] inline-flex items-center justify-center p-[6px] w-6 h-6 bg-green-500 text-white text-xs font-bold leading-none rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="absolute left-0 top-12 w-full bg-[#fff6f4] flex flex-col items-start gap-4 py-4 px-6 md:hidden z-10 min-h-[10rem] max-h-[20rem]">
          {links?.map((link) => (
            <li key={link.id} className="list-none w-full border-b border-gray-300">
              <NavLink
                to={link.link}
                className="uppercase text-[#0f4c3c] text-base py-2 block"
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      
      {/* Pass ref to ShoppingCart */}
      <ShoppingCart ref={cartRef} />
    </div>
  );
};

export default Navbar;
