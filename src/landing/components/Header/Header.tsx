import "./Header.scss";
import logo from "../../../assets/image/logo.png";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {HashLink} from "react-router-hash-link";
import {useTranslation} from "react-i18next";

type Props = {
    theme?: string;
};

const Header: React.FC<Props> = ({theme}) => {
    const {t, i18n} = useTranslation()
    const [nav, setNav] = useState(false);
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };
    return (
        <div id="nav">
            <div className="nav">
                <div className={theme === "black" ? "black-theme-header" : ""}>
                    <div className="header-bg">
                        <header className="header">
                            <Link to={`/`}>
                                <div className="logo">
                                    <img src={logo} alt="IT-ACADEMY"/>
                                </div>
                            </Link>
                            <nav>
                                <Link to={`/aboutUs`}>
                                    <p>{t('Sidebar:about')}</p>
                                </Link>
                                <Link to={`/blog`}>
                                    <p>{t('Sidebar:blog')}</p>
                                </Link>
                                <Link to={`/students/portfolio`}>
                                    <p>{t('Sidebar:students')}</p>
                                </Link>
                                <HashLink smooth to={`/#job`}>
                                    <p>{t('Sidebar:employment')}</p>
                                </HashLink>
                                <a className="phone" href="tel: +998 99 057 52 02">
                                    +998 99 057 52 02
                                </a>
                                <Link to={`/login`}>
                                    <button>{t('Sidebar:logIn')}</button>
                                </Link>
                            </nav>
{/*                            <div className="lang">
                                <h4 className={i18n.language === "ru" ? "active" : ""}
                                    onClick={() => changeLanguage("ru")}>Ru</h4>
                                <h4 className={i18n.language === "uz" ? "active" : ""}
                                    onClick={() => changeLanguage("uz")}>Uz</h4>
                            </div>*/}
                        </header>
                    </div>
                </div>
            </div>
            <div
                className={`response-nav ${
                    theme === "black" ? "black-theme-response" : ""
                }`}
            >
                <div className={nav ? "none" : "nav-header"}>
                    <Link to={`/`}>
                        <img src={logo} alt="IT-ACADEMY"/>
                    </Link>
                    <i className="fa-solid fa-bars" onClick={() => setNav(true)}/>
                </div>
                <div className={!nav ? "none" : "open-menu"}>
                    <div className="open-menu-header">
                        <h3>Меню</h3>
                        <i className="fa-solid fa-xmark" onClick={() => setNav(false)}/>
                    </div>
                    <div className="open-nav-translation">
                        <h4 className={i18n.language === "ru" ? "active" : ""}
                            onClick={() => changeLanguage("ru")}>Ru</h4>
                        <h4 className={i18n.language === "uz" ? "active" : ""}
                            onClick={() => changeLanguage("uz")}>Uz</h4>
                    </div>
                    <ul>
                        <li>
                            <Link to="/aboutUs">{t('Sidebar:about')}</Link>
                        </li>
                        <li>
                            <Link to="/blog">{t('Sidebar:blog')}</Link>
                        </li>
                        <li>
                            <Link to="/students/portfolio">{t('Sidebar:students')}</Link>
                        </li>
                        <li>
                            <HashLink smooth to={`/#job`}>
                                {t('Sidebar:employment')}
                            </HashLink>
                        </li>
                    </ul>
                    <Link to={"/dashboard"}>
                        <button>{t('Sidebar:logIn')}</button>
                    </Link>
                    <div className="open-nav-footer">
                        <h3>Возникли вопросы?</h3>
                        <a href="tel: +998 99 057 52 02">
                            <h2>+998 99 057 52 02</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
