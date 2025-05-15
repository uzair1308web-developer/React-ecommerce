import { useState } from 'react';
import Button from '@mui/material/Button';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FiMinusSquare } from 'react-icons/fi';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../utils/api';


const CategoryCollapse = () => {
    const [submenuIndex, setSubmenuIndex] = useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);
    const [catData, setCatData] = useState([]);

    const openSubmenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
            return;
        } else {
            setSubmenuIndex(index);
        }
    }

    const openInnerSubmenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
            return;
        } else {
            setInnerSubmenuIndex(index);
        }
    }

    useEffect(() => {
        fetchDataFromApi("/api/category").then((res) => {
            console.log(res);
            if (res?.error === false) {
                setCatData(res?.data)
            }
        })
    }, [])

    return (
        <>
            <div className='scroll'>
                <ul className='w-full'>
                    {
                        catData?.length !== 0 && catData?.map((item, index) => {
                            return (
                                <>
                                    <li className='list-none  relative' key={index}>
                                        <div className='flex justify-between items-center cursor-pointer pe-4 transition duration-700'>
                                            <Button className='w-full !text-left !justify-start !text-black !px-3'>{item.name}</Button>

                                            {submenuIndex === index ? (
                                                <FiMinusSquare className='cursor-pointer' onClick={() => openSubmenu(index)} />
                                            ) : (
                                                <FaRegSquarePlus className='cursor-pointer' onClick={() => openSubmenu(index)} />
                                            )}
                                        </div>
                                        {
                                            submenuIndex === index &&

                                            (

                                                <ul className='submenu w-full pl-3 transition duration-700'>
                                                    {

                                                        catData?.children?.length !== 0 && item?.children?.map((child, index) => {
                                                            console.log(child)
                                                            return (
                                                                <>
                                                                    <li className='list-none relative transition duration-700' key={index}>
                                                                        <div className='flex justify-between items-center cursor-pointer pe-4 transition duration-500'>
                                                                            <Button className='w-full !text-left !justify-start !text-black !px-3'>
                                                                                {child.name}
                                                                            </Button>
                                                                            {/* {innerSubmenuIndex === 0 ? (
                                                                                <FiMinusSquare className='cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                                                                            ) : (
                                                                                <FaRegSquarePlus className='cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                                                                            )} */}
                                                                        </div>
                                                                        
                                                                    </li>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </ul>)
                                        }


                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default CategoryCollapse
