// import { Option, Select } from '@mui/joy'
import { Button, CircularProgress, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MyContext } from '../App'
import { postData } from '../utils/api'

const AddSubCategory = () => {
    const [productCat, setProductCat] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: '',
        parentCatName: null,
        parentId: null
    })

    const context = useContext(MyContext);
    const handleChangeProductCat = (e) => {
        setProductCat(e.target.value);
        formFields.parentId = e.target.value
    };

    const selectedCategory = (catName) => {
        formFields.parentCatName = catName;
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        const catId = productCat
        setProductCat(catId);

        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const validValue = Object.values(formFields).every(el => el)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (formFields.name === '' || productCat === '') {
            context.openAlertBox('error', 'Please fill all the fields');
            setIsLoading(false);
            return;
        }
        postData("/api/category/create", formFields).then((res) => {
            setTimeout(() => {
                setIsLoading(false);
                context.openAlertBox('success', res?.message)
                setFormFields({
                    name: '',
                    parentCatName: null,
                    parentId: null
                })
                setProductCat('') 
            }, 2500)
        })
    }

    return (
        <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
            <div className='py-4 border-b border-zinc-200'>
                <h2 className='text-xl font-semibold'>Add Sub Category</h2>
            </div>

            <div>
                <form action="" onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='pt-6'>
                            <Select
                                placeholder="Category"
                                indicator={<MdKeyboardArrowDown />}
                                fullWidth
                                variant='standard'
                                onChange={handleChangeProductCat}
                                value={productCat}
                                sx={{
                                    '& .MuiSelect-root': {
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.42)', // Bottom border like TextField
                                        borderRadius: 0, // Removes corner rounding
                                        '&:hover': {
                                            borderBottom: '2px solid black' // Hover effect for better UX
                                        },
                                        '&:focus': {
                                            borderBottom: '2px solid black' // Focus effect like TextField
                                        },
                                        paddingX: 0 // Align text to match the TextField spacing
                                    },
                                    '&::after': {
                                        borderBottom: '2px solid black' // Focus underline effect
                                    }
                                }}
                            >
                                {
                                    context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item._id} onClick={selectedCategory(item.name)}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className='py-2'>
                            <TextField id="standard-basic" onChange={onChangeInput} name='name' value={formFields.name} fullWidth label="Product Name" variant="standard" className='' color='black' />
                        </div>
                    </div>

                    <div className='w-full mt-4'>
                        <Button type='submit' disabled={!validValue} className="!bg-indigo-600 w-full
                                                                  hover:!bg-gray-900 !text-white !font-medium !py-2.5 !rounded-lg !transition-colors">
                            {
                                isLoading === true ?
                                    <CircularProgress color='inherit'  size={20}/> :
                                    'Add Sub Category'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSubCategory
