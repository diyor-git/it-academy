import '../RegisterField.scss'
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {registration, setRegisterData, setStep} from "../../../../redux/reducers/authorizationReducer"
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import NumberFormat from 'react-number-format'
import {getRegisterData} from "../../../../redux/selectors/authorizationSelectors"
import nextArrow from '../../../../assets/icons/nextArrow.svg'
import prevArrow from '../../../../assets/icons/prevArrow.svg'
import {useTranslation} from 'react-i18next'

type Inputs = {
    phone: number
}

const PhoneRegister = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let registerData = useAppSelector(state => getRegisterData(state))
    let [error, setError]: any = useState()
    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(setRegisterData(data))
        let fullData = {...registerData}
        fullData.phone = data.phone
        dispatch(registration(fullData)).then((res: any) => {
            if (res.payload.status === 500) {
                setError(t("Authorization:errorSMS"))
            } else if (res.error) {
                if (!fullData.email || !fullData.username) {
                    setError(t("returnReg"))
                } else {
                    setError(res.payload.data.message || res.payload.data.dob || res.payload.data.detail)
                }
            } else {
                navigate('/registration/confirm')
            }
        })
    }
    useEffect(() => {
        dispatch(setStep(3))
    }, [])


    return (
        <div className='passwordRegister'>
            <div className="titleForm">
                <p>{t("Authorization:step")} 3/4</p>
                <h3>{t("Authorization:confirmAcc")}</h3>
            </div>
            <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
                <p>{t("Authorization:phoneNumber")}:</p>
                <Controller
                    name="phone"
                    control={control}
                    defaultValue={registerData.phone}
                    rules={{required: true}}
                    render={({field}) => (
                        <NumberFormat format="+998 ## ###-##-##" mask={'_'}
                                      placeholder='90 123-45-67'
                                      defaultValue={registerData.phone}
                                      onChange={(e: any) => {
                                          field.onChange(e)
                                      }}
                        />
                    )}
                />
                {errors.phone && <span className='error'>{t("requiredField")}</span>}
                {error && <span className='error'>{error}</span>}
            </form>
            <div className="footerForm">
                <div className="line"/>
                <div className="buttons">
                    <button className='prev' onClick={() => {
                        dispatch(setStep(2))
                        navigate('/registration/password')
                    }}><img src={prevArrow} alt="Prev"/> <span>{t("Authorization:prevStep")}</span>
                    </button>
                    <button type='submit' className='next' form='registerForm'>
                        <span>{t("Authorization:nextStep")}</span> <img
                        src={nextArrow} alt="Next"/></button>
                </div>
            </div>
        </div>
    )
}


export default PhoneRegister