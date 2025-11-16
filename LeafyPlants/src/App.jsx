    import React, { useState, useEffect,useRef, useContext } from "react";
    import { BrowserRouter, Route, Routes} from "react-router-dom";
    import "./App.css";
    import Header from "./components/header";
    import Navbar from "./components/navbar";
    import Homepage from "./components/homepage";
    import Plants from "./components/Navigation/Plants";
    import Seeds from "./components/Navigation/Seeds";
    import Service from "./components/Navigation/Service";
    import Pcare from "./components/Navigation/Pcare";
    import Contact from "./components/Navigation/Contact";
    import Error from "./components/Navigation/Error";
    import Footer from "./components/Navigation/Footer";
    import Account from "./components/Navigation/Account";
    import NewUser from "./components/Navigation/NewUser";
    import Userpage from "./components/Navigation/Userpage";
   
    import Show from "./components/Navigation/Show";
    import Working from "./components/Working";
    import Forms from "./components/Forms";
    import Formes from "./components/Formes";
    import SingleProduct from "./components/ProductScreen/SingleProduct";
    import ShoppingCart from "./components/ProductScreen/ShoppingCart";
    import Admin from "./components/Admin";
    import Mumbai from "./components/VendorLocation/Mumbai";
    import Pune from "./components/VendorLocation/Pune";
    import Thane from "./components/VendorLocation/Thane";
    import Satara from "./components/VendorLocation/Satara";
    import About from "./components/About";
    import Admindashboard from "./components/Admindashboard";
    import SessionState from "./context/SessionState";
    import SessionContext from "./context/Session";
    import AdminSessionContext from "./context/AdminSessionContext";
    // import AdminSessionState from "./context/AdminSessionState";
    import NewAdmin from "./components/NewAdmin";
    import Userinfo from "./components/admindashdata/Userinfo";
    import Profile from "./components/User/Profile";
    // import data1 from "./components/Data/data"; // Import data1
    // import data2 from "./components/Data/data2"; // Import data2
    import { useCartStore } from "./store/CartStore";
import Checkout from "./components/ProductScreen/Checkout";
import Orders from "./components/User/Orders";
import UserServices from "./components/User/UserServices";
import AdminServices from "./AdminServices";
import AdminContact from "./components/AdminContact";
function App() {
      const cartRef = useRef(); 
      const [hideNavbar, setHideNavbar] = useState(false);
      const [hideHeader, setHideHeader] = useState(false);
      const [hideFooter, setHideFooter] = useState(false);
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      // const [adminisLoggedIn, setAdminIsLoggedIn] = useState(false);
      const session = useContext(SessionContext);
      const AdminSession = useContext(AdminSessionContext);
      const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();
      useEffect(() => {
        if (window.location.pathname === "/show") {
          setHideNavbar(true);
          setHideHeader(true);
          setHideFooter(true);
        } else {
          setHideNavbar(false);
          setHideHeader(false);
          setHideFooter(false);
        }
      }, ["/show"]);

      const handleAddToCart = (item) => {
      addToCart(item);
      
       
      };
      

      const handleProductRemove = (productId) => {
        removeFromCart(productId);
      };

      const handleQuantityChange = (productId, newQuantity) => {
        updateQuantity(productId, newQuantity);
      };

      const handleLogin = () => {
        if (session.sessionId !== 0) {
          console.log("Session Created: ", session.sessionId);
        }
        setIsLoggedIn(true);
        
        window.location.href = "/Userpage";
      };
      const handleCheckout = () => {
        cartRef.current?.close(); // optionally close cart on checkout
      };
      // const AdminhandleLogin = () => {
      //   if (AdminSession.AdminSessionId !== 0) {
      //     console.log("Session Created: ", AdminSession.AdminSessionId);
      //   }
      //   setAdminIsLoggedIn(true);
      //   // Redirect to Userpage
      //   window.location.href = "/admindashboard";
      // };

      return (
        <SessionState>
          <BrowserRouter>
            {/* {!hideHeader && <Header />} */}
            {!hideNavbar && <Navbar />}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/collections/plants" element={<Plants />} />
              <Route path="/collections/seeds" element={<Seeds />} />
              <Route path="/collections/service" element={<Service />} />
              <Route path="/collections/GTools" element={<Pcare />} />
              <Route path="/collections/Contact" element={<Contact />} />
              {isLoggedIn ? (
      <Route path="/Userpage" element={<Userpage />} />
    ) : (
      <Route path="/Account" element={<Account handleLogin={handleLogin} />} />
    )}
      <Route path="/admindashboard" element={<Admindashboard  />} />
  
              <Route path="/Show" element={<Show />} />
              <Route path="/NewUser" element={<NewUser />} />
              <Route path="*" element={<Error />} />
              <Route path="/Working" element={<Working />} />
              <Route path="/Forms" element={<Forms />} />
              <Route path="/Form" element={<Formes />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/newadmin" element={<NewAdmin />} />
              <Route path="/AdminDashboard/Userinfo" element={<Userinfo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/Userpage" element={<Userpage />} />
              <Route path="/user_orders" element={<Orders />} />
              <Route path="/AdminDashboard/Services" element={<AdminServices/>} />
              <Route path="/AdminDashboard/Contact" element={<AdminContact/>} />
              <Route path="/SingleProduct/:id" element={<SingleProduct />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="//userservice" element={<UserServices />} />
              <Route path="/About" element={<About />} />
              <Route path="/mumbai" element={<Mumbai />} />
              <Route path="/pune" element={<Pune />} />
              <Route path="/thane" element={<Thane />} />
              <Route path="/satara" element={<Satara />} />
        
            </Routes>
            {!hideFooter && <Footer />}
          </BrowserRouter>
         

        </SessionState>
      );
    }

    export default App;
