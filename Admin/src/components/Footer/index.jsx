import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { GoGift } from "react-icons/go";
import { BsWallet2 } from "react-icons/bs";
import { PiHeadsetFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { Button } from "@mui/material";



const Footer = () => {
    return (
        <section className='bg-[#fafafa] px-10'>
            <div className='grid lg:grid-cols-5 gap-2 py-8 lg:px-28 '>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className="text-4xl text-zinc-700">
                        <LiaShippingFastSolid />
                    </div>
                    <h4 className='lg:text-xl text-zinc-700 font-medium'>Free Shipping</h4>
                    <p className='text-sm'>For all orders over $200</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className="text-4xl text-zinc-700">
                        <PiKeyReturnLight />
                    </div>
                    <h4 className='lg:text-xl text-zinc-700 font-medium'>30 Days Returns</h4>
                    <p className='text-sm'>For an Exchange Product</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className="text-4xl text-zinc-700">
                        <BsWallet2 />
                    </div>
                    <h4 className='lg:text-xl text-zinc-700 font-medium'>Secured Payment</h4>
                    <p className='text-sm'>Payment Cards Accepted</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className="text-4xl text-zinc-700">
                        <GoGift />
                    </div>
                    <h4 className='lg:text-xl text-zinc-700 font-medium'>Special Gifts</h4>
                    <p className='text-sm'>Our First Product Order</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className="text-4xl text-zinc-700">
                        <PiHeadsetFill />
                    </div>
                    <h4 className='lg:text-xl text-zinc-700 font-medium'>Support 24/7</h4>
                    <p className='text-sm'>Contact us anytime</p>
                </div>
            </div>

            <hr className="h-0 text-zinc-200 " />
            <div className="footer py-8 flex flex-col lg:flex-row">
                <div className="col1 lg:w-[25%] border-r border-zinc-200 flex flex-col">
                    <h2 className="lg:text-xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-sm text-zinc-600">New Site -  Mega Super Store</p>
                    <p className="text-sm text-zinc-600">57, United States</p>
                    <Link className="text-sm text-zinc-600 my-2">
                        sales@mycompany.com
                    </Link>
                    <span className="lg:text-xl font-semibold text-primary">(+91) 123 332 1221</span>
                    <div className="py-4 flex items-center">
                        <span className="text-primary lg:text-4xl text-2xl">
                            <IoChatboxOutline />
                        </span>
                        <div>
                            <p className="font-semibold lg:text-normal text-sm leading-4">Online Chat</p>
                            <p className="font-semibold leading-4 lg:text-normal text-sm">Get Expert Help</p>
                        </div>
                    </div>
                </div>
                <div className="col2 lg:w-[40%] flex lg:ps-8">
                    <div className="w-[50%]">
                        <h2 className="lg:text-xl font-semibold mb-4">Products</h2>
                        <ul className="text-sm text-zinc-600">
                            <li className="mb-2">Price drops</li>
                            <li className="mb-2">New Products</li>
                            <li className="mb-2">Best Sales</li>
                            <li className="mb-2">Contact us</li>
                            <li className="mb-2">Sitemap</li>
                            <li className="mb-2">Stores</li>
                        </ul>
                    </div>
                    <div className="w-[50%]">
                    <h2 className="lg:text-xl font-semibold mb-4">Our Company</h2>
                        <ul className="text-sm text-zinc-600">
                            <li className="mb-2">Delivery</li>
                            <li className="mb-2">Legal Notice</li>
                            <li className="mb-2">Terms and condition of use</li>
                            <li className="mb-2">About us</li>
                            <li className="mb-2">Secure Payment</li>
                            <li className="mb-2">Login</li>
                        </ul>
                    </div>
                </div>
                <div className="col3 lg:w-[35%] flex flex-col lg:px-8">
                    <h2 className="lg:text-xl font-semibold mb-4">Subscribe to newsletter</h2>
                    <p className="text-sm text-zinc-600 mb-2">Get all the latest information on Events, Sales and Offers. Sign up for newsletter today.</p>
                    <div className="flex gap-4 flex-col justify-start items-start">
                        <input type="text" placeholder="Enter your email address" className="border border-zinc-200 p-2 w-full" />
                        <Button className="!bg-[#ff5252] !text-white px-4 py-2 ">Subscribe</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
