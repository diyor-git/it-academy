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
import {useTranslation} from "react-i18next";

const WhyWe = () => {
  const {t} = useTranslation()
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
          {t('why')} <span>{t('we')}</span>
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
              <div className="modal-content">
                <img src={whyWe5} alt="Why We?" />
                <div className="text">
                  <h3>{t('whyWe1')}</h3>
                  <p>{t('whyWe2')}</p>
                </div>
              </div>
            </Modal>

            <div className="card-icon">
              <img src={whyWe1} alt="" />
            </div>
            <div className="card-text">
              <h3>
                {t('whyWe3')} <br />
                {t('whyWe4')}
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
                <img src={whyWe6} alt="Why we?" />
                <div className="text">
                  <h3>{t('whyWe5')}</h3>
                  <p>{t('whyWe6')}</p>
                </div>
              </div>
            </Modal>
            <div className="card-icon">
              <img src={whyWe2} alt="" />
            </div>
            <div className="card-text">
              <h3>{t('whyWe5')}</h3>
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
                  <h3>{t('whyWe7')}</h3>
                  <p>
                    {t('whyWe8')}
                    <br />
                    <br />
                    {t('whyWe9')}
                  </p>
                </div>
              </div>
            </Modal>

            <div className="card-icon">
              <img src={whyWe3} alt="" />
            </div>
            <div className="card-text">
              <h3>{t('whyWe7')}</h3>
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
              <div className="modal-content">
                <img src={whyWe8} alt="" />
                <div className="text">
                  <h3>{t('whyWe10')}</h3>
                  <p>
                    {t('whyWe11')}
                    <br />
                    <br /> {t('whyWe12')}
                  </p>
                </div>
              </div>
            </Modal>
            <div className="card-icon" style={{ padding: "40px 28px" }}>
              <img src={whyWe4} alt="" />
            </div>
            <div className="card-text">
              <h3>{t('whyWe10')}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
