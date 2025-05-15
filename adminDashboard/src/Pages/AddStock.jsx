import React, { useEffect, useState } from 'react'
import { editData, fetchDataFromApi } from '../utils/api'
import { useParams } from 'react-router-dom'
import { updateCacheWithNewRows } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils'
import { Button } from '@mui/material'


const AddStock = () => {
    const [product, setProduct] = useState({})
    const [stockValues, setStockValues] = useState([]);

    const { id } = useParams()
    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            console.log(res?.product)
            if (res?.error === false) {
                setProduct(res?.product)
                setStockValues(res?.product?.sizes.map(item => ({ size: item?.size, stock: item?.stock || 0 })));
            }
        })
    }, [])

    const handleInputChange = (size, value) => {
       const updatedStock = [ ...stockValues ];
       updatedStock.find(item => item?.size === size).stock = value
       setStockValues(updatedStock);
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        editData(`/api/product/updateProduct/${id}`, { sizes: stockValues }).then((res) => {
            console.log(res)
        })

    }


    return (
        <div className='w-full border-zinc-200 rounded-xl shadow-md p-4'>
            <div className='py-4 border-b border-zinc-200'>
                <h2 className='text-xl font-semibold'>Add Stock for <span className='font-bold'> {product?.name}</span></h2>
            </div>

            <div>
                <form action="" onSubmit={handleSubmit} >
                    <div className='grid grid-cols-3 gap-4'>
                        {
                            product?.size?.map((size, index) => {
                                return (
                                    <div className='py-2'>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity {size}</label>
                                        <input type="text" name="stock" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" value={stockValues.find(item => item.size === size)?.stock || 0}
                                            onChange={(e) => handleInputChange(size, e.target.value)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-center mt-4'>
                        <Button type='submit' className='!bg-indigo-500 hover:!bg-indigo-600 !text-white !px-4 !py-2 '>Submit</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddStock