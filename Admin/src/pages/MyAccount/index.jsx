import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import { Button, CircularProgress, TextField } from '@mui/material'
import { MyContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { editData, postData } from '../../utils/api'
import { Collapse } from 'react-collapse'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

const MyAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState(null);
    const [phone , setPhone] = useState('');
    const [isChangePasswordShow, setIsChangePasswordShow] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const context = useContext(MyContext)
    const navigate = useNavigate();
    const token = localStorage.getItem("accesstoken");
    useEffect(() => {
        if (token == null) {
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            setUserId(context?.userData?._id)
            setFormData({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile,
            })
            const ph = `"${context?.userData?.mobile}"`
            setPhone(ph)

            setChangePassword({
                email: context?.userData?.email,
            })

        }
    }, [context?.userData])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setChangePassword({ ...formData, [e.target.name]: e.target.value });
    };



    const validValue = Object.values(formData).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!formData.name || !formData.email ) {
            context.openAlertBox('error', 'Please fill all the fields');
            return;
        }

        const res = await editData(`/api/user/${userId}`, formData, { withCredentials: true })
        // console.log(res)
        if (!res.error) {
            // setIsLoading(false);
            // setFormData({
            //     name: "",
            //     email: "",
            //     mobile: "",
            // })
            console.log(res)
            context.openAlertBox('success', res?.data?.message);
            // localStorage.setItem("accesstoken", res?.data?.accessToken)
            // localStorage.setItem("refreshtoken", res?.data?.refreshToken)
            context.setIsLogin(true)
            setIsLoading(false);
            // setTimeout(() => {
            //     navigate('/');
            // }, 2000);
            return
        } else {
            context.openAlertBox('error', res.message || 'Some error occured');
            setIsLoading(false);
        }
    };

    const submitChangePassword = async (e) => {
        e.preventDefault();

        setIsLoading2(true)

        if (!changePassword.oldPassword || !changePassword.newPassword || !changePassword.confirmPassword) {
            context.openAlertBox('error', 'Please fill all the fields');
            return;
        }

        if (changePassword.newPassword !== changePassword.confirmPassword) {
            context.openAlertBox('error', 'Password not matched')
            setIsLoading2(false)
            return;
        }

        const res = await postData(`/api/user/reset-password`, changePassword, { withCredentials: true })
        if (!res.error) {
            setIsLoading2(false);
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            console.log(res)

            context.openAlertBox('success', res?.message);
            // localStorage.setItem("accesstoken", res?.data?.accessToken)
            // localStorage.setItem("refreshtoken", res?.data?.refreshToken)
            setIsLoading2(false);
            // setTimeout(() => {
            //     navigate('/');
            // }, 2000);
            return
        } else {
            context.openAlertBox('error', res.message || 'Some error occured');
            setIsLoading2(false);
        }
    };




    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5 flex-col lg:flex-row'>
                <div className='col1 lg:w-[20%]'>
                    <AccountSidebar />
                </div>
                <div className='col2 lg:w-[50%]'>
                    <div className='card bg-white p-5 shadow-md rounded-md'>
                        <div className='flex items-center justify-between pb-3'>
                            <h2 className='pb-3'>My Profile</h2>
                            <Button onClick={() => setIsChangePasswordShow(!isChangePasswordShow)}>Change Password</Button>
                        </div>
                        <hr />

                        <form onSubmit={handleSubmit} className='mt-5'>
                            <div className='flex items-center gap-4'>
                                <div className='w-[50%]'>
                                    <TextField label="Name" name='name' variant='outlined' value={formData.name} className='w-full' size='small' onChange={handleChange} />
                                </div>
                                <div className='w-[50%]'>
                                    <TextField label="Email" name='email' disabled variant='outlined' className='w-full' value={formData.email} size='small' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex items-center mt-4 gap-4'>
                                <div className='w-[50%]'>
                                    {/* <TextField label="Phone Number" name='mobile' variant='outlined' className='w-full' value={formData.mobile} size='small' onChange={handleChange} /> */}
                                    <PhoneInput defaultCountry='in' value={phone}  onChange={(phone)=>{
                                        setFormData({...formData, mobile: phone})
                                    }}/>
                                </div>
                                {/* <div className='w-[50%]'>
                                    <TextField label="DOB" variant='outlined' className='w-full' size='small' value={}  onChange={handleChange} />
                                </div> */}
                            </div>
                            <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full
                                                    hover:!bg-gray-900 !text-white !font-medium !py-2 !mt-2 !rounded-lg !transition-colors">
                                {
                                    isLoading === true ?
                                        <CircularProgress color='inherit' /> :
                                        'Update Profile'
                                }
                            </Button>

                        </form>
                    </div>

                    {
                        <Collapse isOpened={isChangePasswordShow}>
                            <div className='card bg-white p-5 mt-4 shadow-md rounded-md'>
                                <h2 className='pb-3'>Change Password</h2>
                                <hr />

                                <form onSubmit={submitChangePassword} className='mt-5'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-[50%]'>
                                            <TextField label="Old Password" name='oldPassword' variant='outlined' value={changePassword.oldPassword} className='w-full' size='small' onChange={handleChange} />
                                        </div>
                                        <div className='w-[50%]'>
                                            <TextField label="New Password" name='newPassword' variant='outlined' className='w-full' value={changePassword.newPassword} size='small' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-4 gap-4'>
                                        <div className='w-[50%]'>
                                            <TextField label="Confirm Password" name='confirmPassword' variant='outlined' className='w-full' value={changePassword.confirmPassword} size='small' onChange={handleChange} />
                                        </div>
                                        {/* <div className='w-[50%]'>
                                                <TextField label="DOB" variant='outlined' className='w-full' size='small' value={}  onChange={handleChange} />
                                            </div> */}
                                    </div>
                                    <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full
                                            hover:!bg-gray-900 !text-white !font-medium !py-2 
                                            !mt-2 !rounded-lg !transition-colors">
                                        {
                                            isLoading2 === true ?
                                                <CircularProgress color='inherit' /> :
                                                'Change Password'
                                        }
                                    </Button>

                                </form>
                            </div>
                        </Collapse>

                    }

                </div>
            </div>
        </section>
    )
}

export default MyAccount