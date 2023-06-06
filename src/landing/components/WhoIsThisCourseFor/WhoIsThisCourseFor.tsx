import React from "react";
import one from "../../../assets/icons/one.svg";
import two from "../../../assets/icons/two.svg";
import s from "./WhoIsThisCourseFor.module.scss";
import star from "../../../assets/icons/star.svg";

const WhoIsThisCourseFor = () => {
  return (
    <div id="whoIsThisCourseFor" className={s.whoIsThisCourseFor}>
      <div className="landing-container">
        <h2>Для кого этот курс ?</h2>
        <div className={s.star}>
          <img src={star} alt="" />
        </div>
        <div className={s.card}>
          <div className={s.firstCard}>
            <div className={s.icon}>
              <img src={one} alt="one" />
            </div>
            <h3>
              Для мечтающих <br /> о своем стартапе
            </h3>
            <ul>
              <li>Научитесь идею превращать в IT решения</li>
              <li>Будете применять свои знания в разных нишах</li>
              <li>Познакомитесь с рынком IT изнутри</li>
              <li>Выработаете дисциплину разработчика</li>
              <li>Привыкнете к многочасовой работе над одним проектом</li>
            </ul>
          </div>
          <div className={s.secondCard}>
            <div className={s.icon}>
              <img src={two} alt="two" />
            </div>
            <h3>Для тех, кто хочет получить первую работу</h3>
            <ul>
              <li>Научитесь идею превращать в IT решения</li>
              <li>Будете применять свои знания в разных нишах</li>
              <li>Познакомитесь с рынком IT изнутри</li>
              <li>Выработаете дисциплину разработчика</li>
              <li>Привыкнете к многочасовой работе над одним проектом</li>
            </ul>
          </div>
        </div>
        <div className={s.star2}>
          <img src={star} alt="" />
        </div>
      </div>
    </div>
  );
};

export default WhoIsThisCourseFor;
