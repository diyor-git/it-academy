import React from "react";
import "./ChangeLives.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination } from "swiper";
import "swiper/css";

const ChangeLives = () => {
    let videos = [
        {link: "https://www.youtube.com/embed/-2SBMc-nDPw"},
        {link: "https://www.youtube.com/embed/NoxaVTS12b0"},
        {link: "https://www.youtube.com/embed/dgBK_gEpXwk"}
    ]

  return (
    <div className="change-lives">
      <div className="container">
        <h2>Меняем жизнь</h2>
          <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={50}
              centeredSlides={true}
              slidesPerView={1}
              followFinger={false}
              loop={true}
              autoplay ={{
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false
              }}
              breakpoints={{
                  320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                  },
                  768: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                  },
                  1024: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                  },
                  1440: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                  },
              }}
          >
              {videos.map((video, index: number) => (
                  <SwiperSlide key={index}>
                      <iframe src={video.link} title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen/>
                  </SwiperSlide>
              ))}
          </Swiper>
      </div>
    </div>
  );
};

export default ChangeLives;
