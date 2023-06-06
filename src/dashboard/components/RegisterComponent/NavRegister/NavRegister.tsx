import './NavRegister.scss'
import logoLMS from '../../../../assets/image/logoLMS.png'
import {Steps} from 'antd';
import {useAppSelector} from "../../../../redux/hooks";
import {getRegisterStep} from "../../../../redux/selectors/authorizationSelectors";
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const {Step} = Steps;

const NavRegister = () => {
    const {t} = useTranslation()
    let steps = useAppSelector(state => getRegisterStep(state))
    return (
        <div className='navRegister'>
            <div className="logo">
                <Link to='/'>
                    <img src={logoLMS} alt="Logo"/>
                </Link>
            </div>
            <h2>{t("Authorization:letsGo")}</h2>
            <Steps current={steps} progressDot initial={1} direction="vertical">
                <Step title={t("Authorization:personalData")}/>
                <Step title={t("Authorization:password")}/>
                <Step title={t("Authorization:phoneNumber")}/>
                <Step title={t("Authorization:confirm")}/>
            </Steps>
        </div>
    )
}

export default NavRegister