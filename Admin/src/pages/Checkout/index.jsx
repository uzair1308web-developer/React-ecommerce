import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { fetchDataFromApi, postData } from '../../utils/api'
import { Radio } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Radio demo' } };

const Checkout = () => {

    const context = useContext(MyContext)
    const [products, setProducts] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [address, setAddress] = useState([])
    const [selectedValue, setSelectedValue] = useState()
    const navigate = useNavigate()
    const prodIds = context.cart.map(item => item.product)

    if (context.cart.length == 0  || !context?.userData) {
        context.openAlertBox('error', 'Cart is empty')
        context.setCart([])
        navigate('/')
    }

    useEffect(() => {
        postData(`/api/product/getMultipleProducts/`, { productIds: prodIds }).then((res) => {
            if (res?.error === false) {
                setProducts(res?.products)
                let total = 0;
                context.cart.map(item => {
                    const product = res?.products.find(prod => prod._id === item.product);
                    total += product?.price * item.quantity
                });
                setSubTotal(total);
            }
        })
    }, [context.cart])

    useEffect(() => {
        if (context?.userData?._id !== '' && context?.userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res?.address);
            })
        }
    }, [context?.userData])

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if (selectedValue === undefined) {
            context.openAlertBox('error', 'Please select an address');
            return;
        }
        const formData = {
            userId: context?.userData?._id,
            delivery_address: selectedValue,
            products: context.cart,
            subTotal,
            total: subTotal + 199,
        }
        postData('/api/order/create', formData).then((res) => {
            if (res?.error === false) {
                context.openAlertBox('success', res?.message);
                context.setCart([]);
                localStorage.setItem("cart", JSON.stringify([]));
            } else {
                context.openAlertBox('error', res?.message);
            }
        })
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }



    return (
        <section className='checkout'>
            <form onSubmit={handleSubmitOrder} className='container mx-auto lg:p-4 py-2 w-full relative flex flex-col lg:flex-row gap-4 lg:gap-0'>
                <div className='leftcol lg:w-[70%]'>
                    <div className='bg-white shadow-md  lg:w-[80%] py-8 px-4 rounded-lg'>
                        <h2 className='text-xl font-semibold'>User Details</h2>
                        <div>
                            <div className='flex gap-2 flex-col mt-4 justify-start md:max-h-[50vh] overflow-y-auto'>
                                {
                                    address?.length > 0 ?  address.map((item, index) => {
                                        return (

                                            <label key={index} className={`border border-dashed border-[rgba(0,0,0,0.2)] hover:bg-hover-[#e7f3f9] cursor-pointer p-3 rounded-md flex items-center ${selectedValue === (item?._id) ? "bg-[#e7f3f9]" : ""}`}>
                                                <Radio {...label} name='address' checked={selectedValue === (item?._id)} value={item?._id} onChange={handleChange} />
                                                <div className='flex flex-col uppercase'>
                                                    <h2 className='font-semibold text-sm'>{item?.mobile}</h2>
                                                    <h3 className='font-semibold text-sm'>{item?.address_line}</h3>
                                                    <span className='text-[12px]'>{item?.city + " " + item?.state + " " + item?.pincode + " " + item?.country}</span>
                                                </div>
                                            </label>
                                        )
                                    }) : <h2 className='text-zinc-600'>Address Not Found</h2>
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className='rightcol lg:w-[30%] '>
                    <div className='bg-white w-full shadow-md px-4 py-8 rounded-lg'>
                        <h2 className='text-xl font-semibold'>Cart Details</h2>
                        <div className='flex flex-col justify-between'>
                            <table className='w-full border-b'>
                                <thead className="border-b">
                                    <tr>
                                        <td>Product</td>
                                        <td className="text-right w-[20%]">Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map((product, i) => {
                                            const qty = context.cart.find(item => item.product === product?._id)?.quantity || 0;
                                            return (
                                                <tr key={i}>
                                                    <td className='py-2'>
                                                        <div className='flex gap-2 justify-between w-full'>
                                                            <img src={product?.images} alt="" className='w-[50px] h-[50px] object-contain' />
                                                            <p className='leading-4 text-zinc-700 text-sm'>
                                                                <span>{product?.name}</span> x {qty}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className='text-right text-sm text-zinc-700'>
                                                        ₹ {product?.price * qty}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="flex justify-between mt-4 pb-2 border-b">
                                <span className="col-6  text-sm">Subtotal</span>
                                <span className="col-6 text-right text-sm">
                                    <span className="money">₹{subTotal}</span>
                                </span>
                            </div>

                            <div className="flex justify-between mt-4 pb-2 border-b">
                                <span className="col-6 text-sm">Shipping</span>
                                <span className="col-6 text-right text-sm">
                                    <span className="money">₹199</span>
                                </span> 
                            </div>

                            <div className="flex justify-between mt-4 pb-2 border-b">
                                <span className="col-6 ">Total</span>
                                <span className="col-6 text-right ">
                                    <span className="money">₹{subTotal + 199}</span>
                                </span>
                            </div>
                            
                            <button type='submit' className='bg-primary cursor-pointer text-white py-2 w-full mt-4 rounded-lg'>Place Order</button>
                        </div>
                    </div>
                </div>
            </form>
        </section >
    )
}

export default Checkout
