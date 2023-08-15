import "./ReviewsMedia.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import partner2 from "../../../assets/image/partner2.png";
import partner1 from "../../../assets/image/partner1.png";
import partner3 from "../../../assets/image/partner3.png";
import { useTranslation } from "react-i18next";

const ReviewsMedia = () => {
  const {t} = useTranslation()
  return (
    <section className="reviewsMedia">
      <div className="container">
        <h2 className="title">
          {t('review')} <span>{t('partners')}</span>
        </h2>
      </div>
      <div className="slider">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={50}
          freeMode={true}
          longSwipesRatio={5}
          speed={5000}
          longSwipesMs={1000}
          centeredSlides={false}
          resistanceRatio={2}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
              speed: 3000,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
              speed: 3000,
            },
            1024: {
              slidesPerView: 1,
              speed: 5000,
              spaceBetween: 20,
            },
            1440: {
              speed: 5000,
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          scrollbar={{
            el: ".scroll2",
            draggable: true,
          }}
          slidesPerView={2}
          loop={true}
          autoplay={{
            disableOnInteraction: false,
            delay: 200,
            reverseDirection: false,
          }}
        >
          <SwiperSlide>
            <div className="card">
              <div className="message">
                <p>
                  Мы познакомились с Академией на выпускном в Декабре 2021-года.
                  Там мы смогли оценить выпускников и даже провести
                  собеседования с некоторыми из них. Уверенно можем сказать, что
                  студентам Академии мы всегда будем рады в нашей команде.
                </p>
              </div>
              <div className="logo">
                <img src={partner2} alt="Partner" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <div className="message">
                <p>
                  После посещения защиты дипломов, мы смогли отметить себе
                  несколько перспективных ребят и взяли их контакты. В целом,
                  уровень выпускников очень понравился. Единственное, нам бы
                  хотелось, чтобы выпускники ещё владели английским языком
                </p>
              </div>
              <div className="logo">
                <img src={partner1} alt="Partner" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <div className="message">
                <p>
                  IT Academy существует относительно не долго на рынке, но за
                  это время смогла вывести систему образования на новый уровень,
                  ввести много нового, а ещё завоевать репутацию среди IT
                  компаний Ташкента
                </p>
              </div>
              <div className="logo">
                <img src={partner3} alt="Partner" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="slider second-slider">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          longSwipesRatio={5}
          freeMode={true}
          speed={5000}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
              speed: 800,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
              speed: 800,
            },
            1024: {
              slidesPerView: 1,
              speed: 5000,
              spaceBetween: 20,
            },
            1440: {
              speed: 5000,
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          longSwipesMs={2000}
          centeredSlides={false}
          resistanceRatio={2}
          scrollbar={{
            el: ".scroll2",
            draggable: true,
          }}
          slidesPerView={2}
          loop={true}
          autoplay={{
            disableOnInteraction: false,
            delay: 200,
            reverseDirection: true,
          }}
        >
          <SwiperSlide>
            <div className="card">
              <div className="logo">
                <img src={partner2} alt="Partner" />
              </div>
              <div className="message">
                <p>
                  Мы познакомились с Академией на выпускном в Декабре 2021-года.
                  Там мы смогли оценить выпускников и даже провести
                  собеседования с некоторыми из них. Уверенно можем сказать, что
                  студентам Академии мы всегда будем рады в нашей команде.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <div className="logo">
                <img src={partner1} alt="Partner" />
              </div>
              <div className="message">
                <p>
                  После посещения защиты дипломов, мы смогли отметить себе
                  несколько перспективных ребят и взяли их контакты. В целом,
                  уровень выпускников очень понравился. Единственное, нам бы
                  хотелось, чтобы выпускники ещё владели английским языком
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <div className="logo">
                <img src={partner3} alt="Partner" />
              </div>
              <div className="message">
                <p>
                  IT Academy существует относительно не долго на рынке, но за
                  это время смогла вывести систему образования на новый уровень,
                  ввести много нового, а ещё завоевать репутацию среди IT
                  компаний Ташкента
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="swiper-scrollbar scroll2">
        <div className="swiper-scrollbar-drag"></div>
      </div>
    </section>
  );
};

export default ReviewsMedia;
