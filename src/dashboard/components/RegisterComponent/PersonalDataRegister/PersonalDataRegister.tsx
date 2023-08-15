import '../RegisterField.scss'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {setRegisterData, setStep} from "../../../../redux/reducers/authorizationReducer";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {getRegisterData} from "../../../../redux/selectors/authorizationSelectors";
import "react-datepicker/dist/react-datepicker.css";
import nextArrow from '../../../../assets/icons/nextArrow.svg'
import {useTranslation} from 'react-i18next';
import NumberFormat from "react-number-format";

type Inputs = {
    first_name: string,
    last_name: string,
    dob: any
    gender: string
    email: string
};

const PersonalDataRegister = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let navigate = useNavigate()
    let registerData = useAppSelector(state => getRegisterData(state))
    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(setRegisterData(data))
        navigate('/registration/password')
        dispatch(setStep(2))
    }
    useEffect(() => {
        dispatch(setStep(1))
    }, [])

    return (
        <div className='personalDataRegister'>
            <div className="titleForm">
                <p>{t("Authorization:step")} 1/4</p>
                <h3>{t("Authorization:aboutYourself")}</h3>
            </div>
            <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
                <p>{t("name")}:</p>
                <input placeholder={t("name")} type='text' {...register("first_name", {required: true})}
                       defaultValue={registerData.first_name}/>
                {errors.first_name && <span className='error'>{t("requiredField")}</span>}
                <p>{t("lastname")}:</p>
                <input placeholder={t("lastname")} type='text' {...register("last_name", {required: true})}
                       defaultValue={registerData.last_name}/>
                {errors.last_name && <span className='error'>{t("requiredField")}</span>}
                <div className="doubleField">
                    <div className="dob">
                        <p>{t("dob")}:</p>
                        <Controller
                            name="dob"
                            control={control}
                            defaultValue={registerData.dob ? registerData.dob : null}
                            rules={{required: true}}
                            render={({field}) =>
                                <NumberFormat format="##/##/####" mask={'_'} placeholder='01/10/2021'
                                              defaultValue={registerData.dob}
                                              onChange={(e: any) => {
                                                  field.onChange(e.target.value)
                                              }}
                                />
                            }
                        />
                        {errors.dob && <span className='error'>{t("requiredField")}</span>}
                    </div>
                    <div className="gender">
                        <p>{t("gender")}:</p>
                        <select placeholder='Пол' {...register("gender", {required: true})} >
                            <option value="man">{t("man")}</option>
                            <option value="woman">{t("woman")}</option>
                        </select>
                        {errors.gender && <span className='error'>{t("requiredField")}</span>}
                    </div>
                </div>
                <p>{t("Authorization:addressEmail")}:</p>
                <input placeholder={t("email")} type='email' {...register("email", {required: true})}
                       defaultValue={registerData.email}/>
                {errors.email && <span className='error'>{t("requiredField")}</span>}
            </form>
            <div className="footerForm">
                <div className="line"/>
                <div className="buttons">
                    <button className='hidden'/>
                    <button className='next' type='submit' form='registerForm'>
                        <span>{t("Authorization:nextStep")}</span> <img
                        src={nextArrow} alt="Next"/></button>
                </div>
            </div>
        </div>
    )
}


export default PersonalDataRegister