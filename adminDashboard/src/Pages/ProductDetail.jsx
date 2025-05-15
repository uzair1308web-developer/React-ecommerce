import { Button, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            console.log(res?.product)
            if (res?.error === false) {
                setProduct(res?.product)
            }
        })
    }, [])
    return (
        <>
            <div className='container w-full border-zinc-200 rounded-xl shadow-md p-4'>
                <div className='py-4 border-b border-zinc-200'>
                    <h2 className='text-xl font-semibold'>Product Detail</h2>
                </div>
                <div className='py-4'>
                    <div className='productContainer flex gap-4 sticky top-0 left-0'>
                        <div className='productImg w-[40%] h-[400px] overflow-hidden border border-zinc-200'>
                            {
                                product?.images?.length > 0 && product?.images?.map((img, i) => (
                                    <img src={img} alt="" className='w-full h-full object-contain' />
                                ))
                            }
                        </div>
                        <div className='productInfo w-[60%] flex flex-col gap-2 items-start'>
                            <h2 className='text-2xl font-semibold'>
                                {product?.name}
                            </h2>
                            <p className='text-sm'>Brand Name: <span className='text-black text-base font-semibold'> {product?.brand} </span></p>
                            <div>
                                <p className='text-sm'>Category: <span className='text-black text-base font-semibold'> {product?.category?.name} </span></p>
                            </div>
                            <div>
                                <p className='text-sm'>Sub Category: <span className='text-black text-base font-semibold'> {product?.subCategory?.name} </span></p>
                            </div>
                            <div>
                                <p className='text-sm'>RAM : <span className='text-black text-base font-semibold'> {product?.productRam?.map((ram, index) => {
                                    return (
                                        <span key={index}> {ram} </span>
                                    )
                                })} </span></p>
                            </div>

                            <div>
                                <p className='text-sm'>Stock: <span className='text-black text-base font-semibold'> {product?.countInStock} </span></p>
                            </div>

                            <div className='text-lg flex gap-4 items-center'>
                                <p className='text-sm'>Size : <span className='text-black text-base font-semibold'> {product?.size?.map((size, index) => {
                                    return (
                                        <span key={index}> {size} </span>
                                    )
                                })} </span></p>
                            </div>
                            <div>
                                <h2 className='text-lg font-semibold'>Product Description</h2>
                                <p className='text-sm'>{product?.description}</p>
                            </div>
                            <div>
                                <h2 className='text-lg font-semibold'>Price</h2>
                                <p className=' font-semibold flex gap-2 items-baseline'>
                                    <span className='text-lg text-zinc-500 line-through'>₹{product.price}</span>
                                    <span className='text-2xl text-primary'>₹{product.oldPrice}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ProductDetail