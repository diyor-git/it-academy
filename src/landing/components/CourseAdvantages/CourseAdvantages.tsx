import React from "react";
import "./CourseAdvantages.scss";
import advantagesCourseImg from "../../../assets/image/advantagesCourseImg.png";
import {RisesType} from "../../../redux/reducers/landingReducer";

type PropsType = {
    rises: [RisesType]
}
const CourseAdvantages: React.FC<PropsType> = ({rises}) => {
    return (
        <div className="course-advantages">
            <div className="container">
                <h2>Куда расти и какие <span>плюсы?</span></h2>
                <div className="cards">
                    {rises.map((r, key: number) =>
                        <div key={key} className="card">
                            <div className="text">
                                <p>{r.title}</p>
                            </div>
                            <div className="photo">
                                <img src={r.photo} alt=""/>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    );
};

export default CourseAdvantages;
