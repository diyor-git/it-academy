import React, {useEffect} from "react";
import { Avatar } from "antd";
import Asror from "../../../assets/image/Asror.png";
import Asalya from "../../../assets/image/Asalya.png";
import Sherzod from "../../../assets/image/Sherzod.png";
import Serik from "../../../assets/image/Serik.png";
import gradientStar from "../../../assets/icons/gradientStar.svg";
import star from "../../../assets/icons/star.svg";
import s from "./Reviews.module.scss";
const Reviews = ({theme, stars}: any) => {


  return (
    <div id="reviews" className={s.Reviews}>
      <div className={theme === "black" ? s.ReviewsBlack : s.ReviewsWhite}>
        <div className="landing-container">
          <h2 className={theme === "black" ? '' : s.none}>Отзывы и факты</h2>
          <div className={s.grid}>
            {/* <div className={s.card}>
            <a href="https://www.youtube.com/watch?v=WRX8O79x3zg">
              <img src={preview2} alt="Mate" />
              <h4>Для кого и о чем этот курс</h4>
              <p>
                Константин, руководитель MATE Education Опыт стажировки в
                Microsoft и Google Университет Иннополис. Для кого, зачем и
                почему был создан этот курс
              </p>
            </a>
          </div> */}
            <div className={s.card}>
              <div className={s.titleCard}>
                <Avatar
                  draggable={false}
                  size={40}
                  icon={<img src={Asalya} alt="Avatar" />}
                />
                <div className={s.name}>
                  <h4>Асаля Якубова</h4>
                  <h4>Вackend разработка</h4>
                </div>
              </div>
              <p>
                Могу сказать 3 вещи, а преимущество они или нет – решать вам:
                1-ое: Вектор. Основная задача Академии – показать, куда нужно
                идти, что учить, задать вам вектор. 2-ое: Конкуренты. На
                удалёнке мотивируешься личными амбициями, ибо нет явного
                соревнования с другими студентами 3-е: Ошибки. Приходится всё
                искать самой. Нету прямого контакта с ментором 3 раза в неделю,
                так что приходится учиться искать и решать проблемы
                самостоятельно
              </p>
            </div>
            <div className={s.card}>
              <div className={s.titleCard}>
                <Avatar
                  draggable={false}
                  size={40}
                  icon={<img src={Sherzod} alt="Avatar" />}
                />
                <div className={s.name}>
                  <h4>Ходжаев Шерзод</h4>
                  <h4>Вackend разработка</h4>
                </div>
              </div>
              <p>
                Если вы хотите стать разработчиком, то MATE не для вас. Если же
                вы хотите стать настоящим специалистом, значит, Welcome. Здесь
                обучат не только базовым, практическим навыкам, дадут
                фундаментальную базу, но также дают скиллы, которые ты нужны
                будут в реальной жизни. Например, поиск информации, работа в
                команде, самостоятельное решение ошибок в коде, - это то, что
                мне нам придётся делать завтра в реальной жизни и это круто, что
                нас подготавливают даже к такому
              </p>
            </div>
            {/* <div className={s.card}>
            <div className={s.statisticsCard}>
              <h2>631</h2>
              <h3>учеников</h3>
            </div>
            <p>
              Успешные специалисты, студенты, путешественники, бизнесмены,
              школьники и дошколята
            </p>
          </div>
          <div className={s.card}>
            <div className={s.statisticsCard}>
              <h2>26</h2>
              <h3>учителей</h3>
            </div>
            <p>
              Сертифицированных, с опытом для любого уровня, разговорчивые и
              гибкие
            </p>
          </div> */}
            {/* <div className={s.card}>
            <a href="https://www.youtube.com/watch?v=dgBK_gEpXwk">
              <img src={preview3} alt="Mate" />
              <h4>"Талант - это умение работать больше других"</h4>
              <p>
                Улугбек, парень который делает себя сам. Переезд из другой
                области в Ташкент, самостоятельная жизнь, университет и обучение
                в IT. Вдохновляйтесь
              </p>
            </a>
          </div> */}
            <div className={s.card}>
              <div className={s.titleCard}>
                <Avatar
                  draggable={false}
                  size={40}
                  icon={<img src={Serik} alt="Avatar" />}
                />
                <div className={s.name}>
                  <h4>Тохтабаев Серик</h4>
                  <h4>Вackend разработка</h4>
                </div>
              </div>
              <p>
                Интересный курс. Не идеальный, но над ним постоянно работают,
                спрашивают наше мнение, и это круто. Что мне нравится, я учусь,
                когда и где мне удобно. Главное – всё делать к сроку, а то будет
                плохо… Ну и друзья) Мне очень нравится, что мы работаем вместе,
                постоянно учим друг друга – это помогает не терять настрой)
                Словом, если ты за развитие, но не любишь серость, добро
                пожаловать в «MATE»!
              </p>
            </div>
            {/* <div className={s.card}>
            <a href="https://www.youtube.com/watch?v=-2SBMc-nDPw">
              <img src={preview1} alt="Mate" />
              <h4>"Главное, не бойтесь пробовать"</h4>
              <p>
                История Абдувасикова Асрора рассказывает как проработать 3 года
                парикмахером решится перейти в IT сферу, найти сообщество
                которое тебе по души и добиться успеха. Про упорство, желание,
                про MATE
              </p>
            </a>
          </div> */}
            <div className={s.card}>
              <div className={s.titleCard}>
                <Avatar
                  draggable={false}
                  size={40}
                  icon={<img src={Asror} alt="Avatar" />}
                />
                <div className={s.name}>
                  <h4>Асрор Абдувасиков</h4>
                  <h4>Вackend разработка</h4>
                </div>
              </div>
              <p>
                Как ведутся, поддержка менторов, других студентов, открытый с
                утра и до вечера co-working, друзья, - то, что мне нравится о
                MATE больше всего. Что трудно: приходится много искать
                дополнительной информации с разных ресурсов, чтобы сделать
                практические задания. Я не думаю, что это плохо. Мы учимся сами
                находить информацию, использовать её. А любой программист
                скажет, что умение гуглить – это из одно главных навыков любого
                разработчика.
              </p>
            </div>
          </div>
          <div className={stars === "yes" ? s.star2 : s.none}>
            <img src={gradientStar} alt="star" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
