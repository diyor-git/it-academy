import './Login.scss'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {Input} from 'antd';
import {getToken} from "../../../redux/selectors/authorizationSelectors";
import {login, setLogin} from "../../../redux/reducers/authorizationReducer";
import React, {useEffect, useState} from "react";
import nextArrow from '../../../assets/icons/nextArrow.svg'
import {unwrapResult} from '@reduxjs/toolkit';
import {useTranslation} from 'react-i18next';
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';
import {Helmet} from "react-helmet";

const Login = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let token = useAppSelector(state => getToken(state))
    let [error, setError] = useState('')
    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    type Inputs = {
        username: string
        password: string
    };
    const dispatchLogin = async (request: Inputs) => {
        try {
            const resultAction: any = await dispatch(login(request))
            const response = unwrapResult(resultAction)
            dispatch(setLogin(response))
            // @ts-ignore
            localStorage.setItem('Token', response.token)
            navigate('/dashboard')
        } catch (err: any) {
            setError(err)
        }
    }
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatchLogin(data)
    }
    // const handleTelegramResponse = (response: any) => {
    //     dispatch(loginTelegram(response)).then((res: any) => {
    //         if (res.payload) {
    //             localStorage.setItem('Token', res.payload.access)
    //             dispatch(setToken(res.payload.access))
    //             navigate('/dashboard')
    //         } else {
    //             dispatch(logout()).then(() => {
    //                 signOut()
    //                 navigate('/login')
    //                 message.error('Не удалось войти, попробуйте позже')
    //             })
    //         }
    //     })
    // };
    // let signIn = () => {
    //     // @ts-ignore
    //     const auth2 = window.gapi.auth2.getAuthInstance()
    //     auth2.signIn().then((googleUser: any) => {
    //         // токен
    //         const id_token = googleUser.getAuthResponse().id_token
    //         let req: any = {
    //             //email: profile.getEmail(),
    //             token: id_token
    //         }
    //         dispatch(loginGoogle(req)).then((res: any) => {
    //             if (res.payload) {
    //                 localStorage.setItem('Token', res.payload.access)
    //                 dispatch(setToken(res.payload.access))
    //                 navigate('/dashboard')
    //             } else {
    //                 dispatch(logout()).then(() => {
    //                     signOut()
    //                     navigate('/login')
    //                     message.error('Не удалось войти, попробуйте позже')
    //                 })
    //             }
    //         })
    //     })
    // }
    // let signOut = () => {
    //     // @ts-ignore
    //     const auth2 = window.gapi.auth2.getAuthInstance()
    //     auth2.signOut()
    // }

    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
        // const _onInit = (auth2: any) => {
        //     //console.log('init OK', auth2)
        // }
        // const _onError = (err: any) => {
        //     //console.log('error', err)
        // }
        // // @ts-ignore
        // window.gapi.load('auth2', function () {
        //     // @ts-ignore
        //     window.gapi.auth2
        //         .init({ // не забудьте указать ваш ключ в .env
        //             client_id:
        //             process.env.REACT_APP_GOOGLE_CLIENT_ID,
        //         })
        //         .then(_onInit, _onError)
        // })
    }, [])


    return (
        <div className='loginPage'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`IT-ACADEMY LMS`}</title>
            </Helmet>
            <div className="container">
                <Link className='logo' to='/'>
                    <div className="logo"/>
                </Link>
                <div className="formLogin">
                    <h2>{t("Authorization:loginInLMS")}</h2>
                    <form id='formLogin' onSubmit={handleSubmit(onSubmit)}>
                        <p>{t("Authorization:login")}:</p>
                        <input placeholder='Имя' type='text' {...register("username", {required: true})}/>
                        {errors.username && <span className='error'>{t("requiredField")}</span>}
                        <p>{t("Authorization:password")}:</p>
                        <Controller
                            name="password"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Input.Password
                                    onChange={(e: any) => {
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />
                        {errors.password && <span className='error'>{t("requiredField")}</span>}
                        <span className='error'>{error}</span>
                        <div className="doubleField">
                            <div className="checkbox">
                                <input type="checkbox"/><p>{t("Authorization:rememberMe")}</p>
                            </div>
                            <div className="forgotPassword">
                                <Link to='/resetPassword'>
                                    <p>{t("Authorization:forgotPassword")}</p>
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="buttons">
                        <button form='formLogin' type='submit'>{t("Authorization:comeIn")} <img src={nextArrow}
                                                                                                alt="Next"/></button>
                        {/*<div className="socialBtn">*/}
                        {/*    <button className='googleBtn' onClick={signIn}><img src={googleIcon} alt="Next"/><p>Войти*/}
                        {/*        через*/}
                        {/*        Google</p>*/}
                        {/*    </button>*/}
                        {/*    <button className='telegramBtn googleBtn'>*/}
                        {/*        <img src={telegramIcon} alt="Next"/><p>Войти через*/}
                        {/*        Telegram</p>*/}
                        {/*        <TelegramLoginButton usePic={false} lang='ru' className='telegramWidget'*/}
                        {/*                             dataOnauth={handleTelegramResponse} botName="mate_education_bot"/>*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                    </div>
                    {/*                    <Link to='/registration'>
                        <h3>{t("Authorization:noAccount")}</h3>
                    </Link>*/}
                </div>
            </div>
        </div>
    )
}

export default Login