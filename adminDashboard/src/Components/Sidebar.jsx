import { Button } from '@mui/material'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { TbCategoryPlus } from "react-icons/tb";
import { IoBagCheckOutline, IoImagesOutline } from 'react-icons/io5'
import { GiNewspaper } from 'react-icons/gi'
import { BsBoxes } from "react-icons/bs";



const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null)
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    }


    return (
        <aside className='left-0  h-full fixed top-0 w-[inherit] z-[66] bg-zinc-800' >
            <div className='w-full'>

                <div className='p-4 border-b border-zinc-700'>
                    <h2 className='text-2xl text-white'>Dashboard</h2>
                </div>

                <ul className='flex-1'>

                    <li className='mb-3'>
                        <Link to="">
                            <Button className='w-full !capitalize !justify-start flex gap-3  !py-2 !text-white'>
                                <RxDashboard className='text-lg' /> <span>Dashboard</span>
                            </Button>
                        </Link>
                    </li>

                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => toggleDropdown("banner")} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize  flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <TbCategoryPlus className='text-lg' />
                                <span>Slider Banner</span>
                                <span className='ml-auto '>
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
                                <li><Link to="/add-banner" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Banner</Link></li>
                                <li><Link to="/view-banner" className="block py-2 px-4 hover:bg-gray-700 text-white">View Banner</Link></li>
                            </ul>
                        )}
                    </li>
                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => toggleDropdown("category")} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize  flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <TbCategoryPlus className='text-lg' />
                                <span>Category</span>
                                <span className='ml-auto '>
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
                                <li><Link to="/add-category" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Category</Link></li>
                                <li><Link to="/add-subcategory" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Sub Category</Link></li>
                                <li><Link to="/show-category" className="block py-2 px-4 hover:bg-gray-700 text-white">Show Category</Link></li>
                                <li><Link to="/sub-category" className="block py-2 px-4 hover:bg-gray-700 text-white">Sub Category</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => toggleDropdown("product")} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize  flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <BsBoxes className='text-lg' />
                                <span>Product</span>
                                <span className='ml-auto '>
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
                                <li><Link to="/add-product" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Product</Link></li>
                                <li><Link to="/show-product" className="block py-2 px-4 hover:bg-gray-700 text-white">Show Product</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className='mb-3 cursor-pointer'>
                        <div onClick={() => toggleDropdown("Blogs")} className=' hover:bg-gray-700 flex items-center '>
                            <Button className='!w-full !text-white !capitalize  flex !justify-start gap-3 px-4 !text-left !cursor-pointer !py-2'>
                                <GiNewspaper className='text-lg' />
                                <span> Blogs</span>
                                <span className='ml-auto '>
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
                                <li><Link to="/add-blogs" className="block py-2 px-4 hover:bg-gray-700 text-white">Add Blogs</Link></li>
                                <li><Link to="/show-blogs" className="block py-2 px-4 hover:bg-gray-700 text-white">Show Blogs</Link></li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-3  !py-2 !text-white'>
                            <IoBagCheckOutline className='text-lg' /> <span>Orders</span>
                        </Button>
                    </li>

                </ul>

            </div>
        </aside>
    )
}

export default Sidebar



