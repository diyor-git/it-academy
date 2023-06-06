import './CreateCourse.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import {message, Modal, Select, Upload} from 'antd'
import plus from '../../../../assets/image/plus.png'
import {CourseCreateType, createCourse, getAllCourses, getCourseDetail} from '../../../../redux/reducers/coursesReducer'
import {getAllCoursesSelector} from "../../../../redux/selectors/coursesSelectors"
import {getTeacherList} from "../../../../redux/reducers/usersReducer";
import {getTeacherListSelector} from "../../../../redux/selectors/usersSelectors";
import {useTranslation} from 'react-i18next'
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";

const CreateCourse = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const courses = useAppSelector(state => getAllCoursesSelector(state))
    const teacherList = useAppSelector(state => getTeacherListSelector(state))
    const permission = useAppSelector(state => getPermission(state))
    const [stateCard, setStateCard]: any = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imgLanding, setImgLanding] = useState()
    const [imgLandingFile, setImgLandingFile] = useState()
    const [imgLms, setImgLms] = useState()
    const [imgLmsFile, setImgLmsFile] = useState()
    let request: any = {}
    const uploadImgLms = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file: any) => {
            setImgLmsFile(file.file)
            let reader: any = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                setImgLms(reader.result)
            }
        }
    }
    const uploadImgLanding = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file: any) => {
            setImgLandingFile(file.file)
            let reader: any = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                setImgLanding(reader.result)
            }
        }
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setValue('title', '')
        setValue('duration', '')
        setValue('price', null)
        setValue('telegram', '')
    };
    const {register, handleSubmit, setValue, control, formState: {errors}} = useForm<CourseCreateType>({
        defaultValues: stateCard
    });
    const onSubmit: SubmitHandler<CourseCreateType> = (data): any => {
        request = {...data}
        request.image = imgLandingFile
        request.image_lms = imgLmsFile
        dispatch(createCourse(request)).then(() => {
            dispatch(getAllCourses())
            message.success(t("courseCreated"))
            setIsModalVisible(false)
        })
    }
    useEffect(() => {
        dispatch(getAllCourses())
        dispatch(getTeacherList())
    }, [])

    useEffect(() => {
        setValue('title', stateCard.title)
        setValue('duration', stateCard.duration)
        setValue('price', stateCard.price)
        setValue('telegram', stateCard.telegram)
        setValue('title_lms', stateCard.title_lms)
        setImgLanding(stateCard.image)
        setImgLms(stateCard.image_lms)
    }, [stateCard])

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student' || permission === 'Manager') {
        navigate('/dashboard/')
    }
    return (
        <div className='createCourse'>
            <h2 className='title'>{t("createCourse")}</h2>
            <div className="courseGrid">
                {courses ? courses.map((c: CourseCreateType, key: number) =>
                        <div key={key} className='cardLms'>
                            <Link to={`/dashboard/createLesson/${c.id}`}>
                                <div className="image">
                                    <img src={c.image_lms} alt="Banner"/>
                                </div>
                            </Link>
                            <div className="description">
                                <h3>{c.title_lms}</h3>
                                <div onClick={() => {
                                    dispatch(getCourseDetail(c.id)).then((data: any) => {
                                        setStateCard(data.payload)
                                        setImgLanding(data.payload.teacher_image)
                                        setIsModalVisible(true)
                                    })
                                }} className='status'><p>{t("status")}:
                                    {c.active && <span className='active'>{t("active")}</span>}
                                    {!c.active && <span className='notActive'>{t("notActive")}</span>}</p>
                                    <span className='status'>
                                            <svg width="18" height="4" viewBox="0 0 18 4" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M16 0C17.1046 0 18 0.895431 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2C14 0.895431 14.8954 0 16 0ZM9 0C10.1046 0 11 0.895431 11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2C7 0.895431 7.89543 0 9 0ZM4 2C4 0.895431 3.10457 0 2 0C0.895432 0 0 0.895431 0 2C0 3.10457 0.895432 4 2 4C3.10457 4 4 3.10457 4 2Z"
                                                      fill="black"/>
                                            </svg>
                                        </span>
                                </div>
                            </div>
                        </div>
                    )
                    : <div>{t("noCourses")}</div>}
                <div onClick={() => {
                    setStateCard('')
                    showModal()
                }} className='newCourse'>
                    <img src={plus} alt="Create Course"/>
                </div>
            </div>
            <Modal title={t("createCourse")} className='modal' width={1000} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <form className='formCourse' onSubmit={handleSubmit(onSubmit)}>
                    <label className='courseName'>
                        <p>{t("nameCourse")}:</p>
                        <input placeholder='Frontend'
                               {...register("title", {required: true})}/>
                        {errors.title && <span className='error'>{t("requiredField")}</span>}
                    </label>
                    <label className='titleLms'>
                        <p>{t("nameInLMS")}:</p>
                        <input
                            placeholder='Frontend разработка на JavaScript и фреймворке React' {...register("title_lms", {required: true})} />
                        {errors.title_lms && <span className='error'>{t("requiredField")}</span>}
                    </label>
                    <label className='mentors'>
                        <p>{t("mentors")}:</p>
                        <Controller
                            name="mentors"
                            control={control}
                            render={({field}) => (
                                <Select
                                    mode="multiple"
                                    defaultValue={[3]}
                                    placeholder={t("selectMentors")}
                                    onChange={(e: any) => {
                                        field.onChange(e)
                                    }}
                                    style={{width: '100%'}}
                                >
                                    {teacherList.map((item: any) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.full_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </label>
                    <label className='teacher'>
                        <p>Учитель:</p>
                        <Controller
                            name="teacher"
                            control={control}
                            defaultValue={stateCard.teacher_name}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    placeholder="Выберите учителя курса"
                                    defaultValue={4}
                                    style={{width: '100%'}}
                                    onChange={(e: any) => {
                                        field.onChange(e)
                                    }}
                                >
                                    {teacherList.map((item: any) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.full_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />

                        {errors.teacher && <span className='error'>{t("requiredField")}</span>}
                    </label>
                    <label className='duration'>
                        <p>Длительность курса:</p>
                        <input
                            placeholder='4-6 месяцев' {...register("duration", {required: true})} />
                        {errors.duration && <span className='error'>{t("requiredField")}</span>}
                    </label>
                    <label className='price'>
                        <p>Цена курса:</p>
                        <input
                            placeholder='2000000' {...register("price", {required: true})} />
                        {errors.price && <span className='error'>{t("requiredField")}</span>}
                    </label>
                    <label className='telegram'>
                        <p>Группа в Telegram:</p>
                        <input
                            placeholder='Telegram' {...register("telegram")} />
                    </label>
                    <div className="imgLms">
                        {imgLms ? <div className='previewImage'><img src={imgLms} alt="Banner"/>
                            <div className='changeBanner'>
                                <div className="content">
                                    <h3>Изменить фото курса LMS</h3>
                                    <p>Оптимальные размеры 325 x 185px</p>
                                    <Upload className='upload' {...uploadImgLms}>
                                        <input type='button' value='Изменить' className='btn'/>
                                    </Upload>
                                    <button className='btn' onClick={() => {
                                        //@ts-ignore
                                        setImgLms('')
                                    }}>Удалить
                                    </button>
                                </div>
                            </div>
                        </div> : <div className='installImg'>
                            <div className="content">
                                <h3>Установите фото курса LMS</h3>
                                <p>Оптимальные размеры 325 x 185px</p>
                                <Upload {...uploadImgLms}>
                                    <input type='button' value='Изменить' className='btn'/>
                                </Upload>
                            </div>
                        </div>}
                    </div>
                    <div className="imgLanding">
                        {imgLanding ? <div className='previewImage'><img src={imgLanding} alt="Banner"/>
                            <div className='changeBanner'>
                                <div className="content">
                                    <h3>Изменить фото курса на лендинге</h3>
                                    <p>Оптимальные размеры 360 x 400px</p>
                                    <Upload className='upload' {...uploadImgLanding}>
                                        <input type='button' value='Изменить' className='btn'/>
                                    </Upload>
                                    <button className='btn' onClick={() => {
                                        //@ts-ignore
                                        setImgLanding('')
                                    }}>Удалить
                                    </button>
                                </div>
                            </div>
                        </div> : <div className='installImg'>
                            <div className="content">
                                <h3>Установите фото курса на лендинге</h3>
                                <p>Оптимальные размеры 360 x 400px</p>
                                <Upload {...uploadImgLanding}>
                                    <input type='button' value='Изменить' className='btn'/>
                                </Upload>
                            </div>
                        </div>}
                    </div>
                    <label className='active'> <input type="checkbox"
                                                      checked={stateCard.active}  {...register("active")}/>
                        <p>Сделать курс активным? Если курс активен, он будет отобржаться на лендинге и во всех курсах
                            LMS</p>
                    </label>
                    <button className='btnSubmit' type='submit'>Отправить</button>
                </form>
            </Modal>
        </div>
    )
}
export default CreateCourse