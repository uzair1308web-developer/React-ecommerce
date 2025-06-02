import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { deleteData, fetchDataFromApi, postData } from '../utils/api';
import { Link } from 'react-router-dom';
import { BsFillInboxesFill, BsThreeDotsVertical } from 'react-icons/bs';


const ShowProduct = () => {
    const [refresh, setRefresh] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [

        {
            field: 'categImage',
            headerName: 'Image',
            width: 140,
            renderCell: (params) => (
                <div className='py-4 rounded-full overflow-hidden'>
                    <img
                        src={params.row.images}
                        alt={params.row.name}
                        style={{ width: 100, height: 100, borderRadius: '100px', objectFit: 'cover' }}
                    />
                </div>
            )
        },
        { field: 'category.name', headerName: 'Category Name', width: 180, renderCell: (params) => (params?.row?.category?.name) },
        { field: 'brand', headerName: 'Brand Name', width: 160 },
        { field: 'name', headerName: 'Product Name', width: 220 },
        { field: 'description', headerName: 'Product Description', width: 500 },
        { field: 'price', headerName: 'Price', width: 110 },
        {
            field: 'action', headerName: 'Action', width: 120,
            renderCell: (params) => {
                const [anchorEl, setAnchorEl] = useState(null);
                const open = Boolean(anchorEl);

                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };
                const handleClose = () => {
                    setAnchorEl(null);
                }
                return (
                    <div className='relative' >
                        <Button
                            id={`basic-button-${params?.row._id}`}
                            aria-controls={open ? `basic-menu-${params?.row._id}` : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'false' : undefined}
                            onClick={handleClick}
                        >
                            <BsThreeDotsVertical />
                        </Button>
                        <Menu
                            id={`basic-menu-${params?.row._id}`}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': `basic-button-${params?.row._id}`,
                            }}
                            className='!shadow-md'
                        >
                            <MenuItem component={Link} to={`/product-detail/${params?.row._id}`}>
                                <span className='text-sm flex justify-center items-center gap-2'>
                                    <MdVisibility className='text-blue-500 text-sm' />
                                    View
                                </span>
                            </MenuItem>
                            <MenuItem className=''>
                                <Link to={`/edit-product/${params?.row._id}`}>
                                    <span className='text-sm flex justify-center items-center gap-2'>
                                        <MdEdit className='text-green-500 text-sm' />
                                        Edit
                                    </span>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <span className='text-sm flex justify-center items-center gap-2' onClick={() => handleDelete(params.row._id)}>
                                    <MdDelete className='text-red-500 text-sm' />
                                    Delete
                                </span>
                            </MenuItem>
                            <MenuItem >
                                <Link to={`/add-stock/${params.row._id}`}>
                                    <span className='text-sm flex justify-center items-center gap-2'>
                                        <BsFillInboxesFill className='text-cyan-400 text-sm' />
                                        Add Stock
                                    </span>
                                </Link>
                            </MenuItem>
                        </Menu>

                    </div >
                )
            }
        },

    ];

    const [prodData, setProductData] = useState([]);

    useEffect(() => {
        fetchDataFromApi("/api/product/getProducts")
            .then((res) => {
                console.log(res)
                const formatted = res.products.map((prod) => ({
                    ...prod,
                    id: prod._id, // Required for DataGrid
                }));

                setProductData(formatted);
            })
            .catch((err) => {
                console.error("Error fetching category data:", err);
            });
    }, [refresh]);


    const handleDelete = async (id) => {
        deleteData(`/api/product/${id}`).then((res) => {
            setRefresh(!refresh)
        })
    };


    const deleteMultipleProduct = () => {
        postData(`/api/product/deleteMultiple`, { ids: selectedRows }).then((res) => {
            setRefresh(!refresh)
        })
    }

    return (
        <div>
            <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
                <div className='flex py-4 justify-between flex-col lg:flex-row gap-2'>
                    <div className=' border-b border-zinc-200'>
                        <h2 className='text-xl  font-semibold'>All Products</h2>
                    </div>
                    <div className='flex items-center gap-4'>
                        {
                            selectedRows.length > 0 &&
                            <div className='border border-red-500 bg-red-500 text-white text-xl rounded-md px-2 py-1' onClick={deleteMultipleProduct}>
                                <MdDelete />
                            </div>
                        }
                        <input type="text" placeholder='Search' className='border border-zinc-200 rounded-md px-2 py-1' />

                    </div>
                </div>

                <div className='w-full'>
                    <Box sx={{ width: '100%' }}>

                        <Paper sx={{ height: 500, overflow: 'auto' }}>

                            <DataGrid
                                rows={prodData}
                                columns={columns}
                                pageSize={8}
                                rowHeight={140}
                                checkboxSelection
                                disableRowSelectionOnClick
                                onRowSelectionModelChange={(row) => setSelectedRows(row)}
                                sx={{
                                    border: 0,
                                    fontSize: 14,
                                }}
                            />

                        </Paper>

                    </Box>
                </div>
            </div>
        </div>
    )
}

export default ShowProduct
