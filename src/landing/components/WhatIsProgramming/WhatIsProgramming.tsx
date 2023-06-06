import React from "react";
import s from "./WhatIsProgramming.module.scss";
import star from "../../../assets/icons/star.svg";
const WhatIsProgramming = () => {
  return (
    <div className={s.WhatIsProgramming}>
      <div className="landing-container">
        <div className={s.WhatIsProgrammingText}>
          <h2>
            Программирование – это не стиль жизни. Это навык позволяющий
            реализовать себя.
          </h2>
        </div>
        <div className={s.star}>
          <img src={star} alt="star" />
        </div>
        <div className={s.star2}>
          <img src={star} alt="star" />
        </div>
        <div className={s.WhatIsProgrammingCards}>
          <div className={s.WhatIsProgrammingCard}>
            <h2>Мы разработчики, а не псевдо-программисты</h2>
            <p>
              MATE Education создается и развивается программистами, учим тому,
              что знаем сами, в чем разбираемся. Программирование – наш
              единственный фокус.
            </p>
          </div>
          <div className={s.WhatIsProgrammingCard}>
            <h2>Computer Science - часть программы</h2>
            <p>
              Вы освоите важные блоки по CS, которые будут ускорять ваш рост как
              специалиста и дадут более полное понимание IT сферы.
            </p>
          </div>
          <div className={s.WhatIsProgrammingCard}>
            <h2>Учитесь на запросах бизнеса </h2>
            <p>
              Учите только то, за что будет платить работодатель или ускорит
              ваше обучение. Все остальное мимо.
            </p>
          </div>
          <div className={s.WhatIsProgrammingCard}>
            <h2>Современные инструменты </h2>
            <p>
              Мы находимся на первой линии коммерческой разработки, это
              позволяет внедрять актуальные стеки технологий и оперативно
              обновлять программу.
            </p>
          </div>
          <div className={s.WhatIsProgrammingCard}>
            <h2>Важно с кем вы учитесь</h2>
            <p>
              Важно с кем вы учитесь Высокомотивированное сообщество, которое не
              даст бросить на пол пути так же важно, как квалифицированные
              ментора и правильно составленная программа.
            </p>
          </div>
          <div className={s.WhatIsProgrammingCard}>
            <h2>Удобная платформа</h2>
            <p>
              Тренажеры в браузере, тесты, последовательное прохождение, LRS
              (Learning Record service) — сделано все для комфортного
              и эффективного обучения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsProgramming;
