

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';

const HomeCatSlider = () => {
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      console.log(res);
      if (res?.error === false) {
        setCatData(res?.data)
      }
    })
  }, [])
  
  return (
    <>
      <div className='py-8 px-6'>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          autoplay={{ delay: 2500, disableOnInteraction: false, }}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
        >
          {
            catData?.length !== 0 && catData?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link  to={`/product-listing/${item?.name}`}>
                    <div className='bg-white lg:py-6 lg:px-8 py-3 px-4 flex justify-center items-center flex-col gap-2'>
                      <img src={item?.images} alt="" className='lg:w-[60px] w-[40px] transition-all' />
                      <h4 className='sm:text-lg'>{item?.name}</h4>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </>
  )
}

export default HomeCatSlider
