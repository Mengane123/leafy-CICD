import React from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";

function Footer() {
  return (
    <>
      <div className="w-full p-3 bg-[#114c36] text-white text-center">
        {/* Flex layout for web view */}
        <div className="hidden md:flex justify-around gap-4 text-lg lg:text-xl font-bold font-serif">
          <span>Leafy Life Joy</span>
          <span>Leafy Life Joy</span>
          <span>Leafy Life Joy</span>
          <span>Leafy Life Joy</span>
          <span>Leafy Life Joy</span>
         
        </div>

        {/* Wrapped layout for mobile view */}
        <div className="flex md:hidden  justify-center font-bold font-serif gap-4 text-sm md:text-base">
          <span className="w-full text-center">Leafy Life Joy</span>
          <span className="w-full text-center">Leafy Life Joy</span>
          <span className="w-full text-center">Leafy Life Joy</span>
        </div>
      </div>

      {/* <div className="grid px-4 py-4 md:px-12 md:py-6 w-full shadow-inner text-[#114c36] bg-white">
        <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <li>
            <Link to="/mumbai" className="px-2 underline hover:text-[#114c36]">
              Mumbai
            </Link>
          </li>
          <li>
            <Link to="/pune" className="px-2 underline hover:text-[#114c36]">
              Pune
            </Link>
          </li>
          <li>
            <Link to="/satara" className="px-2 underline hover:text-[#114c36]">
              Satara
            </Link>
          </li>
          <li>
            <Link to="/thane" className="px-2 underline hover:text-[#114c36]">
              Thane
            </Link>
          </li>
        </ul>
      </div> */}

      <div className="grid px-4 py-6 md:px-12 md:py-8 text-[#114c36]">
        <ul className="flex flex-wrap gap-6 justify-center text-sm md:text-base md:justify-between">
          <li className="flex flex-col gap-2">
            <h4 className="font-semibold">ABOUT US</h4>
            <Link to="/About" className="hover:text-[#114c36]">Our story</Link>
          </li>

          <li className="flex flex-col gap-2 ">
            <h4 className="font-semibold">GET IN TOUCH</h4>
            <Link to="/admindashboard" className="hover:text-[#114c36]">Call: +919867581588</Link>
          </li>

          <li className="flex flex-col items-center">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Follow US</h2>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="https://www.facebook.com/" className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors">
                <ImFacebook2 />
              </Link>
              <Link to="https://web.telegram.org/k/" className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors">
                <PiTelegramLogo />
              </Link>
              <Link to="https://www.instagram.com/" className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors">
                <FaInstagram />
              </Link>
              <Link to="https://maps.app.goo.gl/D45LLJPxNRXZcHgZ8" className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors">
                <FiMapPin />
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <div className="py-4 text-center text-sm text-gray-600">
        <span>© {new Date().getFullYear()} Your Company. All rights reserved.</span>
      </div>
    </>
  );
}

export default Footer;
