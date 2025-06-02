import { Button } from '@mui/material'
import { RiMenu2Fill } from "react-icons/ri";
import React from 'react'
import { Link } from 'react-router-dom';
import CategoryPanel from './CategoryPanel';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import { useState } from 'react';


const Navigation = () => {
    const [isOpenCatPanel, setIsOpenCatPanel] = React.useState(false);
    const [catData, setCatData] = useState([]);

    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    }

    useEffect(() => {
        fetchDataFromApi("/api/category").then((res) => {
            console.log(res);
            if (res?.error === false) {
                setCatData(res?.data)
            }
        })
    }, [])

    return (
        <>
            <nav>
                <div className='container flex items-center justify-end'>
                    <div className='col_1 lg:w-[20%] w-full'>
                        <Button className='!text-black !text-sm !lg:text-base' onClick={openCategoryPanel}>
                            <RiMenu2Fill className='lg:text-2xl' /> Shop By Categories
                        </Button>
                    </div>
                    <div className='col_2 w-[80%] hidden lg:flex'>
                        <ul className='flex items-center gap-3 nav'>
                            <li className='inline-block'>
                                <Link to="/" className='link transition text-[14px] font=[500]'>
                                    <Button className='link transition !font-medium !capitalize !text-black hover:!text-orange-500'>
                                        Home
                                    </Button>
                                </Link>
                            </li>
                            {
                                catData?.length !== 0 && catData?.map((item, index) => {
                                    return (
                                        <>
                                            <li className='inline-block relative'>
                                                <Link to={`/product-listing/${item?.name}`} className='link transition text-[14px] font=[500]'>
                                                    <Button className='link transition !font-medium !capitalize !text-black hover:!text-orange-500'>
                                                        {item.name}
                                                    </Button>
                                                </Link>
                                                {
                                                    catData?.children?.length !== 0 &&

                                                    <div className='submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all z-[999]'>
                                                        <ul>
                                                            {
                                                                item?.children?.map((child, index_) => {
                                                                    return (
                                                                        <>
                                                                            <li className='list-none'>
                                                                                <Link to={`/product-listing/${item?.name}/${child?.name}`}>
                                                                                    <Button className='transition !font-medium !capitalize !text-black hover:!text-orange-500 w-full !justify-start'>{child.name}</Button>
                                                                                </Link>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                })
                                                            }

                                                        </ul>
                                                    </div>

                                                }
                                            </li>
                                        </>
                                    )
                                })
                            }

                        </ul>
                    </div>

                </div>
            </nav>

            <CategoryPanel openCategoryPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
        </>
    )
}

export default Navigation
