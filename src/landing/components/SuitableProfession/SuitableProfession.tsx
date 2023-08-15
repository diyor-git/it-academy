import './SuitableProfession.scss';
import profession from '../../../assets/image/profession.webp';
import arrow from '../../../assets/image/arrow.png';
import {CausesType} from "../../../redux/reducers/landingReducer";
import React from "react";

type PropsType = {
    course: string
    causes: [CausesType]
}
const SuitableProfession: React.FC<PropsType> = ({course, causes}) => {
    return (
        <section className='suitableProfession'>
            <div className="container">
                <div className="profession">
                    <div className="text">
                        <h2>Кому подойдет профессия <span>{course} <br/> разработчик</span><span
                            className='char'>?</span></h2>
                    </div>
                    <img src={profession} alt="Profession"/>
                </div>
                <div className="body-profession">
                    {causes.map((cause, key: number) =>
                        <div key={key} className="item">
                            <img src={arrow} alt="arrow"/>
                            <p>{cause.text}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SuitableProfession;