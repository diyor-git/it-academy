import './CreateLesson.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {
    clearLesson,
    createLesson,
    getCourseLessons,
    getLessonDetail,
    LessonCreateType
} from "../../../../redux/reducers/coursesReducer"
import {getCourseLessonSelector, getLessonDetailSelector} from "../../../../redux/selectors/coursesSelectors";
import {InputNumber, message, Modal, Table, Upload} from 'antd'
import lessonIcon from '../../../../assets/icons/lessonIcon.svg'
import whitePlus from '../../../../assets/icons/whitePlus.svg'
import moment from 'moment'
import 'moment/locale/ru'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";

const CreateLesson = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const dataLessons = useAppSelector(state => getCourseLessonSelector(state))
    const lessonDetail: any = useAppSelector(state => getLessonDetailSelector(state))
    const lessons = dataLessons.lessons
    const [activationDay, setActivationDay]: any = useState()
    const [test_percent, setTest_percent]: any = useState()
    const [lab_percent, setLab_percent]: any = useState()
    const [imgPreview, setImgPreview] = useState()
    const [imgPreviewFile, setImgPreviewFile] = useState()
    const [imgBanner, setImgBanner] = useState()
    const [imgBannerFile, setImgBannerFile] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    let request: any = {}
    const {register, handleSubmit, control, setValue, formState: {errors}} = useForm<LessonCreateType>();
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setValue('title', '')
        setActivationDay(null)
    };
    const onSubmit: SubmitHandler<LessonCreateType> = (data): any => {
        request = {...data}
        request.preview = imgPreviewFile
        request.banner = imgBannerFile
        request.course = params.id
        dispatch(createLesson(request)).then(() => {
            dispatch(getCourseLessons(params.id))
            setIsModalVisible(false)
            message.success('Урок успешно создан')
        })
    }
    const uploadImgPreview = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file: any) => {
            setImgPreviewFile(file.file)
            let reader: any = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                setImgPreview(reader.result)
            }
        }
    }
    const uploadImgBanner = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file: any) => {
            setImgBannerFile(file.file)
            let reader: any = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                setImgBanner(reader.result)
            }
        }
    }
    useEffect(() => {
        dispatch(getCourseLessons(params.id))
    }, [])

    useEffect(() => {
        setValue('title', lessonDetail.title)
        setValue('activation_day', lessonDetail.activation_day)
        setValue('lab_percentage', lessonDetail.lab_percentage)
        setValue('test_percentage', lessonDetail.test_percentage)
        setActivationDay(lessonDetail.activation_day)
        setLab_percent(lessonDetail.lab_percentage)
        setTest_percent(lessonDetail.test_percentage)
        console.log('change')
    }, [lessonDetail])

    useEffect((): any => {
        return () => dispatch(clearLesson())
    }, [])

    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            //width: 180,
            // @ts-ignore
            render: (title: any, data: any) => (
                <Link to={`/dashboard/createContent/${data.id}`}>
                    <div className='lessonTitle'>
                        <img src={lessonIcon} alt="Icon"/>
                        <p>{title}</p>
                    </div>
                </Link>
            ),
        },
        {
            title: 'Создан',
            // width: 200,
            dataIndex: 'created_at',
            // @ts-ignore
            render: created_at => (
                <>{moment(created_at).locale('ru').format('LLL')}</>
            ),
        },
        {
            title: 'Автор',
            dataIndex: 'author',
            //width: 180,
            // @ts-ignore
            render: author => (
                <p>{author.username}</p>
            ),
        },
        {
            title: 'Обновлен',
            dataIndex: 'updated_at',
            //width: 200,
            // @ts-ignore
            render: updated_at => (
                <>{moment(updated_at).locale('ru').format('LLL')}</>
            ),
        },
        {
            width: 60,
            dataIndex: 'id',
            render: (id: any) => <a onClick={() => {
                dispatch(getLessonDetail(id))
                setIsModalVisible(true)
            }}>
                <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M16 0C17.1046 0 18 0.895431 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2C14 0.895431 14.8954 0 16 0ZM9 0C10.1046 0 11 0.895431 11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2C7 0.895431 7.89543 0 9 0ZM4 2C4 0.895431 3.10457 0 2 0C0.895432 0 0 0.895431 0 2C0 3.10457 0.895432 4 2 4C3.10457 4 4 3.10457 4 2Z"
                          fill="black"/>
                </svg>
            </a>,
        },
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student' || permission === 'Manager') {
        navigate('/dashboard/')
    }

    return (
        <div className='createLesson'>
            <h2 className='title'>Создать урок в '{dataLessons.title_lms}'</h2>
            <button onClick={showModal} className='create'><img src={whitePlus} alt="Create lesson"/>Создать урок
            </button>
            {/*// @ts-ignore*/}
            <Table columns={columns} dataSource={lessons} scroll={{y: 440}}/>
            <Modal title="Создать урок" className='modal' width={1000} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <form className='formLesson' onSubmit={handleSubmit(onSubmit)}>
                    <div className="doubleFieldLesson">
                        <label className='lessonName'>
                            <p>Название урока:</p>
                            <input placeholder='Восхождение на Эверест' {...register("title", {required: true})} />
                            {errors.title && <span className='error'>{t("requiredField")}</span>}
                        </label>
                        <label className='activationDay'>
                            <p>Через сколько дней активируется урок?</p>
                            <Controller
                                name="activation_day"
                                control={control}
                                defaultValue={lessonDetail.activation_day}
                                rules={{required: true}}
                                render={({field}) => (
                                    <InputNumber min={0} value={activationDay} placeholder={'2'}
                                                 onChange={(e: any) => {
                                                     field.onChange(e)
                                                     setActivationDay(e)
                                                 }}/>
                                )}
                            />
                            {errors.activation_day && <span className='error'>{t("requiredField")}</span>}
                        </label>
                    </div>
                    <div className="optionsFields">
                        <label className='percentLab'>
                            <p>Общий процентаж за все лабораторные:</p>
                            <Controller
                                name="lab_percentage"
                                control={control}
                                defaultValue={lessonDetail.lab_percentage}
                                rules={{required: true}}
                                render={({field}) => (
                                    <InputNumber min={0} max={100} placeholder={'70'}
                                                 value={lab_percent}
                                                 onChange={(e: any) => {
                                                     field.onChange(e)
                                                     setValue("test_percentage", 100 - e);
                                                     setLab_percent(e)
                                                     console.log(lab_percent)
                                                 }}
                                    />

                                )}
                            />
                            {errors.lab_percentage && <span className='error'>{t("requiredField")}</span>}
                        </label>
                        <label className='percentTests'>
                            <p>Общий процентаж за все тесты:</p>
                            <Controller
                                name="test_percentage"
                                control={control}
                                defaultValue={lessonDetail.test_percentage}
                                rules={{required: true}}
                                render={({field}) => (
                                    <InputNumber min={1} max={100} disabled placeholder={'30'}
                                                 value={100 - lab_percent}
                                                 onChange={(e: any) => {
                                                     field.onChange(e)
                                                     setValue("lab_percentage", 100 - e);
                                                     setTest_percent(e)
                                                     console.log(test_percent)
                                                 }}
                                    />
                                )}
                            />
                            {errors.test_percentage && <span className='error'>{t("requiredField")}</span>}
                        </label>
                        <label className='activationDay'>
                            <p>Рекомендуемое время для прохождения:</p>
                            <Controller
                                name="recommend_end"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <InputNumber defaultValue={lessonDetail && lessonDetail.recommend_end} min={7}
                                                 placeholder={'7'}
                                                 onChange={(e: any) => {
                                                     field.onChange(e)
                                                 }}/>
                                )}
                            />
                            {errors.recommend_end && <span className='error'>{t("requiredField")}</span>}
                        </label>
                    </div>

                    <div className="doubleImg">
                        <div className="imgPreview">
                            {imgPreview ? <div className='previewImage'><img src={imgPreview} alt="Banner"/>
                                <div className='changeBanner'>
                                    <div className="content">
                                        <h3>Изменить миниатюру урока</h3>
                                        <p>Оптимальные размеры 325 x 185px</p>
                                        <Upload className='upload' {...uploadImgPreview}>
                                            <input type='button' value='Изменить' className='btn'/>
                                        </Upload>
                                        <button className='btn' onClick={() => {
                                            //@ts-ignore
                                            setImgPreview('')
                                        }}>Удалить
                                        </button>
                                    </div>
                                </div>
                            </div> : <div className='installImg'>
                                <div className="content">
                                    <h3>Установите миниатюру урока</h3>
                                    <p>Оптимальные размеры 325 x 185px</p>
                                    <Upload {...uploadImgPreview}>
                                        <input type='button' value='Изменить' className='btn'/>
                                    </Upload>
                                </div>
                            </div>}
                        </div>
                        <div className="imgBanner">
                            {imgBanner ? <div className='previewImage'><img src={imgBanner} alt="Banner"/>
                                <div className='changeBanner'>
                                    <div className="content">
                                        <h3>Изменить баннер урока</h3>
                                        <p>Оптимальные размеры 325 x 185px</p>
                                        <Upload className='upload' {...uploadImgBanner}>
                                            <input type='button' value='Изменить' className='btn'/>
                                        </Upload>
                                        <button className='btn' onClick={() => {
                                            //@ts-ignore
                                            setImgBanner('')
                                        }}>Удалить
                                        </button>
                                    </div>
                                </div>
                            </div> : <div className='installImg'>
                                <div className="content">
                                    <h3>Установите баннер урока</h3>
                                    <p>Оптимальные размеры 325 x 185px</p>
                                    <Upload {...uploadImgBanner}>
                                        <input type='button' value='Изменить' className='btn'/>
                                    </Upload>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <textarea placeholder='Описание урока' className='description' {...register("description")}/>
                    <label className='active'> <input type="checkbox"  {...register("active")}/>
                        <p>Сделать урок активным? Если урок активен, он будет отобржаться у учеников которые купили
                            курс</p>
                    </label>
                    <button className='btnSubmit' type='submit'>Отправить</button>
                </form>
            </Modal>
        </div>
    )
}
export default CreateLesson