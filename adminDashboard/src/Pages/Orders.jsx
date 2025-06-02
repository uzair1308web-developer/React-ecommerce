import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Box, Button, IconButton, Menu, MenuItem, Select } from '@mui/material';
import { deleteData, fetchDataFromApi, postData } from '../utils/api';
import { Link } from 'react-router-dom';
import { BsFillInboxesFill, BsThreeDotsVertical } from 'react-icons/bs';
import { MyContext } from '../App';



const Orders = () => {
    const [refresh, setRefresh] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const context = useContext(MyContext);

    const changeStatus = (orderId = '', status = '') => {
        console.log(orderId, status);

        postData(`/api/order/status`, { orderId, status }).then((res) => {
            setRefresh(!refresh);
            context.openAlertBox('success', res?.message);
        })
    }

    const columns = [
        { field: '_id', headerName: 'Order Id', width: 220 },
        { field: '', headerName: 'Customer Name', width: 170, renderCell: (params) => (params?.row?.userId?.name) },
        { field: 'product', headerName: 'Product', width: 220, renderCell: (params) => params?.row?.products?.map((item) => item.product.name).join(", ") },
        { field: 'createdAt', headerName: 'Purchase Date', width: 120, renderCell: (params) => params?.row?.createdAt?.slice(0, 10) },
        { field: 'subTotal', headerName: 'Price', width: 90 },
        { field: 'total', headerName: 'Total Amount', width: 120 },
        {
            field: 'status', headerName: 'Status', width: 200,
            renderCell: (params) => {
                return (
                    <div className='relative w-full px-4' >
                        <Select className='w-full' value={params?.row?.status} >
                            <MenuItem value={'placed'} onClick={() => changeStatus(params?.row?._id, 'placed')}>Placed</MenuItem>
                            <MenuItem value={'shipped'} onClick={() => changeStatus(params?.row?._id, 'shipped')}>Shipped</MenuItem>
                            <MenuItem value={'delivered'} onClick={() => changeStatus(params?.row?._id, 'delivered')}>Delivered</MenuItem>
                        </Select>
                    </div >
                )
            }
        },
        {
            field: 'action', headerName: 'Action', width: 200,
            renderCell: (params) => {
                return (
                    <div className='flex gap-4 items-center justify-center' >
                        <Link to={`/order/${params?.row?._id}`}><MdVisibility /></Link>
                    </div >
                )
            }
        },
    ];
    const [prodData, setProductData] = useState([]);

    useEffect(() => {
        fetchDataFromApi("/api/order/get-all-orders")
            .then((res) => {
                setProductData(res.order.map(item => ({ ...item, id: item._id })));
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [refresh]);

    const deleteMultipleProduct = () => {
        postData(`/api/order/deleteMultiple`, { ids: selectedRows }).then((res) => {
            setRefresh(!refresh);
            context.openAlertBox('success', res?.message);
        })
    }

    return (
        <div>
            <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
                <div className='flex py-4 justify-between'>
                    <div className=' border-b border-zinc-200'>
                        <h2 className='text-xl font-semibold'>All Order</h2>
                    </div>
                    <div className='flex items-center gap-4'>
                        {
                            selectedRows.length > 0 &&
                            <div className='border border-red-500 bg-red-500 text-white text-xl cursor-pointer rounded-md px-2 py-1' onClick={deleteMultipleProduct}>
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

export default Orders