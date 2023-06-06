import React from "react";
import youtube from "../../../assets/image/youtube.png";
import telegram from "../../../assets/image/telegram.png";
import instagram from "../../../assets/image/instagram.png";

import s from "./Footer.module.scss";
const Footer = () => {
  return (
    <div className={s.footer}>
      <div className="landing-container">
        {/* <span></span> */}
        <div className={s.footerContent}>
          <div>
            <h3>©2021 Mate</h3>
            <p>
              Сделано с любовью by{" "}
              <a target="_blank" href="https://lagom.software/">
                lagom.software
              </a>
            </p>
          </div>
          <div>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/mate_education/"
            >
              <img src={instagram} alt="" />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.youtube.com/channel/UCCSeJq66I9e6dDO8CH159SA"
            >
              <img src={youtube} alt="" />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://t.me/joinchat/ABxg-n4AyT5hMjNi"
            >
              <img src={telegram} alt="" />
            </a>
          </div>
          <div>
            <a href="">
              <h2>Политика конфиденциальности</h2>
            </a>
            <a href="">
              <h2>Реквизиты</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
