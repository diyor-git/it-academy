import React from "react";
import "./Projects.scss";
import { StudentDetailType } from "../../../redux/reducers/usersReducer";
import {useTranslation} from "react-i18next";

type PropsType = {
  student: StudentDetailType;
};
const Projects: React.FC<PropsType> = ({ student }) => {
    const {t} = useTranslation()

  return (
    <div className="projects">
      <div className="container">
        <h3>{t('projects')}</h3>
        <div className="cards">
          {student.portfolio.map((p, key) => (
            <a rel='noreferrer nofollow noopener' target={"_blank"} href={p.url}>
              <div key={key} className="card">
                <div className="img">
                  <img src={p.photo} alt="Work" />
                </div>
                <div className="card-title">
                  <div>
                    <h4>{p.title}</h4>
                    <h6>{p.skills}</h6>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
