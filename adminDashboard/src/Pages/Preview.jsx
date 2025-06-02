import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { AiTwotoneGift } from 'react-icons/ai'
import { IoStatsChartSharp } from 'react-icons/io5'

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3, minWidth: 70 },
    { field: 'orderid', headerName: 'ORDER', flex: 0.5, minWidth: 70 },
    { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 130 },
    { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 130 },
    {
        field: 'total',
        headerName: 'Total',
        type: 'number',
        flex: 0.5,
        minWidth: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1.5,
        minWidth: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { orderid: '#291293', id: 1, lastName: 'Snow', firstName: 'Jon', total: 359 },
    { orderid: '#291293', id: 2, lastName: 'Lannister', firstName: 'Cersei', total: 429 },
    { orderid: '#291293', id: 3, lastName: 'Lannister', firstName: 'Jaime', total: 459 },
    { orderid: '#291293', id: 4, lastName: 'Stark', firstName: 'Arya', total: 169 },
    { orderid: '#291293', id: 5, lastName: 'Targaryen', firstName: 'Daenerys', total: null },
    { orderid: '#291293', id: 6, lastName: 'Melisandre', firstName: 'Alex', total: 589 },
    { orderid: '#291293', id: 7, lastName: 'Clifford', firstName: 'Ferrara', total: 449 },
    { orderid: '#291293', id: 8, lastName: 'Frances', firstName: 'Rossini', total: 369 },
    { orderid: '#291293', id: 9, lastName: 'Roxie', firstName: 'Harvey', total: 650 },
];

const paginationModel = { page: 0, pageSize: 8 };

const Preview = () => {
    return (
        <>
            <div className='w-full '>
                <div className='w-full p-5  border bg-[#f1faff] shadow-md flex flex-col sm:flex-row items-center gap-8 mb-5 justify-between rounded-md'>
                    <div className='info'>
                        <h1 className='text-[26px] lg:text-[35px] font-bold leading-8 lg:leading-10 mb-3'>
                            Welcome,
                            <br />
                            <span className='text-blue-600'>Uzair Khan</span>
                        </h1>
                        <p>Here’s What happening on your store today. See the statistics at once.</p>
                    </div>
                    <img src="/assets/images/shop-illustration.webp" width={160} alt="" />
                </div>
            </div>
            <div className='grid grid-cols-4 max-sm:grid-cols-1 gap-4'>
                <div className='box p-5 cursor-pointer rounded-md border border-zinc-200 flex items-center gap-4'>
                    <AiTwotoneGift className='text-3xl text-red-500' />
                    <div className='info w-[70%]'>
                        <h3>New Order</h3>
                        <b>1,890</b>
                    </div>
                    <div>
                        <IoStatsChartSharp className='text-[50px] text-[#10b981]' />
                    </div>
                </div>
                <div className='box p-5 cursor-pointer rounded-md border border-zinc-200 flex items-center gap-4'>
                    <AiTwotoneGift className='text-3xl' />
                    <div className='info w-[70%]'>
                        <h3>Total Proucts</h3>
                        <b>1,890</b>
                    </div>
                    <div>
                        <IoStatsChartSharp className='text-[50px] text-[#10b981]' />
                    </div>
                </div>
                <div className='box p-5 cursor-pointer rounded-md border border-zinc-200 flex items-center gap-4'>
                    <AiTwotoneGift className='text-3xl' />
                    <div className='info w-[70%]'>
                        <h3>Sales</h3>
                        <b>1,890</b>
                    </div>
                    <div>
                        <IoStatsChartSharp className='text-[50px] text-[#10b981]' />
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='text-xl font-semibold'>Recent Orders</h2>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
        </>
    )
}

export default Preview
