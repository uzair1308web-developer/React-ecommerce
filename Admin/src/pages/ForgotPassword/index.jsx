import { Button, CircularProgress, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: localStorage.getItem("userEmail"),
        newPassword: '',
        confirmPassword: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const context = useContext(MyContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validValue = Object.values(formData).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!formData.newPassword || !formData.confirmPassword) {
            context.openAlertBox('error', 'Please fill all the fields');
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            context.openAlertBox('error', 'Password not matched')
            setIsLoading(false)
            return;
        }

        const res = await postData("/api/user/reset-password", formData, { withCredentials: true })
        if (!res.error) {
            setIsLoading(false);
            localStorage.clear()
            setFormData({
                newPassword: "",
                confirmPassword: ""
            })
            context.openAlertBox('success', res?.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            context.openAlertBox('error', res.message || 'Some error occured');
            setIsLoading(false);
        }

    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group w-full mb-5'>
                            <TextField id="newPassword" type='password' name='newPassword' label="Enter New Password" value={formData.newPassword} variant="outlined" className='w-full !my-3' onChange={handleChange} />
                            <TextField id="confirmPassword" type='password' name='confirmPassword' value={formData.confirmPassword} label="Confirm New Password" variant="outlined" className='w-full !my-3' onChange={handleChange} />
                            {/* <input type="number" name="otp" className='w-full my-3 border' value={otp} onChange={handleOtpChange} /> */}
                        </div>

                        <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full
                                              hover:!bg-gray-900 !text-white !font-medium !py-2.5 !rounded-lg !transition-colors">
                            {
                                isLoading === true ?
                                    <CircularProgress color='inherit' /> :
                                    'Change Password'
                            }
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword