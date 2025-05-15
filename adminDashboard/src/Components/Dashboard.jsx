import React, { useContext, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { MyContext } from '../App'
import { fetchDataFromApi } from '../utils/api'
import Navbar from './Navbar'


const Dashboard = () => {
    const context = useContext(MyContext)
    const navigate = useNavigate()

    const token = localStorage.getItem('accesstoken');
    useEffect(() => {
        const fetchUser = async () => {
            if (token !== undefined && token !== null && token !== "") {
                context.setIsLogin(true);
                fetchDataFromApi(`/api/user/user-details`).then((res) => {
                    // context.setUserData(res.data)
                    if (res?.data?.error === true) {
                        localStorage.removeItem("accesstoken");
                        localStorage.removeItem("refreshtoken");
                        context.openAlertBox("error", "Your session has expired, please login again")
                        navigate('/login')
                        context.setIsLogin(false);
                    }
                })
            } else {
                navigate('/login')
                context.setIsLogin(false);
            }
        }
        fetchUser()
    }, [token])

 

    const { isSidebarOpen } = useContext(MyContext)
    return (
        <>
        <Navbar />
        <div className='flex w-full justify-between'>

            <div className={` ${isSidebarOpen ? 'w-[18%]' : 'w-[10%]'} transition-all duration-300 bg-zinc-800 relative`}>
                <Sidebar />
            </div>
            <div className={`${isSidebarOpen ? 'w-[82%]' : 'w-[95%]'} p-4 transition-all duration-300 `}>
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default Dashboard
