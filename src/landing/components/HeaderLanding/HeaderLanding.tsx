import React, { useState } from "react";
import s from "./HeaderLanding.module.scss";
import navLogo from "../../../assets/image/landingLogo.png";
import hamburgerMenu from "../../../assets/icons/hamburgerMenu.svg";
import x from "../../../assets/icons/x.svg";
import door from "../../../assets/icons/door.svg";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  return (
      <>
        <nav className={s.headerLanding}>
          <div className={s.headerLandingLogo}>
            <img src={navLogo} alt="header-landing-logo" />
          </div>
          <ul className={s.navList}>
            <li className={s.navItem}>
              <HashLink smooth to="#aboutUs" className={s.navLink}>
                О нас
              </HashLink>
            </li>
            <li className={s.navItem}>
              <HashLink smooth to="#whoIsThisCourseFor" className={s.navLink}>
                Для кого
              </HashLink>
            </li>
            <li className={s.navItem}>
              <HashLink smooth to="#program" className={s.navLink}>
                Программа
              </HashLink>
            </li>
            <li className={s.navItem}>
              <HashLink smooth to="#whyCs" className={s.navLink}>
                Преимущества
              </HashLink>
            </li>
            <li className={s.navItem}>
              <HashLink smooth to="#reviews" className={s.navLink}>
                Отзывы
              </HashLink>
            </li>
            <li className={s.navItem}>
              <HashLink smooth to="#someQuestion" className={s.navLink}>
                Контакты
              </HashLink>
            </li>
          </ul>
          <ul>
            <li className={s.navItem}>
              <Link to="/dashboard" className={s.navLink}>
              <span>
                Вход <img src={door} alt="door" />
              </span>
              </Link>
            </li>
            <li className={s.navItem}>
              <a href="tel:+998 97 770 24 03">+998 97 770 24 03</a>
            </li>
          </ul>
          <div className={s.menuBtn}>
            <img
                src={menu ? x : hamburgerMenu}
                onClick={() => {
                  if (menu) {
                    setMenu(false);
                  } else {
                    setMenu(true);
                  }
                  console.log(menu);
                }}
                alt=""
            />
          </div>
        </nav>
        <nav className={menu ? s.responseNav : s.none}>
          <div>
            <ul>
              <li onClick={() => setMenu(false)}>
                <HashLink smooth to="#aboutUs">
                  О нас
                </HashLink>
              </li>
              <li onClick={() => setMenu(false)}>
                <HashLink smooth to="#whoIsThisCourseFor">
                  Для кого
                </HashLink>
              </li>
              <li onClick={() => setMenu(false)}>
                <HashLink smooth to="#program">
                  Программа
                </HashLink>
              </li>
              <li onClick={() => setMenu(false)}>
                <HashLink smooth to="#whyCs">
                  Преимущества
                </HashLink>
              </li>
              <li onClick={() => setMenu(false)}>
                <HashLink smooth to="#reviews">
                  Отзывы
                </HashLink>
              </li>
              <li onClick={() => setMenu(false)}>
                <HashLink smooth to="#someQuestion">
                  Контакты
                </HashLink>
              </li>
              <li onClick={() => setMenu(false)} className={s.navItem}>
                <Link to="/dashboard" className={s.navLink}>
                <span>
                  Вход <img src={door} alt="door" />
                </span>
                </Link>
              </li>
              <li>
                <a href="tel:+998 97 770 24 03">+998 97 770 24 03</a>
              </li>
            </ul>
          </div>
        </nav>
      </>
  );
};

export default Navbar;
