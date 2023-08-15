import '../Login/Login.scss'
import fullLogo from '../../../assets/image/landingLogo.png'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {Input, message} from 'antd';
import {getResetPhoneSelector, getToken} from "../../../redux/selectors/authorizationSelectors";
import {newPassword} from "../../../redux/reducers/authorizationReducer";
import React, {useEffect, useState} from "react";
import nextArrow from '../../../assets/icons/nextArrow.svg'
import {useTranslation} from 'react-i18next';
import PinInput from "react-pin-input";
import {Helmet} from "react-helmet";

const NewPassword = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let token = useAppSelector(state => getToken(state))
    let resetPhone = useAppSelector(state => getResetPhoneSelector(state))
    let [error, setError] = useState('')
    const {handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    let [password, setPassword] = useState(null)
    let [repeatPassword, setRepeatPassword] = useState(null)
    let [code, setCode] = useState()
    let onChangePin = (value: any) => {
        setCode(value)
    };
    type Inputs = {
        phone: number
        password1: string
        password2: string
        passwords: string
        code: number
    };
    const dispatchResetPhone = async (request: any) => {
        try {
            const resultAction = await dispatch(newPassword(request))
            message.success('Пароль сброшен. Можете войти с новым паролем.')
            navigate('/login')
        } catch (err: any) {
            setError(err)
        }
    }
    const onSubmit: SubmitHandler<Inputs> = data => {
        let request: any = {
            code: code,
            phone: resetPhone?.phone,
            password1: data.password1,
            password2: data.password2
        }
        dispatchResetPhone(request)
    }
    let pin;
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [])
    return (
        <div className='loginPage'>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`IT-ACADEMY LMS`}</title>
            </Helmet>
            <div className="container">
                <Link className='logo' to='/'>
                    <div className="logo"/>
                </Link>
                <div className="formLogin">
                    <h2>Сбросить пароль</h2>
                    <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
                        <p>{t("Authorization:password")}:</p>
                        <Controller
                            name="password1"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Input.Password
                                    onChange={(e: any) => {
                                        field.onChange(e)
                                        setPassword(e.target.value)
                                    }}
                                />
                            )}
                        />
                        {errors.password1 && <span className='error'>{t("requiredField")}</span>}

                        <p>Повторите пароль:</p>
                        <Controller
                            name="password2"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Input.Password
                                    onChange={(e: any) => {
                                        field.onChange(e)
                                        setRepeatPassword(e.target.value)
                                    }}
                                />
                            )}
                        />
                        {(password != repeatPassword) &&
                        <span className='error'>{t("Authorization:passwordMismatch")}</span>}
                        {errors.password2 && <span className='error'>{t("requiredField")}</span>}

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
                        <span className='error'>{error}</span>
                        <div className="buttons">
                            <button type='submit'>{t("Authorization:resetPass")} <img src={nextArrow} alt="Next"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPassword