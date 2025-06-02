import React, { useEffect } from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import { fetchDataFromApi, postData } from '../../utils/api'
import { use } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { MyContext } from '../../App'

const Wishlist = () => {

    const context = useContext(MyContext)
    const [products, setProducts] = useState([])
    useEffect(() => {
        postData('/api/product/getMultipleProducts', { productIds: context.wishlist }).then((res) => {
            if (res?.error === false) {
                setProducts(res?.products)
            }
        }) 
    }, [])

    return (
        <>
            <section className='py-10 w-full'>
                <div className='container flex gap-5 flex-col lg:flex-row'>
                    <div className='col1 lg:w-[20%]'>
                        <AccountSidebar />
                    </div>
                    <div className='col2 lg:w-[50%]'>
                        <div className='card bg-white p-5 shadow-md'>
                            <div className='flex items-center pb-3'>
                                <h2 className='pb-0'>My List</h2>
                            </div>
                            <hr />
                        </div>
                        <div className='h-[60vh] overflow-auto bg-zinc-50 px-4'>
                            {products?.map((item) => {
                                return (
                                    <>
                                        <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                                            <hr />
                                            <div className='flex flex-col justify-between'>
                                                <div className='flex gap-4 py-2'>
                                                    <div className='w-[10%]'>
                                                        <img src={item?.images} alt="" />
                                                    </div>
                                                    <div className='w-[90%]'>
                                                        <p className='text-sm leading-4'>{item?.name}</p>
                                                        <div className='flex items-center gap-4'>
                                                            <p className='text-sm text-zinc-600'>Price: ₹{item?.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div >
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Wishlist