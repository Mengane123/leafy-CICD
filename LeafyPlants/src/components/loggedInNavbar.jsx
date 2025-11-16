import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const loggedInNavbar = () => {
  const links = [
    {
      id:1,
      link: "/collections/plants",
      title: "Plants",
    },
    {
      id:2,
      link: "/collections/seeds",
      title: "Seeds",
    },
    {
      id:3,
      link: "/collections/service",
      title: "Service",
    },
    {
      id:4,
      link: "/collections/GTools",
      title: "Gardening Accessories",
    },
    {
       id:5,
      link: "/collections/Contact",
      title: "Contact us",
    },
    // {
    //   id:6,
    //   link: "/collections/blog",
    //   title: "Blog",
    // },
  ];
  return (
    <div className="flex items-center justify-between px-12 py-5 font-semibold bg-[#fff6f4]">
      <div>
        <div>
      <NavLink to="/"><img src="logo" alt="logo" /></NavLink>        
        </div>
        <div>
          <ul className="flex items-center gap-8 mx-32">
            {links?.map((link) => (
              <li key={link.id}>
                <NavLink to = {link.link} className="uppercase text-[#0f4c3c]" href={link.link}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-96 flex items-center gap-5">
        <div id="search-box" className="flex flex-1 items-center px-4 bg-white rounded-full overflow-hidden">
          <input
            className="focus:outline-none text-xs font-normal w-full py-3 bg-transparent"
            type="search"
            placeholder="Search for plants, seeds and planters..."
          />
          <CiSearch size={20} className="cursor-pointer"/>
        </div>
     <NavLink to="/Userpage "><FaUserLarge size={20} /></NavLink>
        
        <NavLink to="/Filter" className = "relative">
          <HiOutlineShoppingCart size={23}/>
        <span className="w-6 h-6 text-xs absolute bg-green-500 text-white rounded-full flex items-center justify-center -top-4 left-3">10</span></NavLink>
        
      </div>
    </div>
  );
};

export default loggedInNavbar;
