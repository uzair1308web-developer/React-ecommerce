import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosLogOut, IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


import Navigation from '../Navigation';
import { MyContext } from '../../App';
import { FiUser } from 'react-icons/fi';
import { fetchDataFromApi } from '../../utils/api';
import { FaRegHeart, FaUser } from 'react-icons/fa6';
import { useEffect } from 'react';

const Index = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const [anchorE1, setAnchorE1] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false);
    // const open = Boolean(anchorE1);

    const logout = () => {
        // setAnchorE1(null);
        const apiData = fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('token')}`, { withCredentials: true })
        if (apiData) {
            // console.log(apiData)/
            context.setIsLogin(false)
            context.setCart([])
            context.openAlertBox('success', 'Logout successfully')
            localStorage.clear()
            navigate('/')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && context.query) {
            navigate(`/search?query=${context.query}`)
        }
    }

    useEffect(() => {
        const handleClickOutside = () => setMenuOpen(false);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleMenu = (e) => {
        e.stopPropagation(); // prevent click bubbling
        setMenuOpen(prev => !prev);
    };

    return (
        <header className='bg-white shadow-lg sticky top-0 z-[99]'>
            {/* <div className='top-strip border-t border-b border-zinc-200'>
                <div className='container'>
                    <div className='flex flex-col md:flex-row justify-between  items-center p-2 '>
                        <div className='col1 lg:w-[50%] text-center'>
                            <p className='lg:text-sm text-xs'>Get up to 50% off new season styles, limited time only</p>
                        </div>
                        <div className='max-sm:hidden'>
                            <ul className='flex items-center gap-4 text-sm'>
                                <li>Help Center</li>
                                <li>Order Tracking</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='border-b border-zinc-200 py-2'>
                <div className='flex justify-between items-center p-2'>
                    <div className="container flex items-center justify-between">
                        <div className="col1 w-[25%]">
                            <Link to="/" className="lg:text-2xl text-sm font-bold">SITEINMAKING</Link>
                        </div>

                        <div className="col2 w-[40%] hidden md:block">
                            <div className="searchBox w-[100%]  bg-[#e5e5e5] rounded-[5px] relative p-2" onKeyDown={handleKeyDown}>
                                <input type="text" value={context.query} onChange={(e) => context.setQuery(e.target.value)} placeholder="Search for products" className="w-[90%] h-full bg-transparent outline-none" />
                                <button className="absolute right-0 top-0 bottom-0 rounded-[5px] p-2 cursor-pointer" onClick={() => navigate(`/search?query=${context.query}`)} >
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
                                        <div className='relative cursor-pointer'>
                                            <div className='flex items-center justify-center gap-2' onClick={toggleMenu}>
                                                <div className='text-xl bg-zinc-300 p-2 rounded-full flex justify-center items-center cursor-pointer'>
                                                    <FiUser />
                                                </div>
                                                <span className='hidden lg:block'>
                                                    {context?.userData?.email}
                                                </span>
                                            </div>
                                            {menuOpen && (
                                                <div className='absolute top-8 left-[40px] w-[250px] z-[99] bg-white shadow-lg p-2'>
                                                    <ul className='py-2'>
                                                        <li className=''>
                                                            <Link to="/my-account" className='flex py-2 px-2 mb-2 items-center gap-2 cursor-pointer hover:bg-zinc-200'>
                                                                <FaUser />
                                                                <span>Profile</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <div onClick={logout} className='flex items-center gap-2 cursor-pointer hover:bg-zinc-200 py-2 px-2'>
                                                                <IoIosLogOut />
                                                                <span> Logout</span>
                                                            </div>
                                                        </li>
                                                       
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex items-center justify-center gap-2 text-xl'>
                                            <span><FaRegHeart /></span>
                                            <span><FaShoppingBag /></span>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-b border-zinc-200 py-2'>
                <Navigation />
            </div>
        </header>
    )
}

export default Index
