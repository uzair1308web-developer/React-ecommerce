import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import AddCategory from './Pages/AddCategory'
import Preview from './Pages/Preview'
import { createContext, useEffect, useState } from 'react'
import AddProduct from './Pages/AddProduct'
import ShowProdCategory from './Pages/ShowProdCategory'
import ShowProduct from './Pages/ShowProduct'
import SignUp from './Pages/SignUp'
import toast, { Toaster } from 'react-hot-toast'
import VerifyOtp from './Pages/verifyOtp'
import Login from './Pages/Login'
import { fetchDataFromApi } from './utils/api'
import EditCategory from './Pages/EditCategory'
import ShowSubCategory from './Pages/ShowSubCategory'
import AddSubCategory from './Pages/AddSubCategory'
import EditProduct from './Pages/EditProduct'
import ProductDetail from './Pages/ProductDetail'
import AddBanner from './Pages/AddBanner'
import ViewBanner from './Pages/ViewBanner'
import AddStock from './Pages/AddStock'
export const MyContext = createContext()

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const [userData, setUserData] = useState(null)
  const [catData, setCatData] = useState([]);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  }

  const token = localStorage.getItem('accesstoken');
  useEffect(() => {
    const fetchUser = async () => {
      if (token !== undefined && token !== null && token !== "") {
        setIsLogin(true);
        fetchDataFromApi(`/api/user/user-details`).then((res) => {
          setUserData(res?.data)
          if (res?.data?.error === true) {
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");
            openAlertBox("error", "Your session has expired, please login again")
            setIsLogin(false);
          }
        })
      } else {
        setIsLogin(false);
      }
    }

    fetchUser()
  }, [token])

  useEffect(() => {
    getCat()
  }, [])

  const getCat = () => {
    fetchDataFromApi(`/api/category`).then((res) => {
      setCatData(res?.data);
    })
  }

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    catData,
    getCat,
    setCatData,
  };



  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Routes >
          <Route path='signup' element={<SignUp />} />
          <Route path='verify-otp' element={<VerifyOtp />} />
          <Route path='login' element={<Login />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<Preview />} />
            <Route path='add-category' element={<AddCategory />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='add-stock/:id' element={<AddStock />} />
            <Route path='add-banner' element={<AddBanner />} />
            <Route path='view-banner' element={<ViewBanner />} />
            <Route path='edit-product/:id' element={<EditProduct />} />
            <Route path='add-subcategory' element={<AddSubCategory />} />
            <Route path='edit-category/:id' element={<EditCategory />} />
            <Route path='product-detail/:id' element={<ProductDetail />} />
            <Route path='show-category' element={<ShowProdCategory />} />
            <Route path='sub-category' element={<ShowSubCategory />} />
            <Route path='show-product' element={<ShowProduct />} />
          </Route>
        </Routes>
        <Toaster />
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export default App
