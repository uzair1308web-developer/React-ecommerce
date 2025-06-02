import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { IconButton } from '@mui/material';
import { MyContext } from '../App';
import { deleteData, fetchDataFromApi } from '../utils/api';
import { Link, } from 'react-router-dom';

const ViewBanner = () => {
    const columns = [
        {
            field: 'categImage',
            headerName: 'Image',
            flex: 1,
            minWidth: 140,
            renderCell: (params) => (
                <div className='py-4 overflow-hidden'>
                    <img
                        src={params.row.image}
                        alt={params.row.name}
                        style={{  objectFit: 'cover' }}  
                    />
                </div>
            )
        },

        { field: 'link', headerName: 'Link', flex: 0.5, minWidth: 100 },

        {
            field: 'action',
            headerName: 'Action',
            flex: 0.5,
            minWidth: 130,
            renderCell: (params) => (
                <div className=''>
                
                    
                    <IconButton onClick={() => handleDelete(params.row._id)}>
                        <MdDelete className='text-red-500 text-sm' />
                    </IconButton>
                </div>
            )
        },
    ];

    const context = useContext(MyContext);
    const [sliderData, setSliderData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        fetchDataFromApi("/api/banner/get")
            .then((res) => {
                // console.log(res.slider)
                const formatted = res.slider.map((slide) => ({
                    ...slide,
                    id: slide._id, // Required for DataGrid
                }));
                setSliderData(formatted);
            })
            .catch((err) => {
                console.error("Error fetching Slider data:", err);
            });
    }, [refresh]);

    const handleDelete = (id) => {
        deleteData(`/api/banner/${id}`).then((res) => {
            // console.log(res);
            setRefresh(!refresh);
        })
    }

    return (
        <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
            <div className='py-4 border-b border-zinc-200'>
                <h2 className='text-xl font-semibold'>All Slider Banner</h2>
            </div>
            <div>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={sliderData} // ✅ Use fetched data
                        columns={columns}
                        pageSize={8}
                        rowHeight={140}
                        checkboxSelection
                        disableRowSelectionOnClick
                        // onRowSelectionModelChange={(row) => setSelectedRows(row)}
                        sx={{ border: 0, fontSize: 14, }}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default ViewBanner