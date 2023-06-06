import "./ReviewsStudents.scss";
import star from "../../../assets/icons/star.svg";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Scrollbar} from "swiper";
import {Avatar, Rate} from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import TelegramComments from "react-telegram-comments";

const ReviewsStudents = () => {
    return (
        <section className="reviewsStudents">
            <div className="container">
                <h2 className="title">Отзывы студентов</h2>
                <TelegramComments
                    customColor="FF8000"
                    customHeight={-10}
                    commentsNumber={20}
                    isDark={false}
                    //pageId={centerId}
                    showColorfulNames
                    showDislikes
                    showIconOutlines={false}
                    websiteKey="P_skZny7"
                    containerClassName="awesome-comments"
                    wrapperClassName="awesome-comments__wrapper"
                    pageId={''}/>
                {/*<div className="slider">*/}
                {/*    <div className="navigations">*/}
                {/*        <div className="swiper-button-next next"/>*/}
                {/*        <div className="swiper-button-prev prev"/>*/}
                {/*    </div>*/}
                {/*    <Swiper*/}
                {/*        modules={[Autoplay, Navigation, Scrollbar]}*/}
                {/*        spaceBetween={50}*/}
                {/*        centeredSlides={false}*/}
                {/*        scrollbar={{*/}
                {/*            el: ".scroll1",*/}
                {/*            draggable: true,*/}
                {/*        }}*/}
                {/*        navigation={{*/}
                {/*            nextEl: ".next",*/}
                {/*            prevEl: ".prev",*/}
                {/*        }}*/}
                {/*        slidesPerView={3}*/}
                {/*        loop={false}*/}
                {/*        autoplay={true}*/}
                {/*    >*/}
                {/*        <SwiperSlide>*/}
                {/*            <div className="card">*/}
                {/*                <Avatar*/}
                {/*                    size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71}}*/}
                {/*                    icon={""}*/}
                {/*                />*/}
                {/*                <h3>Евгений Антипов</h3>*/}
                {/*                <Rate*/}
                {/*                    disabled*/}
                {/*                    defaultValue={4}*/}
                {/*                    character={() => <img src={star} alt="Rate"/>}*/}
                {/*                />*/}
                {/*                <p>*/}
                {/*                    Nullam dictum felis eu pede mollis pretium. Integer tincidunt.*/}
                {/*                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate*/}
                {/*                    eleifend tellus. Aenean leo ligula, porttitor eu.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <div className="card">*/}
                {/*                <Avatar*/}
                {/*                    size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71}}*/}
                {/*                    icon={""}*/}
                {/*                />*/}
                {/*                <h3>Евгений Антипов</h3>*/}
                {/*                <Rate*/}
                {/*                    disabled*/}
                {/*                    defaultValue={4}*/}
                {/*                    character={() => <img src={star} alt="Rate"/>}*/}
                {/*                />*/}
                {/*                <p>*/}
                {/*                    Nullam dictum felis eu pede mollis pretium. Integer tincidunt.*/}
                {/*                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate*/}
                {/*                    eleifend tellus. Aenean leo ligula, porttitor eu.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <div className="card">*/}
                {/*                <Avatar*/}
                {/*                    size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71}}*/}
                {/*                    icon={""}*/}
                {/*                />*/}
                {/*                <h3>Евгений Антипов</h3>*/}
                {/*                <Rate*/}
                {/*                    disabled*/}
                {/*                    defaultValue={4}*/}
                {/*                    character={() => <img src={star} alt="Rate"/>}*/}
                {/*                />*/}
                {/*                <p>*/}
                {/*                    Nullam dictum felis eu pede mollis pretium. Integer tincidunt.*/}
                {/*                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate*/}
                {/*                    eleifend tellus. Aenean leo ligula, porttitor eu.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <div className="card">*/}
                {/*                <Avatar*/}
                {/*                    size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71}}*/}
                {/*                    icon={""}*/}
                {/*                />*/}
                {/*                <h3>Евгений Антипов</h3>*/}
                {/*                <Rate*/}
                {/*                    disabled*/}
                {/*                    defaultValue={4}*/}
                {/*                    character={() => <img src={star} alt="Rate"/>}*/}
                {/*                />*/}
                {/*                <p>*/}
                {/*                    Nullam dictum felis eu pede mollis pretium. Integer tincidunt.*/}
                {/*                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate*/}
                {/*                    eleifend tellus. Aenean leo ligula, porttitor eu.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <div className="card">*/}
                {/*                <Avatar*/}
                {/*                    size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71}}*/}
                {/*                    icon={""}*/}
                {/*                />*/}
                {/*                <h3>Евгений Антипов</h3>*/}
                {/*                <Rate*/}
                {/*                    disabled*/}
                {/*                    defaultValue={4}*/}
                {/*                    character={() => <img src={star} alt="Rate"/>}*/}
                {/*                />*/}
                {/*                <p>*/}
                {/*                    Nullam dictum felis eu pede mollis pretium. Integer tincidunt.*/}
                {/*                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate*/}
                {/*                    eleifend tellus. Aenean leo ligula, porttitor eu.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <div className="card">*/}
                {/*                <Avatar*/}
                {/*                    size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71}}*/}
                {/*                    icon={""}*/}
                {/*                />*/}
                {/*                <h3>Евгений Антипов</h3>*/}
                {/*                <Rate*/}
                {/*                    disabled*/}
                {/*                    defaultValue={4}*/}
                {/*                    character={() => <img src={star} alt="Rate"/>}*/}
                {/*                />*/}
                {/*                <p>*/}
                {/*                    Nullam dictum felis eu pede mollis pretium. Integer tincidunt.*/}
                {/*                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate*/}
                {/*                    eleifend tellus. Aenean leo ligula, porttitor eu.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </SwiperSlide>*/}
                {/*    </Swiper>*/}
                {/*    <div className="swiper-scrollbar scroll1">*/}
                {/*        <div className="swiper-scrollbar-drag"></div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    );
};

export default ReviewsStudents;
