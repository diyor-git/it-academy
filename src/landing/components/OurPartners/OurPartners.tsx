import "./OurPartners.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getPartnersSelector } from "../../../redux/selectors/usersSelectors";
import { getPartners } from "../../../redux/reducers/usersReducer";

const OurPartners = () => {
  const dispatch = useAppDispatch();
  let partners = useAppSelector((state) => getPartnersSelector(state));

  useEffect(() => {
    dispatch(getPartners());
  }, []);

  // if (partners.length <= 0) {
  //     return <Preloader/>
  // }
  return (
    <section className="ourPartners">
      <div className="container">
        <h2 className="title">Наши партнёры</h2>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        centeredSlides={true}
        slidesPerView={5}
        loop={true}
        autoplay={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {partners.map((partner, index: number) => (
          <SwiperSlide key={index}>
            <img src={partner.photo} alt="partner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OurPartners;
