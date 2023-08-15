import React from "react";
import Navbar from "../HeaderLanding/HeaderLanding";
import s from "./MainBanner.module.scss";
import mainBannerImg from "../../../assets/image/mainBannerImg.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={s.header}>
            <div className="landing-container">
                <Navbar/>
                <div className={s.mainBannerContent}>
                    <div className={s.mainBannerContentText}>
                        <h2>
                            <span>Онлайн платформа </span>
                            <br/>
                            по программировАНИЮ
                        </h2>
                        <p>
                            Делаем молодых специалистов в сфере IT из полных новичков
                            <br/>
                            Образовательная платформа со взглядом в будущее
                        </p>
                        <Link to={'/login'}>
                            <button>
                                Начать бесплатно
                            </button>
                        </Link>
                    </div>
                    <div className={s.headerImg}>
                        <img src={mainBannerImg} alt="main-banner-img"/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
