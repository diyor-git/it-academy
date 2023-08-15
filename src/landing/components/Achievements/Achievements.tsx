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
import {useTranslation} from "react-i18next";

const Achievements = () => {
  const {t} = useTranslation()
  const { Step } = Steps;

  return (
    <section className="achievements">
      <div className="container">
        <h2 className="title">{t('about34')}</h2>
        <Steps progressDot current={1} direction="vertical">
          <Step
            status="finish"
            description={
              <div className="bodyCard">
                <div className="stepCard">
                  <h3>{t('about35')}</h3>
                  <p>{t('about36')}</p>
                </div>
              </div>
            }
          />
          <Step
            status="finish"
            description={
              <div className="bodyCard">
                <div className="stepCard">
                  <h3>{t('about37')}</h3>
                  <p>{t('about38')}</p>
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
                  <h3>{t('about39')}</h3>
                  <p>{t('about40')}</p>
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
                  <h3>{t('about41')}</h3>
                  <p>{t('about42')}</p>
                </div>
                <div className="images">
                  <img src={academy5} alt="IT-ACADEMY" />
                  <img src={academy6} alt="IT-ACADEMY" />
                </div>
                <p className="sub-title">
                  {t('about43')}
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
                  <h3>{t('about44')}</h3>
                  <p>{t('about45')}</p>
                  <p>{t('about47')}</p>
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
