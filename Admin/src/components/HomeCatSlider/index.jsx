

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
          slidesPerView={8}
          spaceBetween={10}
          className="mySwiper"
        >
          {
            catData?.length !== 0 && catData?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link to='/'>
                    <div className='bg-white py-6 px-8 flex justify-center items-center flex-col gap-2'>
                      <img src={item?.images} alt="" className='w-[60px] transition-all' />
                      <h4 className='text-lg'>{item?.name}</h4>
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
