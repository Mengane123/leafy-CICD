import React,{ useState, useEffect, useContext } from 'react'
import SessionContext from "./context/Session";
import Filter from '../components/Navigation/Filter';
import Show from '../components/Navigation/Show';
import NewUser from '../components/Navigation/NewUser';
import Userpage from '../components/Navigation/Userpage';
import Working from '../components/Working';
import Forms from '../components/Forms';
import Formes from '../components/Formes';
import Admin from '../components/Admin';
import NewAdmin from '../components/NewAdmin';
import Userinfo from '../components/admindashdata/Userinfo';
import Profile from '../components/User/Profile';
import SingleProduct from '../components/ProductScreen/SingleProduct';
import AddToCartButton from '../components/ProductScreen/AddToCartButton';
import AddToCartPage from '../components/ProductScreen/AddToCartPage';
import ShoppingCart from '../components/ProductScreen/ShoppingCart';
import About from '../components/About';
import Mumbai from '../components/VendorLocation/Mumbai';
import Pune from '../components/VendorLocation/Pune';
import Thane from '../components/VendorLocation/Thane';
import Satara from '../components/VendorLocation/Satara';
import Admindashboard from '../components/Admindashboard';
import Footer from '../components/Navigation/Footer';
import SessionState from '../context/SessionState';
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Routing = () => {
    const [hideNavbar, setHideNavbar] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const session = useContext(SessionContext);
  useEffect(() => {
    if (window.location.pathname === "/Show") {
      // corrected window.location.pathname
      setHideNavbar(true);
      setHideHeader(true);
      setHideFooter(true);
    } else {
      setHideNavbar(false);
      setHideHeader(false);
      setHideFooter(false);
    }
  }, []);

  const handleLogin = () => {
    // Perform user authentication (e.g., login with credentials)
    // After successful login, update isLoggedIn state to true
    if(session.sessionId != 0) {
      console.log("Session Created: ", session.sessionId);
    }
    setIsLoggedIn(true);
  };

  const handleAddToCart = (item) => {
    // Implement the logic to add the item to the cart
    console.log("Item added to cart:", item);
  };
  return (
    <>
      <SessionState>
      <BrowserRouter>
        {!hideHeader && <Header />}
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
            <Route
              path="/Account"
              element={<Account handleLogin={handleLogin} />}
            />
          )}
          <Route path="/Filter" element={<Filter />} />
          <Route path="/Show" element={<Show />} />
          <Route path="/NewUser" element={<NewUser />} />
          <Route path="/Userpage" element={<Userpage />} />
          <Route path="*" element={<Error />} />
          <Route path="/Working" element={<Working />} />
          <Route path="/Forms" element={<Forms />} />
          <Route path="/Formes" element={<Formes />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/newadmin" element={<NewAdmin />} />
          <Route path="/userinfo" element={<Userinfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/SingleProduct/:id"
            element={<SingleProduct data={data} />}
          />{" "}
          {/* Pass handleAddToCart as prop */}
          <Route
            path="/SingleProduct/:id"
            element={<SingleProduct data={data2} />}
          />{" "}
          {/* Pass handleAddToCart as prop */}
          <Route path="/AddToCartButton" element={<AddToCartButton />} />
          <Route path="/addtocartpage" element={<AddToCartPage />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/About" element={<About />} />
          <Route path="/mumbai" element={<Mumbai />} />
          <Route path="/pune" element={<Pune />} />
          <Route path="/thane" element={<Thane />} />
          <Route path="/satara" element={<Satara />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
        </Routes>
        {!hideFooter && <Footer />}
      </BrowserRouter>
    </SessionState>
    </>
  )
}

export default Routing
