// import React, { use, useContext, useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
// import { IconButton } from '@mui/material';
// import { MyContext } from '../App';
// import { deleteData, fetchDataFromApi } from '../utils/api';
// import { Link, useNavigate } from 'react-router-dom';

// const ShowSubCategory = () => {
//     const columns = [
//         {
//             field: 'categImage',
//             headerName: 'Image',
//             flex: 0.5,
//             minWidth: 70,
//             renderCell: (params) => (
//                 <div className='py-4 rounded-full overflow-hidden'>
//                     <img
//                         src={params.row.images}
//                         alt={params.row.name}
//                         style={{ width: 100, height: 100, borderRadius: '100px', objectFit: 'cover' }}
//                     />
//                 </div>
//             )
//         },
//         { field: 'name', headerName: 'Category Name', flex: 0.5, minWidth: 70 },
//         { field: 'children.name', headerName: 'Sub Category Name', flex: 0.5, minWidth: 90 },
//         {
//             field: 'action',
//             headerName: 'Action',
//             flex: 0.5,
//             minWidth: 80,
//             renderCell: (params) => (
//                 <div className=''>
//                     <IconButton onClick={() => handleView(params.row)}>
//                         <MdVisibility className='text-blue-500 text-sm' />
//                     </IconButton>
//                     <IconButton>
//                         <Link to={`/edit/${params.row._id}`}>
//                             <MdEdit className='text-green-500 text-sm' />
//                         </Link>
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(params.row._id)}>
//                         <MdDelete className='text-red-500 text-sm' />
//                     </IconButton>
//                 </div>
//             )
//         },
//     ];
//     const [catData, setCatData] = useState([]);
//     const context = useContext(MyContext);


//     const handleView = (row) => {
//         console.log('View clicked:', row);
//     };

//     useEffect(() => {
//         fetchDataFromApi("/api/category").then((res) => {
//             console.log(res.data);
//             setCatData(res.data.map(item => ({ ...item, id: item._id })));
//         });
//     }, []);

//     const handleDelete = async (id) => {
//         deleteData(`/api/category/${id}`).then((res) => {
//             fetchDataFromApi("/api/category").then((res) => {
//                 setCatData(res.data);
//             });
//         })
//     };

//     return (
//         <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
//             <div className='py-4 border-b border-zinc-200'>
//                 <h2 className='text-xl font-semibold'>All Product Sub Category</h2>
//             </div>
//             <div>
//                 {console.log(catData)}
//                 <Paper sx={{ height: 400, width: '100%' }}>
//                     <DataGrid
//                         rows={catData} // ✅ Use fetched data
//                         columns={columns}
//                         pageSize={8}
//                         rowHeight={140}
//                         checkboxSelection
//                         sx={{ border: 0, fontSize: 14, }}
//                     />
//                 </Paper>
//             </div>
//         </div>
//     )
// }

// export default ShowSubCategory

import React, { useContext, useState } from 'react'
import { MyContext } from '../App';
import { FaAngleDown } from "react-icons/fa6";

import { Button } from '@mui/material';
import EditSubCategoryBox from './EditSubCategoryBox';

const ShowSubCategory = () => {
    const context = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false);

    const expand = (index) => {
        if(isOpen === index){
            setIsOpen(!isOpen);
        }else{
            setIsOpen(index)
        }
    }
    return (
        <div className='w-full border-zinc-200 rounded-xl shadow-md p-4' >
            <div className='py-4 border-b border-zinc-200'>
                <h2 className='text-xl font-semibold'>All Product Sub Category</h2>
            </div>
            <div className='card my-4 py-5 px-5 shadow-md sm:rounded-lg bg-white'>
                {
                    context?.catData?.length !== 0 &&
                    <ul className='w-full'>
                        {context?.catData?.map((item, index) => {
                            return (

                                <li className='w-full mb-1' key={index}>
                                    <div className='flex items-center justify-between w-full p-2 bg-[#f1f1f1] rounded-sm px-4'>
                                        <span className='font-medium flex items-center gap-4 text-sm'>
                                            {item.name}
                                        </span>
                                        <Button className='!bg-white !rounded-full !w-[35px] !h-[35px] !min-w-[35px] flex items-center justify-center !text-black' onClick={() => expand(index)}>
                                            <FaAngleDown />
                                        </Button>
                                    </div>
                                    {
                                        isOpen === index && 
                                        <>
                                            {
                                                item?.children?.length !== 0 &&
                                                <ul className='w-full px-4'>
                                                    {
                                                        item?.children?.map((child, index_)=> {
                                                            return (
                                                                <li className='w-full py-2' key={index_}>      
                                                                    <EditSubCategoryBox name={child.name} id={child._id} catData={context.catData} index={index_} selectedCat={child?.parentId} selectedCatName={child?.parentCatName}/>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            }
                                        </>
                                    }
                                </li>
                            )
                        })

                        }

                    </ul>
                }
            </div>

        </div >
    )
}

export default ShowSubCategory
