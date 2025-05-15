import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";

import Navigation from '../Navigation';
import { MyContext } from '../../App';
import { FiUser } from 'react-icons/fi';
import { fetchDataFromApi } from '../../utils/api';

const Index = () => {
    const context = useContext(MyContext);

    const [anchorE1, setAnchorE1] = useState(null)
    // const open = Boolean(anchorE1);

    const logout = () => {
        // setAnchorE1(null);

        const apiData = fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('token')}`, { withCredentials: true })
        if (apiData) {
            // console.log(apiData)/
            context.setIsLogin(false)
            localStorage.clear()
        }

    }

    return (
        <header className='bg-white shadow-lg'>
            <div className='top-strip border-t border-b border-zinc-200'>
                <div className='container'>
                    <div className='flex justify-between items-center p-2 '>
                        <div className='col1 w-[50%]'>
                            <p className='text-sm'>Get up to 50% off new season styles, limited time only</p>
                        </div>
                        <div>
                            <ul className='flex items-center gap-4 text-sm'>
                                <li>Help Center</li>
                                <li>Order Tracking</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-b border-zinc-200'>
                <div className='flex justify-between items-center p-2'>
                    <div className="container flex items-center justify-between">
                        <div className="col1 w-[25%]">
                            <Link to="/" className="text-2xl font-bold">SITEINMAKING</Link>
                        </div>
                        <div className="col2 w-[40%]">
                            <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
                                <input type="text" placeholder="Search for products" className="w-[90%] h-full bg-transparent outline-none" />
                                <button className="absolute right-0 top-0 bottom-0  rounded-[5px] p-2">
                                    <IoIosSearch className='text-xl' />
                                </button>
                            </div>
                        </div>
                        <div className='col3 w-[35%] flex items-center justify-end'>
                            {
                                context.isLogin === false ?
                                    <ul className="flex items-center gap-4">
                                        <li>
                                            <Link to="/login" data-discover="true">
                                                <i className="fas fa-user"></i>
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/signup" data-discover="true">
                                                <i className="fas fa-shopping-cart"></i>
                                                Register
                                            </Link>
                                        </li>
                                    </ul> :
                                    <div className='flex items-center justify-center gap-2'>
                                        <Link to='/my-account'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <div className='text-xl bg-zinc-300 p-2 rounded-full flex justify-center items-center cursor-pointer'>
                                                    <FiUser />
                                                </div>
                                                {context?.userData?.email}
                                            </div>
                                        </Link>
                                        <button onClick={logout} className='cursor-pointer'>Logout</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-b border-zinc-200'>
                <Navigation />
            </div>
        </header>
    )
}

export default Index
