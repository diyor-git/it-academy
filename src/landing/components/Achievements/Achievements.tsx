import { Steps } from "antd";
import "./Achievements.scss";
import academy1 from "../../../assets/image/academy1.png";
import academy2 from "../../../assets/image/academy2.png";
import academy3 from "../../../assets/image/academy3.png";
import academy4 from "../../../assets/image/academy4.png";
import academy5 from "../../../assets/image/academy5.png";
import academy6 from "../../../assets/image/academy6.png";
import academy7 from "../../../assets/image/academy7.png";
import academy8 from "../../../assets/image/academy8.png";
import academy9 from "../../../assets/image/academy9.png";

const Achievements = () => {
  const { Step } = Steps;
  return (
    <section className="achievements">
      <div className="container">
        <h2 className="title">Достижения</h2>
        <Steps progressDot current={1} direction="vertical">
          <Step
            status="finish"
            description={
              <div className="bodyCard">
                <div className="stepCard">
                  <h3>Октябрь 2020</h3>
                  <p>
                    Нам исполнился месяц и мы ввели новую методику обучения -
                    блочная система образования. Благодаря ей успеваемость
                    студентов находится под постоянным контролем, а учёба даётся
                    легче.
                  </p>
                </div>
              </div>
            }
          />
          <Step
            status="finish"
            description={
              <div className="bodyCard">
                <div className="stepCard">
                  <h3>Март 2021</h3>
                  <p>
                    Мы начали налаживать контакт с зарубежными компаниями в
                    сфере IT и IT образования. В Академии впервые была проведена
                    Agile встреча, где выступал Ринат Ахтямов - руководитель
                    Epam Uzbekistan.
                  </p>
                </div>
                <div className="images">
                  <img src={academy1} alt="IT-ACADEMY" />
                  <img src={academy2} alt="IT-ACADEMY" />
                </div>
              </div>
            }
          />
          <Step
            status="finish"
            description={
              <div className="bodyCard">
                <div className="stepCard">
                  <h3>Июль 2021</h3>
                  <p>
                    Мы вводим систему оценивания уровня образования студентов по
                    30 метрикам, а также вводим в своей нише первую в
                    Узбекистане грейдовую систему оценки студентов и финальный
                    проект.
                  </p>
                </div>
                <div className="images">
                  <img src={academy3} alt="IT-ACADEMY" />
                  <img src={academy4} alt="IT-ACADEMY" />
                </div>
              </div>
            }
          />
          <Step
            status="finish"
            description={
              <div className="bodyCard">
                <div className="stepCard">
                  <h3>Октябрь 2021</h3>
                  <p>
                    Мы выступали на Agile Talks на тему образовательных метрик -
                    огромный обмен опытом с представителями крупных IT компаний
                    для улучшения образовательной системы в нашей Академии.
                  </p>
                </div>
                <div className="images">
                  <img src={academy5} alt="IT-ACADEMY" />
                  <img src={academy6} alt="IT-ACADEMY" />
                </div>
                <p className="sub-title">
                  Помимо этого в Октябре мы также провели первый совместный
                  ивент совместно с крупной зарубежной компанией - Skillbox.
                </p>
                <div className="images">
                  <img src={academy7} alt="IT-ACADEMY" />
                  <img src={academy8} alt="IT-ACADEMY" />
                  <img src={academy9} alt="IT-ACADEMY" />
                </div>
              </div>
            }
          />
          <Step
            status="finish"
            description={
              <div className="bodyCard">
                <div className="stepCard">
                  <h3>Декабрь 2021</h3>
                  <p>
                    Мы провели первую защиту дипломных проектов, на которой
                    присутствовали представители таких компаний как “EPAM”,
                    “Exadel”, “iTechArt”, “Kash App”. Результат - 6 из 7
                    студентов с грейдом “А” получили предложение о прохождении
                    стражировки у партнёров.
                  </p>
                  <p>
                    Это очень краткая хронология, ведь помимо всего этого мы
                    плотно работали над созданием крепкого IT комьюнити молодых
                    разработчиков с Ташкента (ссылка), а также создавали канал с
                    заказами для студентов, чтобы лучшие из них могли применять
                    свои знания на практике и зарабатывать свои первые деньги.
                  </p>
                </div>
              </div>
            }
          />
        </Steps>
      </div>
    </section>
  );
};

export default Achievements;
