import React from "react";
import "./StudentsSalary.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper";
import { Avatar, Rate } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
const StudentsSalary = () => {
  return (
    <div className="students-salary">
      <section className="reviewsStudents">
        <div className="container">
          <h2 className="title">Отзывы студентов</h2>
          <div className="slider">
            <div className="navigations">
              <div className="swiper-button-next next" />
              <div className="swiper-button-prev prev" />
            </div>
            <Swiper
              modules={[Autoplay, Navigation, Scrollbar]}
              spaceBetween={50}
              centeredSlides={false}
              scrollbar={{
                el: ".scroll1",
                draggable: true,
              }}
              navigation={{
                nextEl: ".next",
                prevEl: ".prev",
              }}
              slidesPerView={3}
              loop={false}
              autoplay={true}
            >
              <SwiperSlide>
                <div className="card">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71 }}
                    icon={""}
                  />
                  <h3>Евгений Антипов</h3>
                  <h4>6 000 000 cум</h4>
                  <p>
                    Nullam dictum felis eu pede mollis pretium. Integer
                    tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                    Aenean vulputate eleifend tellus. Aenean leo ligula,
                    porttitor eu.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71 }}
                    icon={""}
                  />
                  <h3>Евгений Антипов</h3>
                  <h4>6 000 000 cум</h4>

                  <p>
                    Nullam dictum felis eu pede mollis pretium. Integer
                    tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                    Aenean vulputate eleifend tellus. Aenean leo ligula,
                    porttitor eu.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71 }}
                    icon={""}
                  />
                  <h3>Евгений Антипов</h3>
                  <h4>6 000 000 cум</h4>
                  <p>
                    Nullam dictum felis eu pede mollis pretium. Integer
                    tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                    Aenean vulputate eleifend tellus. Aenean leo ligula,
                    porttitor eu.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71 }}
                    icon={""}
                  />
                  <h3>Евгений Антипов</h3>
                  <h4>6 000 000 cум</h4>
                  <p>
                    Nullam dictum felis eu pede mollis pretium. Integer
                    tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                    Aenean vulputate eleifend tellus. Aenean leo ligula,
                    porttitor eu.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71 }}
                    icon={""}
                  />
                  <h3>Евгений Антипов</h3>
                  <h4>6 000 000 cум</h4>
                  <p>
                    Nullam dictum felis eu pede mollis pretium. Integer
                    tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                    Aenean vulputate eleifend tellus. Aenean leo ligula,
                    porttitor eu.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 70, xxl: 71 }}
                    icon={""}
                  />
                  <h3>Евгений Антипов</h3>
                  <h4>6 000 000 cум</h4>
                  <p>
                    Nullam dictum felis eu pede mollis pretium. Integer
                    tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                    Aenean vulputate eleifend tellus. Aenean leo ligula,
                    porttitor eu.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-scrollbar scroll1">
              <div className="swiper-scrollbar-drag"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentsSalary;
