import "./LearnWeb.scss";
import learn1 from "../../../assets/image/learn1.webp";
import learn2 from "../../../assets/image/learn2.webp";
import learn3 from "../../../assets/image/learn3.webp";

const LearnWeb = () => {
    return (
        <section className="learnWeb">
            <div className="container">
                <h2 className="title">Зачем учить web-разработку?</h2>
                <div className="cards">
                    <div className="card-left">
                        <div className="text">
                            <span>1</span>
                            <p>
                                Это одно из самых лёгких направлений для вхождения в IT. Если сравнивать с другими
                                направления в IT, типа геймдева, веб-разработку можно освоить быстрее. А в дальнейшем,
                                если это направление надоест, можно без проблем изучить другое, типа мобильной
                                разработки.
                            </p>
                        </div>
                        <img src={learn1} alt="Learn"/>
                    </div>
                    <div className="card-right">
                        <img src={learn2} alt="Learn"/>
                        <div className="text">
                            <span>2</span>
                            <p>
                                Быстрее заработать первые деньги. От того, что каждому бизнесу, компании нужны сайты,
                                спроса очень много как на мелкие проекты типа лендингов, так и на крупные
                                интернет-магазины. Если постараться, то начать зарабатывать можно уже на 3-ем месяце
                                обучения.
                            </p>
                        </div>
                    </div>
                    <div className="card-left">
                        <div className="text">
                            <span>3</span>
                            <p>
                                Большое комьюнити. Легче изучать что-то новое, если есть большое количество людей, кто
                                может помочь. Так как веб-разработка очень популярное направление, то и материалов для
                                обучения, курсов очень много. А ещё, много людей на IT форумах могут подсказать, как
                                развиваться, что учить, даже как решать проблемы в коде.
                            </p>
                        </div>
                        <img src={learn3} alt="Learn"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearnWeb;
