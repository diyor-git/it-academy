
import '../RegisterField.scss'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {CodeRequestType, postToken, setLogin, setStep} from "../../../../redux/reducers/authorizationReducer";
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import info from '../../../../assets/icons/info.svg'
import {getRegisterData} from "../../../../redux/selectors/authorizationSelectors";
import {unwrapResult} from '@reduxjs/toolkit';
import nextArrow from '../../../../assets/icons/nextArrow.svg'
import prevArrow from '../../../../assets/icons/prevArrow.svg'
import {useTranslation} from 'react-i18next';
import PinInput from 'react-pin-input';

type Inputs = {
    code: number
};
const ConfirmRegister = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let registerData = useAppSelector(state => getRegisterData(state))
    let [error, setError] = useState()
    let [code, setCode] = useState()
    let onChangePin = (value:any) => {
        setCode(value)
    };
    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    const dispatchPostToken = async (request: CodeRequestType) => {
        try {
            const resultAction = await dispatch(postToken(request))
            const response: any = unwrapResult(resultAction)
            dispatch(setLogin(response))
            localStorage.setItem('Token', response.token)
            navigate('/dashboard')
        } catch (err: any) {
            setError(err)
        }
    }
    const onSubmit: SubmitHandler<Inputs> = data => {
        let request:any = {
            code: code,
            phone: registerData.phone
        }
       dispatchPostToken(request)
    }

    useEffect(() => {
        dispatch(setStep(4))
    },[])


    let pin;
    return (
        <div className='passwordRegister'>
            <div className="titleForm">
                <p>{t("Authorization:step")} 4/4</p>
                <h3>{t("Authorization:confirmAcc")}</h3>
            </div>
            <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
                <p>{t("Authorization:confirmCode")}:</p>
                <div className="code">
                    <Controller
                        name="code"
                        control={control}
                        rules={{required: true, minLength: 5}}
                        render={({field}) => (
                            <PinInput
                                length={5}
                                focus
                                // disabled
                                // secret
                                ref={p => (pin = p)}
                                type="numeric"
                                onChange={(e: any) => {
                                    field.onChange(e)
                                    onChangePin(e)
                                }}
                            />
                        )}
                    />
                </div>
                {errors.code &&
                <span className='error'>{t("Authorization:codeError")}</span>}
                <span className='error'>{error}</span>
                <div className="sms">
                    <img src={info} alt="Info"/>
                    <p>{t("Authorization:sms")} <br/> {registerData.phone}. {t("Authorization:codeTime")}</p>
                </div>
            </form>
            <div className="footerForm">
                <div className="line"/>
                <div className="buttons">
                    <button className='prev' onClick={() => {
                        dispatch(setStep(3))
                       navigate('/registration/phone')
                    }}><img src={prevArrow} alt="Prev"/> <span>{t("Authorization:prevStep")}</span>
                    </button>
                    <button type='submit' className='next' form='registerForm'> <span>{t("Authorization:completeRegistration")}</span> <img
                        src={nextArrow} alt="Next"/></button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRegister