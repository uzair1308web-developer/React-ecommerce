import { Swiper, SwiperSlide } from "swiper/react"

import 'swiper/css'

import { Autoplay } from 'swiper/modules';
import { useState } from "react";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";

const HomeSlider = () => {
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        fetchDataFromApi("/api/banner/get").then((res) => {
            console.log(res?.slider);
            if (res?.error === false) {
                setSliderData(res?.slider)
            }
        })
    }, [])
    return (
        <>
            <Swiper navigation={true} autoplay={{ delay: 2500, disableOnInteraction: false, }} modules={[Autoplay]} className="mySwiper">
                {
                    sliderData?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img src={item?.image} alt="" className="w-full max-sm:aspect-[16/7] max-sm:object-stretch" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    )
}

export default HomeSlider
