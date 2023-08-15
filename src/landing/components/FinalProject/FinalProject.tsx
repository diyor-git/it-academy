import React from "react";
import ReviewsStudents from "../ReviewsStudents/ReviewsStudents";
import "./FinalProject.scss";
import certificate from "../../../assets/image/certificate.png";
import StudentsWork from "../StudentsWork/StudentsWork";
const FinalProject = () => {
  return (
      <div className="final-project">
        <div className="container">
          <div>
            <h2>Дипломный проект</h2>
            <p>
              По окончании наших курсов вы выполняете Финальный проект, который отражает всё, чему вы
              научились за время обучения. Какой будет масштаб, тема и прочее - вы выбираете сами. Он - ваша
              возможность получить свою первую работу. Единственное обязательное условие: вы всё делаете
              самостоятельно и со студентом с параллельного направления.
            </p>
          </div>
          <img src={certificate} alt="Certificate"/>
          <p>
            После, мы собираем всех студентов-выпускников, менторов, администрацию, и вы презентуете свою
            работу. Это делается для того, чтобы развивать в вас софт-скиллс: навык презентации проектов,
            коммуникации, что очень важно на собеседованиях и работе.
          </p>
          <StudentsWork works={3} filters={false}/>
        </div>
      </div>
  );
};

export default FinalProject;
