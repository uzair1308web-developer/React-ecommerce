import { Button, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { postData } from '../utils/api'
import { useNavigate } from "react-router-dom"
import { MyContext } from "../App"

const VerifyOtp = () => {
    // const [isLoading, setIsLoading] = useState(false)
    // const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [otp, setOtp] = useState("")
    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    }
    const navigate = useNavigate();
    const context = useContext(MyContext);

    const verifyOtpHandler = async (e) => {
        e.preventDefault();
        const actionType = localStorage.getItem('actionType');
        if (actionType !== 'forgot-password') {

            if (otp == '') {
                alert("OTP invalid")
            } else {
                // console.log(localStorage.getItem("email"))
                const data = await postData("/api/user/verifyEmail", {
                    email: localStorage.getItem("email"),
                    otp: otp
                })
                if (data.error === false) {
                    context.openAlertBox("success", "Email verified successfully")
                    localStorage.removeItem("email")
                    navigate('/login')
                } else {
                    context.openAlertBox("error", "error found")
                    console.log('error found')
                }
                setUser(data)
            }
        } else {
            if (otp == '') {
                alert("OTP invalid")
            } else {
                // console.log(localStorage.getItem("email"))

                const data = await postData("/api/user/verifyEmailPasswordOtp", {
                    email: localStorage.getItem("userEmail"),
                    otp: otp
                })
                if (data) {
                    context.openAlertBox("success", "Email verified successfully")
                    navigate('/forgot-password')
                } else {
                    context.openAlertBox("error", "error found")
                    console.log('error found')
                }
            }
        }
    }

    // const validValue = Object.values(formData).every(el => el)

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="min-h-screen bg-white flex items-center justify-center p-4 w-full">
                <div className="max-w-md w-full bg-zinc-200 rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter otp to verify your email</h2>
                    <form onSubmit={verifyOtpHandler}>
                        <div className='form-group w-full mb-5'>
                            <TextField id="otp" type='number' name='otp' label="Enter Otp" value={otp} variant="outlined" className='w-full my-3' onChange={handleOtpChange} />
                            {/* <input type="number" name="otp" className='w-full my-3 border' value={otp} onChange={handleOtpChange} /> */}
                        </div>
                        <Button type='submit' className="!bg-indigo-600 w-full  hover:!bg-gray-900
                             !text-white !font-medium !py-2.5 !rounded-lg !transition-colors">
                            Verify
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp
