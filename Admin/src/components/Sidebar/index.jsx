/* eslint-disable react/prop-types */
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

const Sidebar = ({ priceRange = [0, 10000], setPriceRange = () => { }, discount = "", setDiscount = () => { }}) => {

    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = React.useState(true);
    const [isOpenPriceFilter, setIsOpenPriceFilter] = React.useState(true);
    const [catData, setCatData] = useState([]);
    const [category, setCategory] = useState("");



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
                        <RangeSlider min={0} max={10000} value={priceRange} onInput={setPriceRange} />
                        <div className='flex py-2 priceRange justify-between'>
                            <span className='text-sm' >
                                From <strong>Rs: {priceRange[0]}</strong>
                            </span>
                            <span className='text-sm'>
                                To <strong>Rs: {priceRange[1]}</strong>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='shop-by-discount'>
                    <div className="sidebar__header flex items-center justify-between">
                        <h3>Filter By Discount</h3>
                        <span className='cursor-pointer' onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
                            {
                                    isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />
                            }
                        </span>
                    </div>
                    <div className={`py-4 flex flex-col overflow-hidden transition-all duration-300 ${isOpenCategoryFilter === true ? "max-h-screen" : "max-h-0 !py-0"}`}>
                        {[{
                            name: "Upto 20%",
                            value: 20,
                        },{
                            name: "Upto 40%",
                            value: 40,
                        },{
                            name: "Upto 60%",
                            value: 60,
                        },{
                            name: "Upto 80%",
                            value: 80,
                        }
                        
                    ].map((item, index) => (
                        <div className='flex items-center gap-2 accent-primary' key={index}>
                            <FormControlLabel control={<Checkbox checked={discount === item.value} onChange={()=> setDiscount(discount === item.value ? "" : item.value)} className='accent-red-500'/>} label={item?.name} />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
