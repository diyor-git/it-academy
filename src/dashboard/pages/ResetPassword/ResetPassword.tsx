import '../Login/Login.scss'
import fullLogo from '../../../assets/image/landingLogo.png'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {getToken} from "../../../redux/selectors/authorizationSelectors";
import {resetPassword, ResetPhoneType, setResetPhone} from "../../../redux/reducers/authorizationReducer";
import React, {useEffect, useState} from "react";
import nextArrow from '../../../assets/icons/nextArrow.svg'
import {useTranslation} from 'react-i18next';
import NumberFormat from "react-number-format";

const ResetPassword = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let navigate = useNavigate()
    let token = useAppSelector(state => getToken(state))
    let [error, setError] = useState('')
    const {handleSubmit, control, formState: {errors}} = useForm<ResetPhoneType>();
    const dispatchResetPhone = async (request: ResetPhoneType) => {
        dispatch(resetPassword(request)).then((res: any) => {
            if (res.error) {
                setError(t("Authorization:errorSMS"))
            } else {
                navigate('/newPassword')
            }
        })
    }
    const onSubmit: SubmitHandler<ResetPhoneType> = data => {
        dispatch(setResetPhone(data))
        dispatchResetPhone(data)
    }
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [])
    return (
        <div className='loginPage'>
            <div className="container">
                <Link className='logo' to='/'>
                    <div className="logo"/>
                </Link>
                <div className="formLogin">
                    <h2>Сбросить пароль</h2>
                    <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
                        <p>{t("Authorization:phoneNumber")}:</p>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <NumberFormat format="+998 ## ###-##-##" mask={'_'}
                                              placeholder='90 123-45-67'
                                              onChange={(e: any) => {
                                                  field.onChange(e)
                                              }}
                                />
                            )}
                        />
                        {errors.phone && <span className='error'>{t("requiredField")}</span>}
                        <span className='error'>{error}</span>
                        <div className="buttons">
                            <button type='submit'>{t("Authorization:getCode")} <img src={nextArrow} alt="Next"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword