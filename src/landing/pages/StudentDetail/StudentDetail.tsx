import React, {useEffect} from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Header/Header";
import Projects from "../../components/Projects/Projects";
import StudentDetailInfo from "../../components/StudentDetailInfo/StudentDetailInfo";
import "./StudentDetail.scss";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useParams} from "react-router-dom";
import {getStudentDetailSelector} from "../../../redux/selectors/usersSelectors";
import Preloader from "../../components/Preloader/Preloader";
import { getStudentDetail } from "../../../redux/reducers/usersReducer";

const StudentDetail = () => {
    const dispatch = useAppDispatch();
    const params: any = useParams();
    const studentDetail = useAppSelector((state) => getStudentDetailSelector(state));
    useEffect(()=>{
        dispatch(getStudentDetail(params.id));
    }, [])
    if (!studentDetail) return <Preloader/>;
    return (
        <div className="student-detail">
            <Header theme="black"/>
            <div>
                <StudentDetailInfo student={studentDetail}/>
                <Projects student={studentDetail}/>
                <ContactForm/>
            </div>
        </div>
    );
};

export default StudentDetail;
