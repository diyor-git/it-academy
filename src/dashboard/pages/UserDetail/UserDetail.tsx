import {Avatar, message, Modal, Select} from 'antd'
import './UserDetail.scss'
import defaultAvatar from "../../../assets/icons/defaultAva.svg";
import React, {useEffect, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getListAvailableCoursesSelector} from "../../../redux/selectors/landingSelectors";
import {useTranslation} from "react-i18next";
import {CourseListType, getAvailableCourses} from "../../../redux/reducers/landingReducer";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getPaymentHistorySelector, getUserDetailSelector} from "../../../redux/selectors/usersSelectors";
import Preloader from "../../../landing/components/Preloader/Preloader";
import moment from "moment";
import {
    deleteAccount,
    getPaymentHistory,
    getUserDetail,
    PaymentHistoryType,
    putUserDetail
} from "../../../redux/reducers/usersReducer";
import {assignCourse} from '../../../redux/reducers/coursesReducer';
import {getPermission} from "../../../redux/selectors/authorizationSelectors";

const {Option} = Select;

const UserDetail = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const navigate = useNavigate()
    const permissionUser = useAppSelector(state => getPermission(state))
    const userDetail = useAppSelector(state => getUserDetailSelector(state))
    const allCourses = useAppSelector(state => getListAvailableCoursesSelector(state))
    const payment = useAppSelector(state => getPaymentHistorySelector(state))
    const [isModalVisible, setIsModalVisible] = useState(false)
    const handleOk = () => {
        setIsModalVisible(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    };
    const showModal = () => {
        setIsModalVisible(true)
    }
    const {handleSubmit, control, formState: {errors}} = useForm<any>();
    const {handleSubmit: handleSubmit2, control: control2, formState: {errors: errors2}} = useForm();
    const [permission, setPermission] = useState(1);
    const handleChange = (value: number) => {
        setPermission(value)
    }
    let req = {
        user_id: userDetail?.username
    }
    type ChangeRoleType = {
        permission: number
        teacher_image: string
        teacher_description: string
        course: string
    }
    const onSubmit: SubmitHandler<ChangeRoleType> = (data): any => {
        let request: any = {...userDetail}
        request.permission = permission

        dispatch(putUserDetail(request)).then(() => {
            message.success('Изменения успешно сохранены');
            dispatch(getUserDetail(params.id))
        })
    }

    let deleteAcc = () => {
        dispatch(deleteAccount(params.id)).then(() => {
            message.success('Пользователь удален')
            navigate('/dashboard/users')
        })
    }
    const onSubmitAssign: SubmitHandler<any> = (data): any => {
        let request: any = {
            course: data.course,
            user: userDetail?.id
        }
        dispatch(assignCourse(request)).then(() => {
            message.success('Курс куплен/продлен');
            dispatch(getUserDetail(params.id))
            dispatch(getPaymentHistory(req))
        })
    }

    useEffect(() => {
        dispatch(getAvailableCourses())
        dispatch(getUserDetail(params.id)).then((res: any) => {
            req.user_id = res?.payload?.username
            dispatch(getPaymentHistory(req))
        })
    }, [])

    //Protection to prevent certain roles from accessing the page
    if (permissionUser === 'User' || permissionUser === 'Student') {
        navigate('/dashboard/')
    }

    if (!userDetail) {
        return <Preloader/>
    }
    return (
        <div className='userDetail'>
            <div className="nameUser">
                <Avatar draggable={false}
                        size={{xs: 70, sm: 80, md: 100, lg: 100, xl: 150, xxl: 200}}
                        src={userDetail.avatar}
                        icon={<img src={defaultAvatar} alt="Avatar"/>}/>
                <h2 className='title'>{userDetail.full_name}</h2>
                <h3>Логин: {userDetail.username}</h3>
                <h3>Был онлайн: {userDetail.end_time ? <span>{moment(userDetail.end_time).format('LLL')}</span> :
                    <span>Не заходил в аккаунт</span>}</h3>
                <h3>Всего на сайте: <span>{userDetail.full_time || 'Не заходил в аккаунт'}</span></h3>
                <h3>Дата регистрации: <span>{userDetail.created_at}</span></h3>
            </div>
            <div className="info">
                <div className="column">
                    <h3>Телефон: <span>{userDetail.phone || 'Не указан'}</span></h3>
                    <h3>Пол: <span>{userDetail.gender || 'Не указан'}</span></h3>
                    <h3>Место в рейтинге: <span>{userDetail.position}</span></h3>
                </div>
                <div className="column">
                    <h3>Почта: <span>{userDetail.email || 'Не указана'}</span></h3>
                    <h3>Дата рождения: <span>{userDetail.dob || 'Не указана'}</span></h3>
                    <h3>Баллов: <span>{userDetail.points}</span></h3>
                </div>
            </div>
            <div className="courses">
                <h2 className='title'>Купленные курсы</h2>
                {userDetail.bought_courses.length >= 1 ? userDetail.bought_courses.map((c, key: number) =>
                    <div key={key} className="tableCourses">
                        <Link to={`/dashboard/userDetailCourse/${params.id}?course=${c.id}`}>
                            <p>{c.course}</p>
                        </Link>
                        <p>{c.trial ? 'Триал' : 'Куплен'}</p>
                        <p>Закончится: <span
                            className={new Date(c.expiration_date) >= new Date() ? 'active' : 'blocked'}>{moment(c.expiration_date).format('DD.MM.YYYY')}</span>
                        </p>
                    </div>
                ) : <p>Купленных или триальных курсов нет</p>}
                <div className="addCourse">
                    <h3>Вы можете назначить курс на 30 дней, если этот курс уже куплен у пользователся, то он продлится
                        на 30 дней</h3>
                    <form id='formAssignCourse' className='formAssignCourse' onSubmit={handleSubmit2(onSubmitAssign)}>
                        <Controller
                            name="course"
                            control={control2}
                            rules={{required: true}}
                            render={({field}) =>
                                <Select
                                    {...field}
                                    showSearch
                                    placeholder="Выберите курс"
                                    optionFilterProp="children"
                                    filterOption={(input, option: any) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {allCourses.map((c: CourseListType, key: number) =>
                                        <Option key={key} value={c.id}>{c.title_lms}</Option>)}
                                </Select>
                            }
                        />
                        {errors2.course && <span className='error'>{t("requiredField")}</span>}
                        <button className='btnSubmit' form='formAssignCourse'>Назначить курс</button>
                    </form>
                </div>
            </div>
            <div className="paymentHistory">
                <h2 className='title'>История платежей</h2>
                {payment.length >= 1 ? payment.map((p: PaymentHistoryType, key: any) =>
                    <div key={key} className="tableHistory">
                        <p>{payment.length - key} {p.course_title}</p>
                        <p>Зачислено: {p.price} сум</p>
                        <p>Через <span>{p.payment_history}</span></p>
                        <p><span>{p.bought_date}</span></p>
                    </div>
                ) : <p>Нету платежей</p>}
            </div>
            {permissionUser === 'Admin' &&
            <>
                <div className="changeRole">
                    <h2 className='title'>Изменить роль</h2>
                    <form id='formUsersList' className='formUsersList' onSubmit={handleSubmit(onSubmit)}>
                        <label className='role'>
                            <p>Роль пользователя: <span>{userDetail.permission}</span></p>
                            <p>
                                {permission === 0 && 'Пользователь нечего не покупал, только зарегистрировался. Не отображается в рейтинге'}
                                {permission === 1 && 'Студент это тот кто купил хотябы один курс. Отображается в рейтинге'}
                                {permission === 2 && 'Ментор может вести несколько курсов. Проверяет лабораторные. Не отобржается в рейтинге'}
                                {permission === 4 && 'Менеджер может только смотреть статистику и платежи по конкретным пользователям. Не отобржается в рейтинге'}
                                {permission === 3 && 'Админ назначает менторов имеет доступ ко всем курсам. Не отобржается в рейтинге'}
                            </p>
                            <Select defaultValue={1} onChange={(e: any) => {
                                handleChange(e)
                            }}>
                                <Option value={0}>Пользователь</Option>
                                <Option value={1}>Студент</Option>
                                <Option value={2}>Ментор</Option>
                                <Option value={4}>Менеджер</Option>
                                <Option value={3}>Админ</Option>
                            </Select>
                        </label>
                        <button className='btnSubmit' form='formUsersList'>Сохранить изменения</button>
                    </form>
                </div>
                <div className="dangerZone">
                    <h2 className='title'>Danger Zone</h2>
                    <div className="zone">
                        <h3>Удалить пользователя</h3>
                        <p>Вы полностью удалите пользователя. Все его прохождения и историю оплаты.</p>
                        <p>Откатить изменения невозможно!</p>
                        <button onClick={showModal}>Удалить</button>
                    </div>
                </div>
            </>
            }

            <Modal centered title='Вы уверены, что хотите удалить пользователя?' className='modalCourses' width={1000}
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <h2>Изменения не откатить</h2>
                <button className='next' onClick={handleCancel}>Нет</button>
                <button className='next' onClick={deleteAcc}>Да, удалить</button>
            </Modal>
        </div>
    )
}

export default UserDetail