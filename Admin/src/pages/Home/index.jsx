import { LiaShippingFastSolid } from 'react-icons/lia'
import HomeCatSlider from '../../components/HomeCatSlider'
import HomeSlider from '../../components/HomeSlider'
import AdsBanenrSlider from '../../components/AdsBannerSlider'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductSlider from '../../components/ProductSlider'
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogItem from '../../components/BlogItem'
import { useEffect } from 'react'
import { fetchDataFromApi } from '../../utils/api'
import { useState } from 'react'

const Home = () => {
  const [value, setValue] = useState(0);
  const [catData, setCatData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data)
      }
    })
  }, [])

  return (
    <>
      <HomeSlider />
      <HomeCatSlider />

      <section className='bg-white py-4'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row items-center justify-between'>
            <div>
              <h2 className='lg:text-3xl text-xl font-semibold text-zinc-700'>Popular Product</h2>
              <p className='text-sm lg:text-base'>Do not miss the current offers untill the end of march</p>
            </div>
          
          </div>

          <ProductSlider endpoint={'/api/product/getProducts?tag=popular'} items={5} />
        </div>
      </section>

      <section className='pb-12 bg-white '>
        <div className='container'>
          <div className='lg:px-20 px-0'>
            <div className='freeShipping w-full p-4 border-2 rounded-md border-[#ff5252] flex flex-col lg:flex-row items-center justify-between'>
              <div className='col1 flex items-center gap-4'>
                <LiaShippingFastSolid className='text-5xl text-zinc-700' />
                <span className='text-xl uppercase font-semibold text-zinc-700'>Free Shipping</span>
              </div>
              <div className='col2'>
                <p className='text-center text-sm'>
                  Free Delivery Now on Your First Order and over $200
                </p>
              </div>
              <div>
                <span className='lg:text-4xl text-xl font-semibold text-zinc-700'>- Only $200*</span>
              </div>
            </div>
          </div>
        </div>
        <AdsBanenrSlider />
      </section>

      <section>
        <div className="container">
          <div className='py-6'>
            <h2 className='lg:text-3xl text-xl font-semibold text-zinc-700'>Latest Product</h2>
            <ProductSlider endpoint={'/api/product/getProducts?tag=new'} items={5} />
          </div>
        </div>
      </section>

      <section className='py-5 pt-0 bg-white blogSection'>
        <div className='py-5 px-6'>
          <div className='pb-4'>
            <h2 className='text-3xl font-semibold text-zinc-700'>Latest Blog</h2>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={
              {
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }
            }
            className="blogSwiper">
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  )
}

export default Home
