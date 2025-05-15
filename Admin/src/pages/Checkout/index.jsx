import React from 'react'

const Checkout = () => {
    return (
        <section className='checkout'>
            <div className='container mx-auto p-4 w-full relative flex '>
                <div className='leftcol w-[70%]'>
                    <div className='bg-white shadow-md  w-[80%]  py-8 px-4 rounded-lg'>
                        <h2 className='text-xl font-semibold'>Customer Details</h2>
                        <div>
                            <form action="">
                                <div className='grid grid-cols-2 gap-4 mt-4'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text" name="name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Enter Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email" name="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Enter Your Email"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 gap-4 mt-4'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                                        <input
                                            type="text" name="name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Enter Your Phone Number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text" name="name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Enter Address"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address 2 (optional)</label>
                                        <input
                                            type="text" name="name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Enter Address"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mt-4'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                        <input
                                            type="text" name="country"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="India" value={'India'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text" name="state"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="State"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mt-4'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text" name="city"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="City"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                                        <input
                                            type="email" name="zipcode"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="ZIP Code"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='rightcol w-[30%] '>
                    <div className='bg-white w-full shadow-md px-4 py-8 rounded-lg'>
                        <h2 className='text-xl font-semibold'>Cart Details</h2>
                        <div className='prodDetail flex flex-col gap-2 border-b border-zinc-200 py-2'>
                            <div className='flex justify-between'>
                                <h4 className='font-semibold text-zinc-500'>Products</h4>
                                <h4 className='font-semibold text-zinc-500'>Subtotal</h4>
                            </div>
                            <div className='flex justify-between'>
                                <div className='prodInfo flex gap-2'>
                                    <p className=''>Cotton Full Sleeves Shirt</p>
                                    <span>x</span>
                                    <span>1</span>
                                </div>
                                <div>
                                    <p>₹4400</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 my-4'>
                            <div className='flex justify-between'>
                                <p className='text-zinc-600'>Subtotal:</p>
                                <p>₹4400</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-zinc-600'>Shipping:</p>
                                <p>₹0</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-zinc-600'>Total:</p>
                                <p>₹4400</p>
                            </div>
                        </div>
                        <hr className='border border-zinc-200' />
                        <h2 className='text-xl font-semibold mt-4'>Payment Detail</h2>
                        <div className='flex flex-col gap-4 mt-4'>
                            <div className='flex justify-between'>
                                <div>UPI</div>
                                <p></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkout
