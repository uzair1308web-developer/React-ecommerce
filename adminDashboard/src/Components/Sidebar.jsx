import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { TbCategoryPlus } from "react-icons/tb";
import { IoBagCheckOutline, IoImagesOutline } from 'react-icons/io5'
import { GiNewspaper } from 'react-icons/gi'
import { BsBoxes } from "react-icons/bs";
import { MyContext } from '../App'
import { RiMenu2Line } from 'react-icons/ri'



const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null)
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    }

    const context = useContext(MyContext)
    const { isSidebarOpen } = context;


    return (
        <aside className='left-0  h-full fixed top-0 w-[inherit] z-[66] bg-zinc-800' >
            <div className='w-full relative'>
                <div className={`px-3 cursor-pointer absolute top-4 z-[99999] -right-12 ${isSidebarOpen && 'rounded-full aspect-square flex items-center bg-zinc-900 shadow-lg'}`} onClick={() => {
                    setOpenDropdown(null)
                    context.setIsSidebarOpen(!context.isSidebarOpen)
                }}>
                    <RiMenu2Line className='text-[18px] text-white' />
                </div>
                <div className='p-4 border-zinc-700'>
                    <h2 className={`text-2xl text-white ${isSidebarOpen ? 'max-w-full' : 'max-w-0 opacity-0'} transition-all duration-300 overflow-hidden}`}>{isSidebarOpen ? "Dashboard" : "D"}</h2>
                </div>

                <ul className={`flex-1 ${!isSidebarOpen && 'max-sm:hidden'}`}>

                    <li className='mb-3'>
                        <Link to="" onClick={() => context.setIsSidebarOpen(false)}>
                            <Button className='w-full !capitalize !justify-start flex gap-3  !py-2 !text-white'>
                                <RxDashboard className='text-lg' /> <span className={`${isSidebarOpen ? 'max-w-full' : 'max-w-0'} transition-all duration-300 overflow-hidden`}>Dashboard</span>
                            </Button>
                        </Link>
                    </li>

                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => {
                            toggleDropdown("banner")
                            if (!isSidebarOpen) {
                                context.setIsSidebarOpen(true)
                            }
                        }} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize  flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <TbCategoryPlus className='text-lg' />
                                <span className={`${isSidebarOpen ? 'max-w-full' : 'max-w-0'} transition-all duration-300 overflow-hidden`}>Slider Banner</span>
                                <span className={`ml-auto ${!isSidebarOpen && 'hidden'}`}>
                                    {
                                        openDropdown === "category" ? (
                                            <IoIosArrowForward className='text-white transform rotate-90' />
                                        ) : (
                                            <IoIosArrowForward className="text-white " />
                                        )
                                    }
                                </span>
                            </Button>
                        </div>
                        {openDropdown === "banner" && (
                            <ul className='ml-4'>
                                <li><Link to="/add-banner" onClick={() => { context.setIsSidebarOpen(false) }} className="block py-2 px-4 hover:bg-gray-700 text-white">Add Banner</Link></li>
                                <li><Link to="/view-banner" onClick={() => { context.setIsSidebarOpen(false) }} className="block py-2 px-4 hover:bg-gray-700 text-white">View Banner</Link></li>
                            </ul>
                        )}
                    </li>
                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => {
                            toggleDropdown("category")
                            if (!isSidebarOpen) {
                                context.setIsSidebarOpen(true)
                            }
                        }} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize overflow-hidden flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <TbCategoryPlus className='text-lg' />
                                <span className={`${isSidebarOpen ? 'max-w-full' : 'max-w-0'} transition-all duration-300 overflow-hidden`}>Category</span>
                                <span className={`ml-auto ${!isSidebarOpen && 'hidden'}`} onClick={() => context.setIsSidebarOpen(!isSidebarOpen)}>
                                    {
                                        openDropdown === "category" ? (
                                            <IoIosArrowForward className='text-white transform rotate-90' />
                                        ) : (
                                            <IoIosArrowForward className="text-white " />
                                        )
                                    }
                                </span>
                            </Button>
                        </div>
                        {openDropdown === "category" && (
                            <ul className='ml-4'>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/add-category" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Category</Link></li>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/add-subcategory" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Sub Category</Link></li>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/show-category" className="block py-2 px-4 hover:bg-gray-700 text-white">Show Category</Link></li>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/sub-category" className="block py-2 px-4 hover:bg-gray-700 text-white">Sub Category</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => {
                            toggleDropdown("product")
                            if (!isSidebarOpen) {
                                context.setIsSidebarOpen(true)
                            }
                        }} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize  flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <BsBoxes className='text-lg' />
                                <span className={`${isSidebarOpen ? 'max-w-full' : 'max-w-0'} transition-all duration-300 overflow-hidden`}>Product</span>
                                <span className={`ml-auto ${!isSidebarOpen && 'hidden'}`}>
                                    {
                                        openDropdown === "product" ? (
                                            <IoIosArrowForward className='text-white transform rotate-90' />
                                        ) : (
                                            <IoIosArrowForward className="text-white " />
                                        )
                                    }
                                </span>
                            </Button>
                        </div>
                        {openDropdown === "product" && (
                            <ul className='ml-4'>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/add-product" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Product</Link></li>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/show-product" className="block py-2 px-4 hover:bg-gray-700 text-white">Show Product</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => {
                            toggleDropdown("Blogs")
                            if (!isSidebarOpen) {
                                context.setIsSidebarOpen(true)
                            }
                        }} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize  flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <GiNewspaper className='text-lg' />
                                <span className={`${isSidebarOpen ? 'max-w-full' : 'max-w-0'} transition-all duration-300 overflow-hidden`}> Blogs</span>
                                <span className={`ml-auto ${!isSidebarOpen && 'hidden'}`}>
                                    {openDropdown === "Blogs" ? (

                                        <IoIosArrowForward className='text-white transform rotate-90' />
                                    ) : (
                                        <IoIosArrowForward className="text-white " />
                                    )
                                    }
                                </span>
                            </Button>
                        </div>
                        {openDropdown === "Blogs" && (
                            <ul className='ml-4'>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/add-blogs" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Blogs</Link></li>
                                <li><Link onClick={() => { context.setIsSidebarOpen(false) }} to="/show-blogs" className="block py-2 px-4 hover:bg-gray-700 text-white">Show Blogs</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className=''>
                        <Link onClick={() => { context.setIsSidebarOpen(false) }} to="/orders" className='w-full !capitalize  justify-start items-center flex gap-3 py-2 px-2 hover:bg-gray-700 text-white'>
                            <IoBagCheckOutline className='text-lg' /><span className={`${isSidebarOpen ? 'max-w-full' : 'max-w-0'} transition-all duration-300 overflow-hidden`}>Orders</span>
                        </Link>
                    </li>

                </ul>

            </div>
        </aside>
    )
}

export default Sidebar



