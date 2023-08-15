import "./HelpEmployment.scss";
import help1 from "../../../assets/image/help1.png";
import help2 from "../../../assets/image/help2.png";
import help3 from "../../../assets/image/help3.png";
import help4 from "../../../assets/image/help4.png";
import {useTranslation} from "react-i18next";


const HelpEmployment = () => {
    const {t} = useTranslation()
    return (
        <section className="helpEmployment" id="job">
            <div className="container">
                <h2 className="title">
                    {t('helpWith')} <span>{t('helpWith2')}</span>
                </h2>
                <div className="help">
                    <div className="help-item">
                        <div className="help-item-text">
                            <h3>{t('help1')}</h3>
                            <p>{t('help2')}</p>
                        </div>
                        <div className="help-item-image">
                            <img src={help1} alt="Help"/>
                        </div>
                    </div>
                    <div className="help-item">
                        <div className="help-item-image">
                            <img src={help2} alt="Help"/>
                        </div>
                        <div className="help-item-text">
                            <h3>{t('help3')}</h3>
                            <p>{t('help4')}</p>
                        </div>
                    </div>
                    <div className="help-item">
                        <div className="help-item-text">
                            <h3>{t('help5')}</h3>
                            <p>{t('help6')}</p>
                        </div>
                        <div className="help-item-image">
                            <img src={help3} alt="Help"/>
                        </div>
                    </div>
                    <div className="help-item">
                        <div className="help-item-image">
                            <img src={help4} alt="Help"/>
                        </div>
                        <div className="help-item-text">
                            <h3>{t('help7')}</h3>
                            <p>{t('help8')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpEmployment;