import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { PhoneInput } from 'react-international-phone'
import { MyContext } from '../../App'
import { fetchDataFromApi, postData } from '../../utils/api'

const AddressModal = ({open = "", setOpen = () => {}, refetch = "", setRefetch = () => {}}) => {
    const context = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [status, setStatus] = useState('');

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
    const [phone, setPhone] = useState('');

    
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
        <div>
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
        </div>
    )
}

export default AddressModal