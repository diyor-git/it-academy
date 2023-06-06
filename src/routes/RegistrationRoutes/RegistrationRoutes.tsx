import "./Registration.scss"
import PersonalDataRegister
    from "../../dashboard/components/RegisterComponent/PersonalDataRegister/PersonalDataRegister";
import PasswordRegister from "../../dashboard/components/RegisterComponent/PasswordRegister/PasswordRegister";
import PhoneRegister from "../../dashboard/components/RegisterComponent/PhoneRegister/PhoneRegister";
import {Route, Routes, useNavigate} from 'react-router-dom';
import ConfirmRegister from "../../dashboard/components/RegisterComponent/ConfirmRegister/ConfirmRegister";
import {useAppSelector} from "../../redux/hooks";
import {getToken} from "../../redux/selectors/authorizationSelectors";
import {useEffect} from "react";

const RegistrationRoutes = () => {
    let navigate = useNavigate()
    let token = useAppSelector(state => getToken(state))
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [])
    return (
        <div className='registration'>
            <div className="container">
                <Routes>
                    <Route path="/" element={<PersonalDataRegister/>}/>
                    <Route path="password" element={<PasswordRegister/>}/>
                    <Route path="phone" element={<PhoneRegister/>}/>
                    <Route path="confirm" element={<ConfirmRegister/>}/>
                </Routes>
            </div>
        </div>
    )
}


export default RegistrationRoutes