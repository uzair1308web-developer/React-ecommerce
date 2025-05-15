import { Button, Menu, MenuItem } from '@mui/material';
import React, { useContext, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { RiMenu2Line } from 'react-icons/ri';
import { MyContext } from '../App'
import { fetchDataFromApi } from '../utils/api';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const context = useContext(MyContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logout = () => {
        // setAnchorE1(null);
        const apiData = fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accesstoken')}`, { withCredentials: true })
        if (apiData) {
            // console.log(apiData)
            context.setIsLogin(false)
            localStorage.clear()
        }

    }

    return (
        <header className='w-full h-full py-4 shadow-lg pl-64 z-50 bg-zinc-800 flex items-center justify-between sticky top-0'>
            <div className='part1'>
                <div className='px-4 cursor-pointer' onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}>
                    <RiMenu2Line className='text-[18px] text-white' />
                </div>
            </div>
            <div className='part1'>
                <div className='pe-4'>
                    <Button
                        className='!bg-transparent !rounded-full   !text-xl cursor-pointer !text-white'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <FaRegUserCircle />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

                        <Button onClick={logout} className='cursor-pointer'>Logout</Button>
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Navbar
