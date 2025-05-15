import { Button, CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { FiUploadCloud } from 'react-icons/fi'
import { IoIosLogOut, IoMdHeartEmpty } from 'react-icons/io'
import { IoBagCheckOutline } from 'react-icons/io5'
import { NavLink } from "react-router"
import { MyContext } from '../../App'
import { editData, uploadImage } from '../../utils/api'
import { LuMapPinCheck } from 'react-icons/lu'

const AccountSidebar = () => {
    const context = useContext(MyContext)
    const [previews, setPreviews] = useState([])
    const [uploading, setUploading] = useState(false);
    const formData = new FormData();

    useEffect(() => {
        const userAvatar = [];
        if (context?.userData?.avatar !== "" && context?.userData?.avatar !== undefined) {
            userAvatar.push(context?.userData?.avatar);
            setPreviews(userAvatar);
        }
    }, [context?.userData])
    let img_arr = [];
    let uniqueArray = [];
    let selectedImages = [];
    const onchangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);
            const files = e.target.files;
            setUploading(true);
            console.log(files)
            for (var i = 0; i < files.length; i++) {
                if (files[i] &&
                    (files[i].type === "image/jpg" ||
                        files[i].type === "image/jpeg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImages.push(file);
                    formData.append(`avatar`, file)

                    uploadImage("/api/user/user-avatar", formData).then((res) => {
                        setUploading(false);
                        let avatar = [];
                        avatar.push(res?.data?.avatar);
                        setPreviews(avatar);
                        // console.log(res)
                    })
                } else {
                    context.openAlertBox('error', 'Please select only jpg, jpeg, png & webp file ')
                    setUploading(false);
                    return false;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='card bg-white shadow-md rounded-md'>
            <div className='w-full p-5 flex items-center justify-center flex-col'>
                <div className='w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex justify-center items-center'>
                    {
                        uploading === true ? <CircularProgress color='inherit' /> :
                            <>
                                {
                                    previews?.length !== 0 ? previews?.map((img, index) => {
                                        return (
                                            <img src={img} key={index}
                                                className='w-full h-full object-cover' />
                                        )
                                    }) :

                                        <img src="assets/images/user.jpg" className='w-full h-full object-cover' />

                                }
                            </>
                    }


                    <div className='overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] cursor-pointer flex items-center justify-center  opacity-0 transition-all group-hover:opacity-100'>
                        <FiUploadCloud className='text-[#fff] text-[25px]' />
                        <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0' accept='image/*' onChange={(e) => onchangeFile(e, "api/user/user-avatar")} name='avatar' />
                    </div>

                </div>
                <h3 className=''>{context?.userData?.name}</h3>
                <h6 className='text-[13px] font-[500]'>{context?.userData?.email}</h6>
            </div>

            <ul className='list-none pb-5 pt-2 bg-[#f1f1f1] myAccountTabs flex flex-col'>
                <li className='w-full'>
                    <NavLink to="/my-account" exact={true} activeClassName="isActive" className='relative w-full'>
                        <Button className='!w-full !text-left !px-5 !justify-start !capitalize !text-black !rounded-none !flex !items-center !gap-2'>
                            <FaRegUser className='text-[17px]' />User Profile
                        </Button>
                    </NavLink>
                </li>


                <li className='w-full'>
                    <NavLink to="/address">
                        <Button className='!w-full !text-left !px-5 !justify-start !capitalize !text-black !rounded-none !flex !items-center !gap-2'>
                            <LuMapPinCheck className='text-[17px]' />Address
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <Button className='!w-full !text-left !px-5 !justify-start !capitalize !text-black !rounded-none !flex !items-center !gap-2'>
                        <IoMdHeartEmpty className='text-[17px]' />My List
                    </Button>
                </li>
                <li className='w-full'>
                    <Button className='!w-full !text-left !px-5  !justify-start !capitalize !text-black !rounded-none !flex !items-center !gap-2'>
                        <IoBagCheckOutline className='text-[17px]' />My Orders
                    </Button>
                </li>
                <li className='w-full'>
                    <Button className='w-full !text-left !px-5 !justify-start !capitalize !text-black !rounded-none !flex !items-center !gap-2'>
                        <IoIosLogOut className='text-[17px]' />Logout
                    </Button>
                </li>
            </ul>
        </div>
    )
}

export default AccountSidebar