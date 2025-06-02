import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../utils/api';
import { MyContext } from '../App';
import { Button, CircularProgress } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const context = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const forgotPassword = (e) => {
        e.preventDefault()
        if(formData.email===""){
            context.openAlertBox("error", "Please provide email id ");
            return false;
        }else{
            localStorage.setItem("userEmail", formData.email)
            localStorage.setItem("actionType", 'forgot-password')
            
            postData("/api/user/forgotPassword",{
                email: formData.email,
            }).then((res) => {
                if(res?.error === false){
                    // context.alertBox("success", res?.message);
                    context.openAlertBox("success", `OTP Send to ${formData.email}` );
                    navigate('/verify-otp')
                }else{
                    context.openAlertBox("error", res?.message)
                }
            })
        }
        // navigate("/verify");
    }
 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validValue = Object.values(formData).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!formData.email || !formData.password) {
            context.openAlertBox('error', 'Please fill all the fields');
            return;
        }

        // let users = JSON.parse(localStorage.getItem('users')) || [];
        // const user = users.find((user) => user.email === formData.email && user.password === formData.password);
        const res = await postData("/api/user/login", formData, {withCredentials: true})
        // console.log(res)
        if (!res.error) {
            setIsLoading(false);
            setFormData({
                email: "",
                password: ""
            })
            context.openAlertBox('success', res.message );
            localStorage.setItem("accesstoken", res?.data?.accessToken)
            localStorage.setItem("refreshtoken", res?.data?.refreshToken)
            context.setIsLogin(true)
            setTimeout(() => {
                navigate('/');
            }, 2000);
            return
        } else {
            context.openAlertBox('error', res.message || 'Some error occured');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="your@email.com" value={formData.email} onChange={handleChange}/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" name='password' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="••••••••" value={formData.password} onChange={handleChange}/>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500" onClick={forgotPassword}>Forgot password?</a>
                        </div>

                        <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full
                         hover:!bg-gray-900 !text-white !font-medium !py-2.5 !rounded-lg !transition-colors">
                            {
                                isLoading === true ?
                                    <CircularProgress color='inherit' size={20} /> :
                                    'Sign in'
                            }
                        </Button>

                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?
                        <Link to='/signup' className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
