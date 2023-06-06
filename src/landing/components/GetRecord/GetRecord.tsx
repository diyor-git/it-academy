import React from "react";
import s from "./GetRecord.module.scss";
import {Link} from "react-router-dom";

const GetRecord = () => {
    return (
        <div className={s.getRecord}>
            <span/>
            <div className="landing-container">
                <div className={s.getRecordContent}>
                    <p>Хотите оценить MATE на практике?</p>
                    <Link to={'/login'}>
                        <button>ЖМИТЕ</button>
                    </Link>
                </div>
            </div>
            <span/>
        </div>
    );
};

export default GetRecord;
