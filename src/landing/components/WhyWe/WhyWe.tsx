import "./WhyWe.scss";
import whyWe1 from "../../../assets/icons/whyWe1.svg";
import whyWe2 from "../../../assets/icons/whyWe2.svg";
import whyWe3 from "../../../assets/icons/whyWe3.svg";
import whyWe4 from "../../../assets/icons/whyWe4.svg";
import whyWe5 from "../../../assets/image/whyWe1.png";
import whyWe6 from "../../../assets/image/whyWe2.png";
import whyWe7 from "../../../assets/image/whyWe3.png";
import whyWe8 from "../../../assets/image/whyWe4.png";

import { useState } from "react";
import { Modal } from "antd";

const WhyWe = () => {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);

  const handleOk = () => {
    setIsModalVisible1(false);
  };

  const handleCancel = () => {
    setIsModalVisible1(false);
  };

  return (
    <section className="whyWe">
      <div className="container">
        <h2 className="title">
          Почему <span>мы?</span>
        </h2>
        <div className="cards">
          <div
            className="card"
            onClick={() => setIsModalVisible1(!isModalVisible1)}
          >
            <Modal
              visible={isModalVisible1}
              onOk={handleOk}
              className="card-modal"
              onCancel={handleCancel}
            >
              {" "}
              <div className="modal-content">
                <img src={whyWe5} alt="" />
                <div className="text">
                  <h3>Коммерческая разработка</h3>
                  <p>
                    Наши курсы составляются на основе коммерческой разработки.
                    Это означает, что вы учитесь на основе реальных проектов,
                    учитесь работать в команде, узнаёте инсайты о работе в IT от
                    практикующих программистов. Плюс ко всему, вы собираете
                    приличное портфолио из минимум 2-х крупных и множества
                    мелких проектов (у отдельных студентов к концу курса
                    набирается 17 готовых проектов). А в обновлении курсов
                    участвую ведущие IT компании, как, например, iTechArt.
                  </p>
                </div>
              </div>
            </Modal>

            <div className="card-icon">
              <img src={whyWe1} alt="" />
            </div>
            <div className="card-text">
              <h3>
                Коммерческая <br />
                разработка
              </h3>
            </div>
          </div>
          <div
            className="card"
            onClick={() => setIsModalVisible2(!isModalVisible2)}
          >
            <Modal
              visible={isModalVisible2}
              onOk={handleOk}
              className="card-modal"
              onCancel={handleCancel}
            >
              <div className="modal-content">
                <img src={whyWe6} alt="" />
                <div className="text">
                  <h3>Онбординг</h3>
                  <p>
                    Мы первое и единственное образовательное учреждение в своём
                    сегменте, к кому на защиту диплома приходят партнёрские
                    компании, чтобы отобрать себе лучших кандидатов на работу
                    или стажировку.
                  </p>
                </div>
              </div>
            </Modal>
            <div className="card-icon">
              <img src={whyWe2} alt="" />
            </div>
            <div className="card-text">
              <h3>Онбординг</h3>
            </div>
          </div>
          <div
            className="card"
            onClick={() => setIsModalVisible3(!isModalVisible3)}
          >
            <Modal
              visible={isModalVisible3}
              className="card-modal"
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="modal-content">
                <img src={whyWe7} alt="" />
                <div className="text">
                  <h3>Социальная жизнь</h3>
                  <p>
                    IT про людей. Правильное сообщество - ключ к успеху. Поэтому
                    мы организовываем так много соревнований, праздников,
                    поездок в горы, активного отдыха, пицца-пати, муви-найт, а
                    также собрали своё гейм-комьюнити любителей Dota, Apex,
                    PUBG, CS и других игрушек.
                    <br />
                    <br />
                    Помимо этого, раз в месяц мы отбираем 10 студентов для
                    экскурсии в компании, типа Express24, Uzcard, IT Park, Udevs
                    и так далее. Всё для того, чтобы вы понимали, к чему
                    стремиться, чего можно добиться после окончания обучения.
                  </p>
                </div>
              </div>
            </Modal>

            <div className="card-icon">
              <img src={whyWe3} alt="" />
            </div>
            <div className="card-text">
              <h3>Социальная жизнь</h3>
            </div>
          </div>
          <div
            className="card"
            onClick={() => setIsModalVisible4(!isModalVisible4)}
          >
            <Modal
              visible={isModalVisible4}
              className="card-modal"
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {" "}
              <div className="modal-content">
                <img src={whyWe8} alt="" />
                <div className="text">
                  <h3>Софт-скиллсы</h3>
                  <p>
                    Мы как разработчики понимаем, что для развития в IT нужен не
                    только навык писать код, пусть даже хороший. Вы должны уметь
                    презентовать себя и свои проекты, коммуницировать в команде,
                    самообучаться, решать задачи дизайнера, других
                    программистов, читать чужой код, находить нестандартный
                    подход. Это всё, чему не учат на обычных курсах, но что так
                    важно для дальнейшего роста в middle и для нахождения
                    работы.
                    <br />
                    <br /> Поэтому наша программы построена таким образом, что
                    вы не только проекты пилите, но и растёте как всесторонний
                    специалист.
                  </p>
                </div>
              </div>
            </Modal>
            <div className="card-icon" style={{ padding: "40px 28px" }}>
              <img src={whyWe4} alt="" />
            </div>
            <div className="card-text">
              <h3>Софт-скиллсы</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
