import React from 'react'
import { MdOutlineDone } from "react-icons/md";


const OrderConfirmed = () => {
    return (
        <div className='container mx-auto h-[60vh] flex justify-center items-center'>
            <div className='bg-white rounded-md shadow-lg p-4'>
                <div className=' flex justify-center items-center gap-4 '>
                    <div className='bg-green-500 text-white p-1 rounded-full text-2xl'>
                        <MdOutlineDone />
                    </div>
                    <h1 className='text-xl font-semibold'>Your order has been confirmed</h1>
                    <div className=''>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmed
