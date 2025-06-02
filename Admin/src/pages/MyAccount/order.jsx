import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';

const Order = () => {
    const context = useContext(MyContext);
    const [order, setOrder] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [product, setProduct] = useState([]);


    useEffect(() => {
        if (context?.userData?._id) {
            fetchDataFromApi(`/api/order/get?userId=${context?.userData?._id}`).then((res) => {
                setOrder(res?.order);
                console.log(res?.order)
            })
        }
    }, [context?.userData, refetch])

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
                                <h2 className='pb-0'>My Order</h2>
                            </div>
                            <hr />
                        </div>
                        <div className='h-[60vh] overflow-auto bg-zinc-50 px-4'>
                            {order?.map((item) => {
                                return (
                                    <>
                                        <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                                            <div className='flex items-center pb-3'>
                                                <h2 className='pb-0'>Order Id: {item?._id}</h2>
                                            </div>
                                            <hr />
                                            {
                                                item?.products?.map((product) => {
                                                    return (
                                                        <>
                                                            <div className='flex flex-col justify-between'>
                                                                <div className='flex gap-4 py-2'>
                                                                    <div className='w-[10%]'>
                                                                        <img src={product?.product?.images} alt="" />
                                                                    </div>
                                                                    <div className='w-[90%]'>
                                                                        <p className='text-sm leading-4 '>{product?.product?.name}</p>
                                                                        <div className='flex items-center gap-4'>
                                                                            <p className='text-sm text-zinc-600'>Quantity: {product?.quantity}</p>
                                                                            <p className='text-sm text-zinc-600'>Price: ₹{product?.product?.price}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }

                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Order