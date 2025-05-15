import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { IconButton } from '@mui/material';
import { MyContext } from '../App';
import { deleteData, fetchDataFromApi } from '../utils/api';
import { Link, } from 'react-router-dom';
// === Dummy action handlers ===

const handleView = (row) => {
    console.log('View clicked:', row);
};

// === Main Component ===
const ShowProdCategory = () => {
    const columns = [

        {
            field: 'categImage',
            headerName: 'Image',
            flex: 0.5,
            minWidth: 70,
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

        { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 70 },

        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 130,
            renderCell: (params) => (
                <div className=''>
                    <IconButton onClick={() => handleView(params.row)}>
                        <MdVisibility className='text-blue-500 text-sm' />
                    </IconButton>
                    <IconButton>
                        <Link to={`/edit-category/${params.row._id}`}>
                            <MdEdit className='text-green-500 text-sm' />
                        </Link>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row._id)}>
                        <MdDelete className='text-red-500 text-sm' />
                    </IconButton>
                </div>
            )
        },
    ];

    const context = useContext(MyContext);
    const [catData, setCatData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchDataFromApi("/api/category")
            .then((res) => {
                console.log(res.data)
                const formatted = res.data.map((cat) => ({
                    ...cat,
                    id: cat._id, // Required for DataGrid
                }));
                setCatData(formatted);
            })
            .catch((err) => {
                console.error("Error fetching category data:", err);
            });
    }, [refresh]);

    const handleDelete = async (id) => {
        deleteData(`/api/category/${id}`).then((res) => {
            setRefresh(!refresh)
            context.openAlertBox('success', res?.data?.message)
        })
    };


    return (
        <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
            <div className='py-4 border-b border-zinc-200'>
                <h2 className='text-xl font-semibold'>All Product Category</h2>
            </div>
            <div>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={catData} // ✅ Use fetched data
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
    );
};

export default ShowProdCategory;
