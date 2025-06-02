import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchDataFromApi } from '../../utils/api'
import { useState } from 'react'
import AddToCartButton from '../../components/AddToCartButton'
import { useContext } from 'react'
import { MyContext } from '../../App'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [size , setSize] = useState('')
    const context = useContext(MyContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            if (res?.error === false) {
                setProduct(res?.product)
            }
            else{
                context.openAlertBox('error', "Product Not Found")
                navigate('/')
            }
            setSize(res?.product?.sizes[0]?.size)
        })
    }, [])

    const selectSize = (e, size) => {
        e.preventDefault();
        setSize(size)
    }
    return (
        <section className='container mx-auto lg:p-4 py-2'>
            <div className='bg-white p-4 relative'>
                <form>
                    <div className='productContainer flex flex-col lg:flex-row gap-4 sticky top-0 left-0'>
                        <div className='productImg lg:w-[40%] lg:h-[400px] overflow-hidden border border-zinc-200'>
                            <img src={product?.images} alt="" className='w-full h-full object-contain' />
                        </div>
                        <div className='productInfo lg:w-[60%] flex flex-col gap-2 items-start'>
                            <h2 className='lg:text-2xl  font-semibold'>{product?.name}</h2>
                            <p className='text-sm'>Brand Name: <span className='text-black lg:text-base font-semibold'>{product?.brand} </span></p>
                            <p className=' font-semibold flex gap-2 items-baseline'>
                                <span className='lg:text-lg text-zinc-500 line-through'>₹{product?.oldPrice} </span>
                                <span className='lg:text-2xl text-xl text-primary'>₹{product?.price}</span>
                            </p>
                            <p className='text-sm'>{product?.description}</p>
                            <div className='lg:text-lg text-sm flex gap-4 items-center'>
                                Size 
                                <div className='flex gap-2'>
                                    {
                                        product?.size?.length > 0 && product?.sizes?.map((item, i) => (

                                            <button className={`border border-zinc-200 px-3 py-2 cursor-pointer !text-sm !lg:text-base disabled:bg-zinc-300 disabled:cursor-not-allowed disabled:text-zinc-200 transition-all duration-300 ease-in-out ${item.size === size ? 'bg-primary text-white' : ''}` } onClick={e => selectSize(e,item.size)} disabled={item.stock === 0} key={i}>{item.size}</button>
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