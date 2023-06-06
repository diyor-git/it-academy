import React, { useState } from "react";
import s from "./Program.module.scss";
import { Collapse } from "antd";
import gradientStar from "../../../assets/icons/gradientStar.svg";

const Program = () => {
  const [btn, setBtn] = useState(true);
  const { Panel } = Collapse;

  return (
    <div id="program" className={s.program}>
      <div className="landing-container">
        <h2>Программа</h2>
        <div className={s.accordionBtns}>
          <div className={s.back}>
            <h3
              onClick={() => {
                setBtn(true);
              }}
            >
              Backend
            </h3>
            <span className={btn == true ? s.line : ""}></span>
          </div>
          {/* <div className={s.back}>
            <h3
              onClick={() => {
                setBtn(false);
              }}
            >
              Frontend
            </h3>
            <span className={btn == true ? "" : s.line}></span>
          </div> */}
        </div>
        <div className={s.accordionDiv}>
          <div className={s.accordionText}>
            <h3>Модуль</h3>
          </div>
          <div className={btn == true ? s.accordion : s.none}>
            <Collapse accordion>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>1</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Computer Science.</h3>
                      <p>
                        Модуль, который будет сопровождать вас на протяжении
                        всего обучения начиная с Модуля 1 и до последнего урока.
                        В нём вы узнаете основы работы компьютера, глобальной
                        сети и даже ИИ.
                      </p>
                    </div>
                  </div>
                }
                key="1"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                  <ul>
                    <li>Указатели, стек, очереди, связанные списки.</li>
                    <li>Веб-программирование. TCP/IP и HTTP.</li>
                    <li>Язык программирования PHP.</li>
                    <li>Ajax и DOM.</li>
                    <li>Анализ голоса и искусственный интеллект.</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>2</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Вводимся в Python..</h3>
                      <p>
                        Introduction модуль, в котором вы узнаете где и как
                        применяется Python. А также выучите базовый синтаксис.
                      </p>
                    </div>
                  </div>
                }
                key="2"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Где применяется Python.</li>
                    <li>Основные типы данных и их методы.</li>
                    <li>Условные операторы</li>
                    <li>Арифметические и логические операторы.</li>
                    <li>Циклы for-while.</li>
                    <li>Управление версиями через git.</li>
                    <li>Команды git.</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>3</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Синтаксис языка..</h3>
                      <p>
                        На данном этапе вы научитесь создавать простые программы
                        на питоне с применением парадигмы ООП, а также узнаете
                        продвинутые темы применяемые в разработке.
                      </p>
                    </div>
                  </div>
                }
                key="3"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Функции</li>
                    <li>Генераторы</li>
                    <li>Классы</li>
                    <li>Объектно-ориентированное программирование</li>
                    <li>Декораторы</li>
                    <li>Регулярные выражения</li>
                  </ul>
                  <ul>
                    <li>Работа с файлами</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>4</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Фреймворк Django..</h3>
                      <p>
                        На этом этапе вы начнёте уже работать с библиотеками
                        и фреймворком Django, а также делать проекты для своего
                        портфолио.
                      </p>
                    </div>
                  </div>
                }
                key="4"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Подключение шаблонов</li>
                    <li>Модели</li>
                    <li>
                      Контроллеры отображения с использованием функций и классов
                    </li>
                    <li>Кастомизация классов</li>
                    <li>Django mixin и декораторы</li>
                    <li>Django под-капотом</li>
                    <li>Отладка кода</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>5</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Работа с БД.</h3>
                      <p>
                        Узнаете как работать и подключать с SQL и No-SQL базами
                        данных.
                      </p>
                    </div>
                  </div>
                }
                key="5"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Основа MongoDB</li>
                    <li>Основные команды Linux.</li>
                    <li>Запись, обновление, удаление данных MongoDB</li>
                    <li>Модификаторы MongoDB</li>
                    <li>Подключение PostgreSQL</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>6</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Работа с REST API.</h3>
                      <p>
                        В Модуле 6 вы научитесь отправлять запросы и создавать
                        связку между frontend и backend.
                      </p>
                    </div>
                  </div>
                }
                key="6"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Что такое REST API</li>
                    <li>Как создать API</li>
                    <li>
                      Отправка, отработка различных видов запросов с frontend
                    </li>
                    <li>Работа с Postman</li>
                    <li>Деплоймент проекта на сервер</li>
                  </ul>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className={btn == false ? s.accordion : s.none}>
            {/* <Collapse accordion>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>1</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Computer Science.</h3>
                      <p>
                        Модуль, который будет сопровождать вас на протяжении
                        всего обучения начиная с Модуля 1 и до последнего урока.
                        В нём вы узнаете основы работы компьютера, глобальной
                        сети и даже ИИ.
                      </p>
                    </div>
                  </div>
                }
                key="1"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>2</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Вводимся в Python..</h3>
                      <p>
                        Introduction модуль, в котором вы узнаете где и как
                        применяется Python. А также выучите базовый синтаксис.
                      </p>
                    </div>
                  </div>
                }
                key="2"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>3</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Синтаксис языка..</h3>
                      <p>
                        На данном этапе вы научитесь создавать простые программы
                        на питоне с применением парадигмы ООП, а также узнаете
                        продвинутые темы применяемые в разработке.
                      </p>
                    </div>
                  </div>
                }
                key="3"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>4</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Фреймворк Django..</h3>
                      <p>
                        На этом этапе вы начнёте уже работать с библиотеками
                        и фреймворком Django, а также делать проекты для своего
                        портфолио.
                      </p>
                    </div>
                  </div>
                }
                key="4"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>5</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Работа с БД.</h3>
                      <p>
                        Узнаете как работать и подключать с SQL и No-SQL базами
                        данных.
                      </p>
                    </div>
                  </div>
                }
                key="5"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                </div>
              </Panel>
              <Panel
                header={
                  <div className={s.accordionHeader}>
                    <h1>6</h1>
                    <div className={s.accordionHeaderText}>
                      <h3>Работа с REST API.</h3>
                      <p>
                        В Модуле 6 вы научитесь отправлять запросы и создавать
                        связку между frontend и backend.
                      </p>
                    </div>
                  </div>
                }
                key="6"
              >
                <div className={s.accordionUl}>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                  <ul>
                    <li>Язык СИ и его синтаксис.</li>
                    <li>Основные команды Linux.</li>
                    <li>Криптография.</li>
                    <li>Алгоритм сортировки.</li>
                    <li>Как работает компилятор.</li>
                    <li>Рекурсия.</li>
                  </ul>
                </div>
              </Panel>
            </Collapse> */}
          </div>
        </div>
        <div className={s.star}>
          <img src={gradientStar} alt="" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Program;
