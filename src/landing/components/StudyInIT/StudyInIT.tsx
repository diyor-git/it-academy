import React from "react";
import "./StudyInIT.scss";
import {Collapse} from "antd";
import {ProgramsType} from "../../../redux/reducers/landingReducer";
import Preloader from "../Preloader/Preloader";

type PropsType = {
    program: [ProgramsType]
}
const StudyInIT: React.FC<PropsType> = ({program}) => {
    const {Panel} = Collapse;
    if (!program) return <Preloader/>

    return (
        <div className="study-in-it">
            <div className="container">
                <h2>Обучение в IT Academy</h2>
                <div className="accordion">
                    <h4>
                        <span>Программа</span> курса
                    </h4>
                    <Collapse accordion>
                        {program.map((item, key: number) => (
                            <Panel header={item.title} key={key}>
                                <p>{item.text}</p>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

export default StudyInIT;
