import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import { MyContext } from '../../App'
import { MenuItem, Radio, Select } from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { RxCross2 } from "react-icons/rx";
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Radio demo' } };

const Address = () => {
    const context = useContext(MyContext)
    const [open, setOpen] = React.useState(false);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("accesstoken");
    useEffect(() => {
        if (token == null) {
            navigate('/');
        }
    }, [token])

    const [formData, setFormData] = useState({
        address_line: '',
        city: '',
        mobile: '',
        state: '',
        pincode: '',
        country: '',
        status: '',
        userId: '',
        selected: false,
    });
    const [selectedValue, setSelectedValue] = useState('H No 222 Street No 6 Dubagga');
    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormData((prevState) => ({
            ...prevState,
            status: event.target.value,
        }))
    }

    const onchangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
         
                setAddress(res.data);
                setRefetch(!refetch)
            })
        })
    }

    useEffect(() => {
        if (context?.userData?._id !== '' && context?.userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
     
                setAddress(res?.address);
            })
        }
    }, [context?.userData, refetch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!formData.address_line || !formData.mobile || !formData.city || !formData.state || !formData.pincode || !formData.country) {
            context.openAlertBox('error', 'Please fill all the fields');
            return;
        }

        const res = await postData(`/api/address/add`, formData, { withCredentials: true })

        if (!res.error) {
            setIsLoading(false);
            context.openAlertBox('success', res.message);
            setOpen(false);

            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                context.setAddress(res.data);
                setRefetch(!refetch)
            })

        } else {
            context.openAlertBox('error', res.message || 'Some error occured');
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className='py-10 w-full'>
                <div className='container flex gap-5'>
                    <div className='col1 w-[20%]'>
                        <AccountSidebar />
                    </div>
                    <div className='col2 w-[50%]'>
                        <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                            <div className='flex items-center pb-3'>
                                <h2 className='pb-0'>Address</h2>

                            </div>
                            <hr />

                            <div className='flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] mt-4 bg-[#f1faff] hover:bg-hover-[#e7f3f9] cursor-pointer' onClick={handleClickOpen}>
                                <span className='text-[14px] font-[500]'>Add Address</span>

                            </div>
                            <div className='flex gap-2 flex-col mt-4'>
                                {
                                    address?.length > 0 && address.map((item, index) => {
                                        return (

                                            <label key={index} className='border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-hover-[#e7f3f9] cursor-pointer p-3 rounded-md flex items-center justify-center'>
                                                <Radio {...label} name='address' checked={selectedValue === (item?._id)} value={item?._id} onChange={handleChange} />
                                                <span className='text-[12px]'>
                                                    {
                                                        item?.address_line + " " + item?.city + " " + item?.state + " " + item?.pincode + " " + item?.country
                                                    }
                                                </span>
                                                <span className='ml-auto' onClick={() => removeAddress(item?._id)}><BsTrash /></span>
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>
                    <div className='flex items-center justify-between'>
                        Address
                        <RxCross2 className='cursor-pointer' onClick={handleClose} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 gap-4 mt-4'>
                            <div>
                                <TextField
                                    label="Address Line 1" name='address_line' variant='outlined'
                                    className='w-full' size='small' onChange={onchangeInput} value={formData.address_line}
                                />
                            </div>
                            <div>
                                <PhoneInput defaultCountry='in' value={phone} onChange={(phone) => {

                                    setFormData({ ...formData, mobile: phone })
                                }} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <div>
                                <TextField
                                    label="City" name='city' variant='outlined'
                                    className='w-full' size='small' onChange={onchangeInput} value={formData.city}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="State" name='state' variant='outlined'
                                    className='w-full' size='small' onChange={onchangeInput} value={formData.state}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Pincode" name='pincode' variant='outlined'
                                    className='w-full' size='small' onChange={onchangeInput} value={formData.pincode}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Country" name='country' variant='outlined'
                                    className='w-full' size='small' onChange={onchangeInput} value={formData.country}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 mt-4'>
                            <Select value={status} onChange={handleChangeStatus} displayEmpty inputProps={{ 'arial-label': 'Without label' }} size='small' className='w-full'>
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                        {/* Save Button */}
                        <div className='mt-4'>
                            <Button variant='contained' color='primary' type='submit' className='w-full mt-4'>Save</Button>
                        </div>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default Address