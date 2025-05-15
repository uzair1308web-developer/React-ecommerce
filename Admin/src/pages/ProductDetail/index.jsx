import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchDataFromApi } from '../../utils/api'
import { useState } from 'react'
import AddToCartButton from '../../components/AddToCartButton'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [size , setSize] = useState('')
    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            console.log(res?.product)
            if (res?.error === false) {
                setProduct(res?.product)
            }
            setSize(res?.product?.sizes[0]?.size)
        })
    }, [])

    const selectSize = (e, size) => {
        e.preventDefault();
        setSize(size)
        console.log(size)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    
    }

    return (
        <section className='container mx-auto p-4'>
            <div className='bg-white p-4 relative'>
                <form onSubmit={handleSubmit}>
                    <div className='productContainer flex gap-4 sticky top-0 left-0'>
                        <div className='productImg w-[40%] h-[400px] overflow-hidden border border-zinc-200'>
                            <img src={product?.images} alt="" className='w-full h-full object-contain' />
                        </div>
                        <div className='productInfo w-[60%] flex flex-col gap-2 items-start'>
                            <h2 className='text-2xl font-semibold'>{product?.name}</h2>
                            <p className='text-sm'>Brand Name: <span className='text-black text-base font-semibold'>{product?.brand} </span></p>
                            <p className=' font-semibold flex gap-2 items-baseline'>
                                <span className='text-lg text-zinc-500 line-through'>₹{product?.oldPrice} </span>
                                <span className='text-2xl text-primary'>₹{product?.price}</span>
                            </p>
                            <p className='text-sm'>{product?.description}</p>
                            <div className='text-lg flex gap-4 items-center'>
                                Size

                                <div className='flex gap-2'>
                                    {
                                        product?.size?.length > 0 && product?.sizes?.map((item, i) => (

                                            <button className={`border border-zinc-200 px-3 py-2 cursor-pointer disabled:bg-zinc-300 disabled:cursor-not-allowed disabled:text-zinc-200 transition-all duration-300 ease-in-out ${item.size === size ? 'bg-primary text-white' : ''}` } onClick={e => selectSize(e,item.size)} disabled={item.stock === 0} key={i}>{item.size}</button>
                                        ))
                                    }
                                </div>

                            </div>
                            <div className='w-full mt-24' >
                                <AddToCartButton product={product} size={size} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ProductDetail