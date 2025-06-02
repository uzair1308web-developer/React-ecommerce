import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import ProductItem from '../ProductItem';
import { fetchDataFromApi } from '../../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';


const ProductSlider = ({ endpoint }) => {
    const [prodData, setProdData] = useState([]);
    useEffect(() => {
        fetchDataFromApi(endpoint).then((res) => {
            if (!res?.error) {
                setProdData(res?.products)
            }
        })
    }, [endpoint])
    return (
        <div className='py-4 '>
            <Swiper

                slidesPerView={2}
                spaceBetween={10}
                className="mySwiper"
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >
                {
                    prodData && prodData?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <ProductItem product={item} />
                            </SwiperSlide>
                        )
                    })
                }
                {/* <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide> */}

            </Swiper>
        </div>
    )
}

export default ProductSlider
