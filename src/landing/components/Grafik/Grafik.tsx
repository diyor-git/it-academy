import React from "react";
import s from "./Grafik.module.scss";
import grafik from "../../../assets/image/grafik.png";
import violetCircle from "../../../assets/icons/violetcircle.png";
import blueCircle from "../../../assets/icons/bluecircle.png";

const Grafik = () => {
  return (
    <div className={s.grafik}>
      <div className="landing-container">
        <div className={s.grafikText}>
          <h2>
            График <span>experience</span>/<span>money</span>
          </h2>
        </div>
        <div className={s.grafikContent}>
          <div className={s.grafikContentImg}>
            <img src={grafik} alt="" />
          </div>
          <div className={s.grafikContentText}>
            <div className={s.grafikContentTexth4}>
              <h4>
                <img src={violetCircle} alt="circle" />
                MATE Education
              </h4>
              <h4>
                <img src={blueCircle} alt="circle" />
                Другие курсы
              </h4>
            </div>
            <div className={s.grafikContentText2}>
              <h3>Заработная плата:</h3>
              <h5>
                <span>150-300$ </span> - Junior обучение 6 месяцев
              </h5>
              <h5>
                <span>300-500$ </span> - Strong Junior 10 месяцев
              </h5>
              <h5>
                <span>500-1000$ </span> - Early Middle 1,5 года
              </h5>
              <h5>
                <span>1000-2000$ </span>- 2 года
              </h5>
            </div>
          </div>
        </div>
        <div id="aboutUs" className={s.mate}>
          <h2>Почему после MATE вы растёте быстрее?</h2>
          <div className={s.cards}>
            <div className={s.card}>
              <h4>Computer Science</h4>
              <p>
                <strong>Ключевой фактор</strong> – наличие
                <strong> Computer Science </strong> в основном материале. CS –
                это основа всего IT и ключ к переходу от звания junior
                разработчика к middle. Наряду с большей практикой, CS позволяет
                создавать проекты большей сложности, писать более качественный
                код.
              </p>
            </div>
            <div className={s.card}>
              <h4>Что в CS?</h4>
              <p>
                Мы как разработчики понимаем важность знаний в области
                <strong> Computer Science: </strong> оптимальные алгоритмы,
                эффективное хранение данных, устройство компилятора, памяти и
                сети. И это лишь малая часть того, что вы будете изучать и что
                так важно для дальнейшего развития как разработчика.
              </p>
            </div>
            <div className={s.card}>
              <h4>Польза CS</h4>
              <p>
                Также, <strong> CS даёт возможность </strong> взглянуть на
                программирование с высока и иметь целую картину происходящего в
                программировании.
              </p>
              <p>
                Обучение будет тяжёлым и долгим, если вы хотите выделиться из
                общей массы и гордо зваться специалистом.{" "}
                <strong>
                  {" "}
                  Вот почему в других учебных организациях не обучают CS.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grafik;
