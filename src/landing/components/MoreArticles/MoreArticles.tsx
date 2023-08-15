import React, {useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";
import "./MoreArticles.scss";
import moment from "moment";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getArticlesSelector} from "../../../redux/selectors/usersSelectors";
import Preloader from "../Preloader/Preloader";
import {getArticles} from "../../../redux/reducers/usersReducer";
import {Link} from "react-router-dom";

const MoreArticles = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state) => getArticlesSelector(state));

    useEffect(() => {
        dispatch(getArticles());
    }, []);
    if (!articles) {
        return <Preloader/>;
    }
    return (
        <div className="moreArticles">
            <div className="container">
                <h1 className="title">Eще статьи на эту тему:</h1>
                <div className="slider">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={50}
                        centeredSlides={false}
                        slidesPerView={3}
                        loop={false}
                        autoplay={true}
                        speed={3000}
                        longSwipesMs={500}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1440: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {articles.slice(0, 3).map((a, key: number) =>
                            <SwiperSlide key={key}>
                                <Link to={`/article/${a.pk}`}>
                                    <div className="card">
                                        <div className="img">
                                            <img src={a.photo} alt=""/>
                                        </div>
                                        <div className="card-title">
                                            <p>{a.title.slice(0, 70)}...</p>
                                            <h6>Дата публикации: {moment(a.created_at).format("DD.MM.YYYY")}</h6>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default MoreArticles;
