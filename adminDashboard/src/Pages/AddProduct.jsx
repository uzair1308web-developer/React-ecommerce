import { Button, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { styled, Textarea } from '@mui/joy';
import UploadBox from '../Components/UploadBox';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MyContext } from '../App';
import { deleteImages, postData } from '../utils/api';

const AddProduct = () => {
    const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        images: [],
        brand: "",
        price: "",
        oldPrice: "",
        catName: "",
        catId: "",
        subCatId: "",
        subCat: "",
        countInStock: "",
        rating: "",
        isFeatured: false,
        tag: "",
        discount: "",
        productRam: [],
        sizes: [],
        productWeight: [],
    });

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productTag, setProductTag] = useState('');
    const [productFeatured, setProductFeatured] = useState(false);
    const [productRams, setProductRams] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [previews, setPreviews] = useState([])
    const context = useContext(MyContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    // console.log(context.catData)

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formData.category = event.target.value
    }

    const selectCatByName = (name) => {
        formData.catName = name
    }
    

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        formData.subCategory = event.target.value
    }

    const selectSubCatByName = (name) => {
        formData.subCat = name
    }

    const handleChangeProductTag = (event) => {
        setProductTag(event.target.value);
        formData.tag = event.target.value
    }

    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;

        setProductRams(typeof value === 'string' ? value.split(',') : value);
        formData.productRam = value
    }

    const handleChangeProductWeight = (event) => {
        const {
            target: { value },
        } = event;

        setProductWeight(typeof value === 'string' ? value.split(',') : value);
        formData.productWeight = value
    }
    const handleChangeProductSize = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value)
        setProductSize(typeof value === 'string' ? value.split(',') : value);
        formData.sizes = value.map(val => ({ size: val }))
    }

    const onChangeRating = (event) => {
        formData.rating = event.target.value
        // console.log(event.target.value)
    }

    const setPreviewsFun = (previewsArr) => {
        setPreviews(previewsArr)
        formData.images = previewsArr
    }

    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/category/deleteImage?imgUrl=${image}`).then((res) => {
            console.log(res)
            imageArr.splice(index, 1);
            setPreviews([]);
            setTimeout(() => {
                setPreviews(imageArr);
                formData.images = imageArr
                context.openAlertBox('success', 'Image deleted successfully')
            }, 1000);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        postData("/api/product/create", formData).then((res) => {
            console.log(res)
            if (res?.success === true) {
                context.openAlertBox('success', res?.message)
                setFormData({
                    name: "",
                    description: "",
                    images: [],
                    brand: "",
                    price: "",
                    oldPrice: "",
                    catName: "",
                    catId: "",
                    subCatId: "",
                    subCat: "",
                    countInStock: "",
                    tag: "",
                    rating: "",
                    isFeatured: false,
                    discount: "",
                    productRam: [],
                    sizes: [],
                    productWeight: [],
                })

                setPreviews([])
            } else {
                context.openAlertBox('error', res?.message)
            }
        })
    }

    return (
        <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
            <div className='py-4 border-b border-zinc-200'>
                <h2 className='text-xl font-semibold'>Add Product</h2>
            </div>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 gap-4 mt-2'>
                        <div className='py-2'>
                            <TextField name='name' z id="standard-basic" fullWidth label="Product Name" variant="standard" className='' color='black' onChange={handleChange} value={formData.name} />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 my-3 '>
                        <div className='col'>
                            <label className='text-zinc-500 text-normal'>Product Description</label>
                            <div className='py-2'>
                                <Textarea minRows={6} variant="outlined" className="focus-within:border-none" name='description' onChange={handleChange} value={formData.description} />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='py-2'>
                            <TextField id="standard-basic" fullWidth label="Product Price" variant="standard" className='' color='black' name='price' value={formData.price} onChange={handleChange} />
                        </div>
                        <div className='py-2'>
                            <TextField id="standard-basic" fullWidth label="Product Old Price" variant="standard" className='' color='black' name='oldPrice' value={formData.oldPrice} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 max-md:grid-cols-1 gap-4 mt-4'>
                        <div className=''>
                            <label htmlFor="" className='text-zinc-500'>Product Category</label>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    label="Product Category"
                                    fullWidth
                                    value={productCat}
                                    variant='standard'
                                    onChange={handleChangeProductCat}
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
                                        context?.catData?.map((item, index) => {
                                            return (
                                                <MenuItem value={item?._id} key={index} onClick={() => selectCatByName(item.name)}>{item.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>

                        <div className=''>
                            <label htmlFor="" className='text-zinc-500'>Product Sub Category</label>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    label="Product RAMS"
                                    fullWidth
                                    variant='standard'
                                    value={productSubCat}
                                    onChange={handleChangeProductSubCat}
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
                                        context?.catData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((child, index) => {
                                                    return (
                                                        <MenuItem value={child._id} key={index} onClick={() => selectSubCatByName(cat.name)}>{child.name}</MenuItem>
                                                    )
                                                })
                                            )
                                        })
                                    }

                                </Select>
                            }
                        </div>
                        <div className='py-2'>
                            <TextField id="standard-basic" fullWidth label="Product Brand" variant="standard" className='' color='black' name='brand' value={formData.brand} onChange={handleChange} />
                        </div>
                        <div className='py-2'>
                            <TextField id="standard-basic" fullWidth label="Product Discount" variant="standard" className='' color='black' name='discount' value={formData.discount} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 max-md:grid-cols-1 gap-4 mt-2'>

                        <div className='py-2'>
                            <label htmlFor="" className='text-zinc-500'>Product Rams</label>
                            <Select label="Product RAMS"
                                multiple
                                fullWidth
                                variant='standard'
                                value={productRams}
                                onChange={handleChangeProductRams}
                                MenuProps={MenuProps}
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

                                <MenuItem value={'4GB'}>4GB</MenuItem>
                                <MenuItem value={'6GB'}>6GB</MenuItem>
                                <MenuItem value={'8GB'}>8GB</MenuItem>
                            </Select>
                        </div>

                        <div className='py-2'>
                            <label htmlFor="" className='text-zinc-500'>Product Tag</label>
                            <Select
                                label="Product Tag"
                                fullWidth
                                variant='standard'
                                value={productTag}
                                onChange={handleChangeProductTag}
                                MenuProps={MenuProps}
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
                                <MenuItem value={'New'}>New</MenuItem>
                                <MenuItem value={'Popular'}>Popular</MenuItem>
                                <MenuItem value={'Hot'}>Hot</MenuItem>

                            </Select>
                        </div>

                        <div className='py-2'>
                            <label htmlFor="" className='text-zinc-500'>Product Weight</label>
                            <Select
                                label="Product Weight"
                                multiple
                                fullWidth
                                variant='standard'
                                value={productWeight}
                                onChange={handleChangeProductWeight}
                                MenuProps={MenuProps}
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

                                <MenuItem value={'2KG'}>2KG</MenuItem>
                                <MenuItem value={'4KG'}>4KG</MenuItem>
                                <MenuItem value={'6KG'}>6KG</MenuItem>
                            </Select>
                        </div>
                        <div className='py-2'>
                            <label htmlFor="" className='text-zinc-500'>Product Size</label>
                            <Select
                                label="Product Size"
                                multiple
                                fullWidth
                                variant='standard'
                                value={productSize}
                                onChange={handleChangeProductSize}
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
                                <MenuItem value={'S'}>S</MenuItem>
                                <MenuItem value={'M'}>M</MenuItem>
                                <MenuItem value={'L'}>L</MenuItem>
                            </Select>
                        </div>

                    </div>

                    <div className='py-2'>
                        <label htmlFor="" className='block mb-2 text-zinc-600'>Rating</label>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} onChange={onChangeRating} />
                    </div>
                    <div className='grid grid-cols-1 gap-4 mt-2'>
                        <label className='text-zinc-500 text-lg'>Product Image</label>
                        <div className='grid grid-cols-6 max-md:grid-cols-1 gap-4'>
                            {
                                previews.length !== 0 && previews.map((image, index) => {
                                    return (
                                        <div className='uploadBoxWrapper relative' key={index}>
                                            <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}>
                                                <IoMdClose className='text-white text-[17px]' />
                                            </span>

                                            <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-zinc-700 flex justify-center h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 items-center flex-col relative'>
                                                <LazyLoadImage className="w-full h-full object-cover" alt={"image"} effect="" wrapperProps={{ style: { transitionDelay: "1s" }, }} src={image} />
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            <UploadBox multiple={true} name="images" url="/api/product/uploadImages" setPreviewsFun={setPreviewsFun} />
                        </div>
                    </div>
                    <div className='w-full mt-4'>
                        <Button type='submit' className='!w-full !bg-zinc-800 !text-white' >Add Product</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
