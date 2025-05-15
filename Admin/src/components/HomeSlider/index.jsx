import { Swiper, SwiperSlide } from "swiper/react"

import 'swiper/css'
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
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
            <Swiper navigation={true} autoplay={{ delay: 2500, disableOnInteraction: false, }} modules={[Navigation, Autoplay]} className="mySwiper">
                {
                    sliderData?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img src={item?.image} alt="" className="w-full" />
                            </SwiperSlide>
                        )
                    })
                }
                {/* <SwiperSlide><img src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg" alt="" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src="https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg" alt="" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src="https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg" alt="" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src="https://api.spicezgold.com/download/file_1734525014348_NewProject(7).jpg" alt="" className="w-full" /></SwiperSlide> */}
            </Swiper>
        </>
    )
}

export default HomeSlider
