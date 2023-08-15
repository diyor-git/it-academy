import './CreateContent.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {ContentType, createTests, createTheory, getLessonDetail} from "../../../../redux/reducers/coursesReducer";
import {getLessonDetailSelector} from "../../../../redux/selectors/coursesSelectors";
import {InputNumber, message, Modal, Table} from 'antd';
import moment from 'moment'
import 'moment/locale/ru'
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import whitePlus from "../../../../assets/icons/whitePlus.svg";
import theoryIcon from "../../../../assets/icons/theoryIcon.svg";
import testsIcon from "../../../../assets/icons/testsIcon.svg";
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {useTranslation} from 'react-i18next';
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";

const CreateContent = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const lessonDetail: any = useAppSelector(state => getLessonDetailSelector(state))
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [isModalTheoryVisible, setIsModalTheoryVisible] = useState(false);
    const [isModalTestsVisible, setIsModalTestsVisible] = useState(false);
    const [isControl, setControl] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    let request: any = {}
    const {register, handleSubmit, control, formState: {errors}} = useForm<ContentType>();
    const showModalTheory = () => {
        setIsModalTheoryVisible(true);
    };
    const showModalTests = () => {
        setIsModalTestsVisible(true);
    };
    const handleCancelTheory = () => {
        setIsModalTheoryVisible(false);
    };
    const handleCancelTests = () => {
        setIsModalTestsVisible(false);
    };
    const onSubmitTheory: SubmitHandler<ContentType> = (data): any => {
        request = {...data}
        request.lesson = params.id
        dispatch(createTheory(request)).then(() => {
            message.success('Теория успешно создана')
            handleCancelTheory()
            dispatch(getLessonDetail(params.id))
        })
    }
    const onSubmitTests: SubmitHandler<ContentType> = (data): any => {
        request = {...data}
        request.lesson = params.id
        request.control = isControl
        request.timer = minutes + seconds
        dispatch(createTests(request)).then(() => {
            dispatch(getLessonDetail(params.id))
            message.success('Тесты успешны созданы')
            handleCancelTests()
        })
    }
    useEffect(() => {
        dispatch(getLessonDetail(params.id))
    }, [])

    // useEffect((): any => {
    //     return () => dispatch(clearLesson())
    // }, [])

    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            //width: 180,
            render: (title: any, data: any) => (
                data.type === 'Theory' ?
                    <Link to={`/dashboard/createTheory/${data.id}`}>
                        <div className='lessonTitle'>
                            <img src={theoryIcon} alt="Icon"/>
                            <p>{title}</p>
                        </div>
                    </Link> :
                    <Link to={`/dashboard/createTests/${data.id}`}>
                        <div className='lessonTitle'>
                            <img src={testsIcon} alt="Icon"/>
                            <p>{title}</p>
                        </div>
                    </Link>
            ),
        },
        {
            title: 'Создан',
            // width: 200,
            dataIndex: 'created_at',
            render: (created_at: any) => (
                <>{moment(created_at).locale('ru').format('LLL')}</>
            ),
        },
        {
            title: 'Автор',
            dataIndex: 'author',
            //width: 180,
            render: (author: any) => (
                <p>{author.username}</p>
            ),
        },
        {
            title: 'Обновлен',
            dataIndex: 'updated_at',
            //width: 200,
            render: (updated_at: any) => (
                <>{moment(updated_at).locale('ru').format('LLL')}</>
            ),
        },
        {
            dataIndex: '',
            width: 60,
            key: 'x',
            render: () => <a>
                <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
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
        <div className='createContent'>
            <h2 className='title'>Создать контент в '{lessonDetail.title}'</h2>
            <div ref={ref} className="addMenuBtn">
                <button onClick={() => {
                    setIsComponentVisible(!isComponentVisible)
                }}
                        className='create'>
                    <img src={whitePlus} alt="Create lesson"/>Добавить
                </button>
                {isComponentVisible && <div className='addMenu'>
                    <div onClick={() => {
                        showModalTheory()
                    }}
                         className="createTheoryButton">
                        <img src={theoryIcon} alt="Icon"/>
                        <p>Теорию</p>
                    </div>
                    <div onClick={() => {
                        showModalTests()
                    }} className="createTestsButton">
                        <img src={testsIcon} alt="Icon"/>
                        <p>Тесты</p>
                    </div>
                </div>}
            </div>
            {/*// @ts-ignore*/}
            <Table columns={columns} dataSource={lessonDetail.theories_and_tests}
                   scroll={{y: 440}}/>
            <Modal title="Создать теорию" className='modal' width={800} visible={isModalTheoryVisible}
                   onCancel={handleCancelTheory} footer={null}>
                <form className='formLesson' onSubmit={handleSubmit(onSubmitTheory)}>
                    <label className='lessonName'>
                        <p>Название теории:</p>
                        <input placeholder='Теоретический материал' {...register("title", {required: true})} />
                        {errors.title && <span className='error'>Поле обязательно</span>}
                        <p className='clue'>Вы можете в любой момент продолжить редактирование. Не забывайте, материал
                            будет виден студентам как только вы активируете урок и сам курс.</p>
                    </label>
                    <button className='btnSubmit' type='submit'>Продолжить</button>
                </form>
            </Modal>
            <Modal title="Создать тесты" className='modal' width={800} visible={isModalTestsVisible}
                   onCancel={handleCancelTests} footer={null}>
                <form className='formTests' onSubmit={handleSubmit(onSubmitTests)}>
                    <label className='testName'>
                        <p>Название тестов:</p>
                        <input placeholder='Тестирование' {...register("title", {required: true})} />
                        {errors.title && <span className='error'>Поле обязательно</span>}
                    </label>
                    <label className='controlLab'>
                        <span>
                            <Controller
                                name="control"
                                control={control}
                                render={({field}) => (
                                    <input type="checkbox"
                                           onChange={(e: any) => {
                                               field.onChange(e)
                                               setControl(!isControl)
                                           }}/>
                                )}
                            />
                            <p>Контроль тестов</p>
                        </span>
                        <p>Если контроль включен, то у студента будет 1 попытка, но без порога баллов.
                            Если контроль выключен, то у студента бесконечно попыток но есть порог баллов.
                        </p>
                    </label>
                    <label className='time'>
                        <p>Сколько дается времени на тест?</p>
                        <div className="timeContainer">
                            <InputNumber min={0} max={99} placeholder={'30'}
                                         onChange={(e: any) => {
                                             setMinutes(e * 60)
                                         }}/>
                            <p>:</p>
                            <InputNumber min={0} max={60} placeholder={'20'}
                                         onChange={(e: any) => {
                                             setSeconds(e)
                                         }}/>
                        </div>
                    </label>
                    {!isControl &&
                    <label className='testPercentage'>
                        <p>Минимальный процент прохождения:</p>
                        <Controller
                            name="minimum_percentage"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (

                                <InputNumber min={0} max={100} placeholder={'60'}
                                             onChange={(e: any) => {
                                                 field.onChange(e)
                                             }}/>
                            )}
                        />
                        {errors.minimum_percentage && <span className='error'>Поле обязательно</span>}
                    </label>
                    }
                    <button className='btnSubmit' type='submit'>Продолжить</button>
                </form>
            </Modal>
        </div>
    )
}
export default CreateContent