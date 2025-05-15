import { createContext, useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import ProductListing from './pages/ProductListing';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import toast, { Toaster } from 'react-hot-toast';
import VerifyOtp from './pages/VerifyOtp';
import { fetchDataFromApi } from './utils/api';
import ForgotPassword from './pages/ForgotPassword';
import MyAccount from './pages/MyAccount';
import Address from './pages/MyAccount/address';
const alertBox = (msg, type) => {
  if (type === "success") {
    toast.success(msg)
  }
  if (type === "error") {
    toast.error(msg)
  }
}
export const MyContext = createContext()

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null)
  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState( localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);

  const token = localStorage.getItem('accesstoken');
  useEffect(() => {
    const fetchUser = async () => {
      if (token !== undefined && token !== null && token !== "") {
        setIsLogin(true);
        fetchDataFromApi(`/api/user/user-details`).then((res) => {
          setUserData(res.data)
          if (res.response.data.error === true) {
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");
            alertBox("error", "Your session has expired, please login again")
            setIsLogin(false);
          }
        })
      } else {
        setIsLogin(false);
      }
    }
    fetchUser()
  }, [token])

  

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  }

  const values = {
    isLogin,
    setIsLogin,
    alertBox,
    openAlertBox,
    setUserData,
    setAddress,
    userData,
    cart,
    setCart
  }


  return (
    <BrowserRouter>
      <>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/address"} exact={true} element={<Address />} />
            <Route path={"/product-listing/:name/"} exact={true} element={<ProductListing />} />
            <Route path={"/product-listing/:name/:subCat"} exact={true} element={<ProductListing />} />
            <Route path={"/product/:id"} exact={true} element={<ProductDetail />} />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/forgot-password"} exact={true} element={<ForgotPassword />} />
            <Route path={"/signup"} exact={true} element={<SignUp />} />
            <Route path={"/verifyOtp"} exact={true} element={<VerifyOtp />} />
            <Route path={"/cart"} exact={true} element={<Cart />} />
            <Route path={"/checkout"} exact={true} element={<Checkout />} />
          </Routes>
          <Toaster />
          <Footer />
        </MyContext.Provider>
      </>
    </BrowserRouter>

  )
}

export default App
