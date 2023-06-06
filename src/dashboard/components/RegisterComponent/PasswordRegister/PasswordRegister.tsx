import '../RegisterField.scss'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {setRegisterData, setStep} from "../../../../redux/reducers/authorizationReducer";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {getRegisterData} from "../../../../redux/selectors/authorizationSelectors";
import nextArrow from '../../../../assets/icons/nextArrow.svg'
import prevArrow from '../../../../assets/icons/prevArrow.svg'
import {Input} from 'antd';
import {useTranslation} from 'react-i18next';

type Inputs = {
    username: string
    password1: string
    password2: string
    passwords: string
}

const PasswordRegister = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let navigate = useNavigate()
    let registerData = useAppSelector(state => getRegisterData(state))
    let [password, setPassword] = useState(registerData.password1 || null)
    let [repeatPassword, setRepeatPassword] = useState(registerData.password2 || null)
    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        if (password === repeatPassword) {
            dispatch(setRegisterData(data))
            navigate('/registration/phone')
        }
    }

    useEffect(() => {
        dispatch(setStep(2))
    }, [])


    return (
        <div className='passwordRegister'>
            <div className="titleForm">
                <p>{t("Authorization:step")} 2/4</p>
                <h3>{t("Authorization:loginAndPassword")}</h3>
            </div>
            <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
                <p>{t("Authorization:login")}:</p>
                <input placeholder='Логин' type='text' {...register("username", {required: true})}
                       defaultValue={registerData.username}/>
                {errors.username && <span className='error'>{t("requiredField")}</span>}
                <p>{t("Authorization:password")}:</p>
                <Controller
                    name="password1"
                    control={control}
                    defaultValue={registerData.password1}
                    rules={{required: true}}
                    render={({field}) => (
                        <Input.Password
                            defaultValue={registerData.password1}
                            onChange={(e: any) => {
                                field.onChange(e)
                                setPassword(e.target.value)
                            }}
                        />
                    )}
                />
                {errors.password1 && <span className='error'>{t("requiredField")}</span>}

                <p>{t("Authorization:repeatPassword")}:</p>
                <Controller
                    name="password2"
                    control={control}
                    defaultValue={registerData.password2}
                    rules={{required: true}}
                    render={({field}) => (
                        <Input.Password
                            defaultValue={registerData.password2}
                            onChange={(e: any) => {
                                field.onChange(e)
                                setRepeatPassword(e.target.value)
                            }}
                        />
                    )}
                />
                {(password != repeatPassword) && <span className='error'>{t("Authorization:passwordMismatch")}</span>}
                {errors.password2 && <span className='error'>{t("requiredField")}</span>}
            </form>
            <div className="footerForm">
                <div className="line"/>
                <div className="buttons">
                    <button className='prev' onClick={() => {
                        dispatch(setStep(1))
                        navigate('/registration/')
                    }}><img src={prevArrow} alt="Prev"/> <span>{t("Authorization:prevStep")}</span>
                    </button>
                    <button className='next' form='registerForm' type='submit'>
                        <span>{t("Authorization:nextStep")}</span> <img src={nextArrow} alt="Next"/></button>
                </div>
            </div>
        </div>
    )
}

export default PasswordRegister