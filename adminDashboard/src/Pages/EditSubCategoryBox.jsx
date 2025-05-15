import { Button, CircularProgress, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdOutlineModeEdit } from 'react-icons/md'
import { MyContext } from '../App'
import { deleteData, editData, fetchDataFromApi } from '../utils/api'

const EditSubCategoryBox = (props) => {
    const [editMode, setIsEditMode] = useState(false)
    const [selectVal, setSelectVal] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [catData, setCatData] = useState([]);
    const [formFields, setFormFields] = useState({
        name: "",
        parentCatName: null,
        parentId: null
    })
    const context = useContext(MyContext)

    useEffect(() => {
        formFields.name = props.name
        formFields.parentCatName = props.selectedCatName;
        formFields.parentId = props.selectedCat
        setSelectVal(props.selectedCat)
    }, [])
    const onchangeInput = (e) => {
        const { name, value } = e.target;

        const catId = selectVal
        setSelectVal(catId);
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    useEffect(() => {
        context.getCat()
    })


    const handleChange = (event) => {
        setSelectVal(event.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (formFields.name === '') {
            context.openAlertBox("error", "Please enter category name");
            return false
        }

        await editData(`/api/category/${props?.id}`, formFields)
            .then(res => {
                console.log(res);
                setTimeout(() => {
                    setIsLoading(false);
                    context.openAlertBox('success', res?.data?.message);
                    context.getCat()
                    setIsEditMode(false);
                }, 1000)
            },)
        // console.log(res);
    }


    const deleteCat = (id) => {
        deleteData(`/api/category/${id}`).then((res) => {
            console.log(res)
            context.getCat()
            context.openAlertBox('success', res?.data?.message)
        })
    }

    return (
        <div>
            <form className='w-100 flex items-center gap-3 p-0 px-4' onSubmit={handleSubmit}>
                {
                    editMode === true &&
                    <>
                        <div className='flex items-center w-full py-2 gap-4'>
                            <div className='w-[150px]'>
                                <Select
                                    style={{ zoom: '75%' }}
                                    className='w-full'
                                    size='small'
                                    value={selectVal}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {
                                        props?.catData?.length !== 0 &&
                                        props?.catData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </div>
                            <input type="text" className='h-[30px] border border-[rgba(0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='name' value={formFields?.name} onChange={onchangeInput} />

                            <div className='flex items-center gap-2'>
                                <Button size='small' className='btn-sml' type='submit' variant='contained'>
                                    {
                                        isLoading === true ? <CircularProgress color='inherit' size={20} /> : <>Edit</>
                                    }
                                </Button>
                                <Button size='small' variant='outlined' onClick={() => setIsEditMode(false)}>Cancel</Button>
                            </div>
                        </div>
                    </>
                }
                {
                    editMode === false &&

                    <>
                        <span className='font-medium text-sm'>{props.name}</span>
                        <div className='flex items-center gap-2 ml-auto'>

                            <Button className='!bg-white !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center !text-black' onClick={() => setIsEditMode(true)}>
                                <MdOutlineModeEdit />
                            </Button>

                            <Button className='!bg-white !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center !text-black' onClick={() => deleteCat(props?.id)}>
                                <FaRegTrashAlt />
                            </Button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default EditSubCategoryBox
