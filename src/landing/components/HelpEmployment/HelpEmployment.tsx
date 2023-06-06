import "./HelpEmployment.scss";
import help1 from "../../../assets/image/help1.png";
import help2 from "../../../assets/image/help2.png";
import help3 from "../../../assets/image/help3.png";
import help4 from "../../../assets/image/help4.png";


const HelpEmployment = () => {
    return (
        <section className="helpEmployment" id="job">
            <div className="container">
                <h2 className="title">
                    Как мы помогаем с <span>трудоустройством?</span>
                </h2>
                <div className="help">
                    <div className="help-item">
                        <div className="help-item-text">
                            <h3>Финальный проект</h3>
                            <p>
                                По окончании наших курсов вы выполняете большой финальный проект совместно с
                                разработчиками с параллельного направления. Тему и масштаб проекта вы выбираете сами.
                                После вы презентуете его выпускникам и менторам, чтобы получить сертификат.
                            </p>
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
                            <h3>Дополнительная презентация</h3>
                            <p>
                                Мы выбираем лучшие проекты, работаем с их авторами над улучшением презентаций, проектов,
                                а потом организовываем для них дополнительную презентацию, где они выступают уже перед
                                работодателями - нашими партнёрами.
                            </p>
                        </div>
                    </div>
                    <div className="help-item">
                        <div className="help-item-text">
                            <h3>Участвуйте, пока не получите оффер</h3>
                            <p>
                                Такого рода мероприятия не привязаны к определенному выпуску. Это означает, что вы
                                можете участвовать в презентациях финальных проектов, пока на получите свой оффер.
                            </p>
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
                            <h3>Грейд играет роль</h3>
                            <p>
                                Не маловажным является грейд на вашем сертификате. Мы определяем ваш уровень по 30
                                метрикам и потом выдаём соответствующий грейд. Наши партнёры знают об этом и потому
                                высшие грейды "А" и "В" играют роль при поступлении к ним на работу.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpEmployment;