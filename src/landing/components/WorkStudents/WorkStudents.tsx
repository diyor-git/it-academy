import './WorkStudents.scss'
import {Autoplay, Navigation} from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation';
import work1 from "../../../assets/image/work1.png";
import work2 from "../../../assets/image/work2.png";

const WorkStudents = () => {
    return (
        <section className='workStudents'>
            <div className="container">
                <h2 className="title">Работы наших студентов</h2>
                <div className="slider">
                    <div className="navigations">
                        <div className="swiper-button-next next"/>
                        <div className="swiper-button-prev prev"/>
                    </div>
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={50}
                        centeredSlides={false}
                        navigation={
                            {
                                nextEl: '.next',
                                prevEl: '.prev',
                            }
                        }
                        slidesPerView={2}
                        loop={true}
                        autoplay={true}
                    >
                        <SwiperSlide>
                            <a href="">
                                <img src={work1} alt="Work"/>
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="">
                                <img src={work2} alt="Work"/>
                            </a>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default WorkStudents