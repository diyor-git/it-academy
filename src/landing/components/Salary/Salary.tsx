import './Salary.scss';
import rectangle from '../../../assets/image/rectangle.png';
import React from 'react';
import {SalaryType} from "../../../redux/reducers/landingReducer";

type PropsType = {
    salary: [SalaryType]
    course: string
};
const Salary: React.FC<PropsType> = ({salary, course}) => {
    return (
        <section className='salary'>
            <div className="card">
                <img src={rectangle} alt=""/>
                <div className="container">
                    <div className="card-body">
                        <div className="text"><h3>Средняя зарплата <br/> {course} разработчика</h3>
                            <p><span>{salary[0].vacancies}</span>Вакансии доступно прямо сейчас</p></div>
                        <div className="price">
                            <span>{salary[0].num}</span>
                            <p>сум</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Salary;