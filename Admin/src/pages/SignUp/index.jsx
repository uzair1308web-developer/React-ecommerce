import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { postData } from '../../utils/api';
import { MyContext } from '../../App';
import { Button, CircularProgress } from '@mui/material';


const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordShow, setIsPasswordShow] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // const [message, setMessage] = useState('');
    // const [messageType, setMessageType] = useState('');

    const validValue = Object.values(formData).every(el => el)
    const context = useContext(MyContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true);
        // alert(formData.fullName)
        if (formData.name === "") {
            context.openAlertBox("error", "Please add full name")
            return false
        }
        if (formData.email === "") {
            context.openAlertBox("error", "Please enter email")
            return false
        }
        if (formData.password === "") {
            context.openAlertBox("error", "Please enter password")
            return false
        }

        const res = await postData("/api/user/register", formData)
        if (res?.error !== true) {
            setIsLoading(false)
            context.openAlertBox('success', res?.message)
            localStorage.setItem('email', res.email) 
            setFormData({
                name: "",
                email: "",
                password: ""
            })
            navigate('/verifyOtp')
        } else {
            context.openAlertBox('error', res?.message);
            setIsLoading(false)
        }

        // if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        //     setMessage('Please fill all the fields');
        //     setMessageType('error');
        //     return;
        // }

        // let users = JSON.parse(localStorage.getItem("users")) || [];

        // const userExists = users.some((user) => user.email === formData.email);

        // if (userExists) {
        //     setMessage('User already exists with this email');
        //     setMessageType('error');
        //     return;
        // }

        // if (formData.password !== formData.confirmPassword) {
        //     setMessage('Password and Confirm Password should be same');
        //     setMessageType('error');
        //     return;
        // }
        // users.push({
        //     fullName: formData.fullName,
        //     email: formData.email,
        //     password: formData.password,
        //     loggedIn: false
        // });


        // localStorage.setItem('users', JSON.stringify(users));

        // setMessage('Signup Successful !');
        // setMessageType('success');
        setFormData({
            name: '',
            email: '',
            password: '',
        })
};
return (
    <div className="flex justify-center items-center h-screen">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get started with your account</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className='form-group w-full mb-5'>
                        <TextField id="name" type='text' name='name' value={formData.name} label="Full Name" variant="outlined" className='w-full' onChange={handleChange} />
                    </div>
                    <div className='form-group w-full mb-5'>
                        <TextField id="email" value={formData.email} type='text' name='email' label="Enter Email" variant="outlined" className='w-full' onChange={handleChange} />
                    </div>
                    <div className='form-group w-full mb-5 relative'>
                        {/* <label className="block text-sm font-medium text-gray-700 mb-1">Password</label> */}
                        <TextField id="password" value={formData.password} type={isPasswordShow === false ? 'password' : 'text'} name='password' label="Password" variant="outlined" className='w-full' onChange={handleChange} />
                        <button className='absolute top-[10px] right-[10px] z-50 w-[35px] h-[35px] min-w-[35px] rounded-full text-black'
                            onClick={() => { setIsPasswordShow(!isPasswordShow) }}>
                            {isPasswordShow === false ? <IoMdEye className="text-[20px] opacity-75" /> : <IoMdEyeOff className="text-[20px] opacity-75" />}
                        </button>
                    </div>
                    <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full  hover:!bg-gray-900 !text-white !font-medium !py-2.5 !rounded-lg !transition-colors">
                        {
                            isLoading === true ?
                                <CircularProgress color='inherit' /> :
                                'Sign up'
                        }
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign in</Link>
                </div>
            </div>
        </div>
    </div>
)
}

export default SignUp
