import React from "react";
import "./Projects.scss";
import { StudentDetailType } from "../../../redux/reducers/usersReducer";

type PropsType = {
  student: StudentDetailType;
};
const Projects: React.FC<PropsType> = ({ student }) => {
  return (
    <div className="projects">
      <div className="container">
        <h3>Проекты</h3>
        <div className="cards">
          {student.portfolio.map((p, key) => (
            <a target={"_blank"} href={p.url}>
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
