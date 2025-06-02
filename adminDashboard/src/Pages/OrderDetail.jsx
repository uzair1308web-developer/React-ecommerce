import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
    const [order, setOrder] = useState({})
    const { id } = useParams()
    useEffect(() => {
        fetchDataFromApi(`/api/order//${id}`).then((res) => {
            console.log(res)
            if (res?.error === false) {
                setOrder(res?.order)
            }
        })
    }, [])
    return (
        <div className='container w-full border-zinc-200 rounded-xl shadow-md p-4'>
            <div className='py-4 border-b border-zinc-200'>
                <h2 className='text-xl font-semibold'>Order Detail</h2>
            </div>
            <div className='py-4'>

            </div>
        </div>
    )
}

export default OrderDetail