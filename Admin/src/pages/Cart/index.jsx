import React from 'react'
import { IoClose } from "react-icons/io5";
import QuantityBox from '../../components/QuantityBox';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Cart = () => {
    return (
        <section className='container cart p-4'>
            <div className=' p-4 mx-auto flex gap-4'>
                <div className='bg-white w-[70%] p-4 shadow-md'>
                    <div>
                        <h1 className='text-lg font-semibold'>Your Cart</h1>
                        <p>There are 1 Product in your cart</p>
                    </div>
                    <div className='cartItem flex items-center p-4 border-b border-zinc-200 relative'>
                        <div className='absolute top-5 right-0'>
                            <IoClose className='cursor-pointer' />
                        </div>
                        <div className='imgWrapper w-[15%]'>
                            <img src="/assets/images/prod-1.jpg" alt="" />
                        </div>
                        <div className='productInfo p-4 h-full flex items-start w-full'>
                            <div className='flex flex-col gap-2'>
                                <h4 className='text-sm text-zinc-600'>Nautica</h4>
                                <h2 className='font-semibold '>Black Solid Tshirt</h2>
                                <p className='text-xs text-zinc-600'>Size: M</p>
                                <QuantityBox />
                                <p className='price flex gap-2 items-center'>
                                    <span className='text-xs text-zinc-600'>Price: </span>
                                    <span className='font-semibold'>₹4400</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-[30%] p-4 shadow-md flex flex-col justify-between'>
                    <div className='py-2 border-b border-zinc-200'>
                        <h4 className='text-lg font-semibold'>Cart Totals</h4>
                    </div>
                    <div className='py-2 flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            <p>Subtotal</p>
                            <p className='text-lg text-primary font-semibold'>₹4400</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Total</p>
                            <p className='text-lg text-primary font-semibold'>₹4400</p>
                        </div>
                        <div className='mt-2'>
                            <Button className='!w-full !bg-[#ff5252] !text-white'>
                                <Link to="/checkout">
                                    Procede to Checkout
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart
