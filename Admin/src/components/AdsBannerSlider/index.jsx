import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

const AdsBanenrSlider = () => {
    return (
        <div className='py-5 w-full px-8'>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
            >
                <SwiperSlide>
                    <div className='box rounded-md overflow-hidden'>
                        <img src="/assets/images/banner1.webp" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='box rounded-md overflow-hidden'>
                        <img src="/assets/images/banner2.webp" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='box rounded-md overflow-hidden'>
                        <img src="/assets/images/banner4.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='box rounded-md overflow-hidden'>
                        <img src="/assets/images/banner5.webp" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default AdsBanenrSlider
