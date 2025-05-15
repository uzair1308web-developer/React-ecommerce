import React from 'react'
import { Link } from 'react-router-dom'
import CategoryCollapse from '../CategoryCollapse'
import { Collapse } from 'react-collapse';
import { Checkbox, FormControlLabel } from '@mui/material'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import { useState } from 'react';


const Sidebar = () => {

    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = React.useState(true);
    const [isOpenPriceFilter, setIsOpenPriceFilter] = React.useState(true);
    const [catData, setCatData] = useState([]);


    useEffect(() => {
        fetchDataFromApi("/api/category").then((res) => {
            console.log(res);
            if (res?.error === false) {
                setCatData(res?.data)
            }
        })
    }, [])

    return (
        <aside>
            <div className="sidebar">
                <div className='shop-by-category'>
                    <div className="sidebar__header flex items-center justify-between pe-2">
                        <h3>Shop By Category</h3>
                        <span className='cursor-pointer' onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
                            {
                                isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />
                            }

                        </span>
                    </div>
                    <Collapse isOpened={isOpenCategoryFilter}>
                        <div className='scroll flex flex-col max-h-[250px] overflow-y-scroll px-2 pt-4'>
                            {
                                catData?.map((item, index) => {
                                    return (
                                        <>
                                            <FormControlLabel control={<Checkbox size='small' />} label={item?.name} />
                                        </>
                                    )
                                })
                            }
                            {/* <FormControlLabel control={<Checkbox size='small' />} label="Fashion" />
                            <FormControlLabel control={<Checkbox size='small' />} label="Bags" />
                            <FormControlLabel control={<Checkbox size='small' />} label="Footwear" />
                            <FormControlLabel control={<Checkbox size='small' />} label="Groceries" />
                            <FormControlLabel control={<Checkbox size='small' />} label="Beauty" />
                            <FormControlLabel control={<Checkbox size='small' />} label="Beauty" />
                            <FormControlLabel control={<Checkbox size='small' />} label="Beauty" />
                            <FormControlLabel control={<Checkbox size='small' />} label="Beauty" /> */}
                        </div>
                    </Collapse>
                </div>
                <div className='shop-by-range'>
                    <div className="sidebar__header flex items-center justify-between pe-2">
                        <h3>Filter By Price</h3>
                        <span className='cursor-pointer' onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}>
                            {
                                isOpenPriceFilter === true ? <FaAngleUp /> : <FaAngleDown />
                            }
                        </span>
                    </div>
                    <div className='py-4'>
                        <RangeSlider />
                        <div className='flex py-2 priceRange justify-between'>
                            <span className='text-sm'>
                                From <strong>Rs: {3000}</strong>
                            </span>
                            <span className='text-sm'>
                                To <strong>Rs: {10000}</strong>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </aside>
    )
}

export default Sidebar
