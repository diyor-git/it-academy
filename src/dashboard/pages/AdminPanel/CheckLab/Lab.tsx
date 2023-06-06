import './Lab.scss'
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {getLabDetail, patchLabDetail} from "../../../../redux/reducers/usersReducer";
import {getLabDetailSelector} from "../../../../redux/selectors/usersSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";
import moment from 'moment'
import 'moment/locale/ru'
import Timer from 'react-compound-timer/build';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {InputNumber} from 'antd';
import {getPermission} from '../../../../redux/selectors/authorizationSelectors';

const Lab = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const lab: any = useAppSelector(state => getLabDetailSelector(state))
    const {register, handleSubmit, control, formState: {errors}} = useForm<any>();
    const onSubmit: SubmitHandler<any> = data => {
        data.id = params.id
        data.comment || delete data.comment
        dispatch(patchLabDetail(data)).then(() => {
            navigate('/dashboard/checkLab')
        })
    }
    let checkComplete = (l: any) => {
        if (!l.points) {
            return <p>Статус: Не проверено</p>
        } else if (l.points && !l.enough) {
            return <p>Статус: Не достаточно баллов</p>
        } else if (l.points && l.enough) {
            return <p>Статус: Пройденно</p>
        }
    }
    useEffect(() => {
        dispatch(getLabDetail(params.id))
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student' || permission === 'Manager') {
        navigate('/dashboard/')
    }

    if (!lab.answered) {
        return <Preloader/>
    }
    return (
        <div className='lab'>
            <h2>{lab.course}</h2>
            <h3>{lab.lesson}{' > '}{lab.lab}</h3>
            <h3>Студент: {lab.full_name}</h3>
            {lab.minimum_points
                ? <h3>Проходной балл: {lab.minimum_points}</h3>
                : <h3>У студента 1 попытка. Вне зависимости от количества баллов он пройдет эту лабораторную.</h3>}
            <div className='line'/>
            <div className="answered">
                {lab.answered.map((l: any, key: any) =>
                    <div className='attempt'>
                        <h2>Попытка №{key + 1}</h2>
                        {checkComplete(l)}
                        {l.points && <p>Балл: {l.points}</p>}
                        {l.comment && <p>Комментарий: {l.comment}</p>}
                        <p>Решение: {l.github ? <Link rel="noreferrer"
                                                      to={{pathname: `${l.github}`}}
                                                      target='_blank'>
                            {l.github}
                        </Link> : 'Работа проверяется на вашем аккаунте Replit'}
                        </p>
                        <p>Время прохождения:
                            <Timer
                                initialTime={l.complete_time * 1000}
                                startImmediately={false}
                            >
                                {() => (
                                    <span><Timer.Hours/> часов <Timer.Minutes/> минут <Timer.Seconds/> секунд</span>
                                )}
                            </Timer></p>
                        <p>Время старта: {moment(l.start_time).locale('ru').format('LLL')}</p>
                        <p>Время завершения: {moment(l.end_time).locale('ru').format('LLL')}</p>
                        {!l.points ? <form onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                <p>Выставите балл:</p>
                                <Controller
                                    name="points"
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) => (
                                        <InputNumber min={0} max={100} placeholder={'70'}
                                                     onChange={(e: any) => {
                                                         field.onChange(e)
                                                     }}
                                        />
                                    )}
                                />
                                {errors.points && <span className='error'>{t("requiredField")}</span>}</label>
                            <textarea
                                placeholder='Комментарий (необязательно)' {...register("comment")} />
                            <button type='submit'>Отправить</button>
                        </form> : <div className='line'/>}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Lab