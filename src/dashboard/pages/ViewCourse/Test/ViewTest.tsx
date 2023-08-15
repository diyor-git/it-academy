import './ViewTest.scss'
import {setSelectedChapter} from "../../../../redux/reducers/coursesReducer";
import {isSidebar} from "../../../../redux/reducers/authorizationReducer";
import {endTest, getTestCurrentChapter, getTestDetail, sendAnswer,} from "../../../../redux/reducers/viewCourseReducer";
import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {useNavigate, useParams} from 'react-router-dom';
import {EDITOR_JS_TOOLS} from '../../../../redux/selectors/constants';
import EditorJs from 'react-editor-js';
import Timer from 'react-compound-timer/build';
import timerImg from '../../../../assets/icons/timer.svg'
import {getTestDetailSelector} from "../../../../redux/selectors/viewCourseSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";
import {Modal} from 'antd';
import {getSelectedChapterSelector} from "../../../../redux/selectors/coursesSelectors";
import check from '../../../../assets/icons/circleCheck.svg'
import cross from '../../../../assets/icons/closed.svg'
import {useTranslation} from 'react-i18next';
import {useMediaQuery} from 'react-responsive'

const ViewTest = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let params: any = useParams()
    const isTablet = useMediaQuery({query: '(max-width: 1199px)'})
    let testDetail: any = useAppSelector(state => getTestDetailSelector(state))
    let selectedChapters = useAppSelector(state => getSelectedChapterSelector(state))
    const [secondsLeft, setSecondsLeft]: any = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState([])
    const [rightAnswer, setRightAnswer] = useState(null)
    const instanceRef: any = useRef(null)
    const instanceRefCorrect: any = useRef(null)
    const instanceRefNoCorrect: any = useRef(null)
    let request = {
        id: params.id,
        start: true
    }
    let requestAnswer: any = {
        id: selectedChapters && selectedChapters.id,
        answered: selectedAnswer
    }
    let nextTest = (data: any) => {
        setRightAnswer(null)
        dispatch(getTestDetail(params.id))
        dispatch(setSelectedChapter(data.payload))
        setSelectedAnswer([])
    }

    let handleRender = () => {
        selectedChapters.test_chapter &&
        instanceRef.current.isReady.then(() => {
            instanceRef.current.render(selectedChapters.test_chapter.text)
        })
        selectedChapters.test_chapter &&
        instanceRefCorrect.current.isReady.then(() => {
            instanceRefCorrect.current.render(selectedChapters.test_chapter.feedback_true)
        })
        selectedChapters.test_chapter &&
        instanceRefNoCorrect.current.isReady.then(() => {
            instanceRefNoCorrect.current.render(selectedChapters.test_chapter.feedback_false)
        })
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(getTestCurrentChapter(request)).then((data: any) => {
            nextTest(data)
            setSecondsLeft(data.payload.seconds_left)
            setIsStarted(true)
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        dispatch(getTestCurrentChapter(request)).then((data: any) => {
            nextTest(data)
            setSecondsLeft(data.payload.seconds_left)
            setIsStarted(true)
        })
    };

    let checkAvailable = () => {
        if (!testDetail.start) {
            return t("ViewCourse:startTest")
        } else if (testDetail.start && rightAnswer === null) {
            return t("ViewCourse:toAnswer")
        } else if (testDetail.start && rightAnswer !== null) {
            return t("ViewCourse:continue")
        } else if (testDetail.start && rightAnswer !== null && selectedChapters.is_end) {
            return t("ViewCourse:endTest")
        }
    }
    let checkTime = (time: any) => {
        if (time <= 0) {
            dispatch(endTest(params.id)).then(() => {
                navigate(`/dashboard/test/results/${params.id}`)
            })
        }
    }
    useEffect(() => {
        dispatch(isSidebar('closeSidebar'))
        setSelectedAnswer([])
        dispatch(getTestDetail(params.id)).then((data: any) => {
            data.payload.start && dispatch(getTestCurrentChapter(request)).then((test) => {
                dispatch(setSelectedChapter(test.payload))
                setIsStarted(true)
            })
            if (data.payload.done) {
                navigate(`/dashboard/test/results/${params.id}`)
            } else if (!data.payload.start) {
                dispatch(setSelectedChapter(data.payload.intro))
            }
        })

    }, [])

    useEffect(() => {
        handleRender()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [selectedChapters])

    useEffect((): any => {
        return () => {
            dispatch(setSelectedChapter(''))
            isTablet ? dispatch(isSidebar('closeSidebar')) : dispatch(isSidebar('studentSidebar'))
        }
    }, [])

    if (!selectedChapters.id) {
        return <Preloader/>
    }

    return (
        <div className='viewTest'>
            <div className="image">
                <img
                    src={!testDetail.start ? testDetail.intro.test_intro.image : selectedChapters.test_chapter && selectedChapters.test_chapter.image}
                    alt="Image"/>
                <h2>{!testDetail.start ? testDetail.intro.test_intro.title : selectedChapters.test_chapter && selectedChapters.test_chapter.title}</h2>
            </div>
            <div className="questionsAndTimer">
                <p>{testDetail.chapters} вопросов</p>
                <span/>
                {!isStarted && <Timer
                    initialTime={!testDetail.start ? testDetail.test.timer * 1000 : testDetail.seconds_left * 1000}
                    startImmediately={false}
                    direction="backward"
                >
                    {() => (
                        <div className='timer'>
                            <p><Timer.Minutes/>:<Timer.Seconds/></p>
                        </div>
                    )}
                </Timer>}
                {isStarted && <Timer
                    initialTime={!testDetail.start ? testDetail.test.timer * 1000 : testDetail.seconds_left * 1000}
                    startImmediately={true}
                    direction="backward"
                >

                    {({getTime}: any) => (
                        <div className='timer'>
                            {checkTime(getTime())}
                            <p><Timer.Minutes/>:<Timer.Seconds/></p>
                        </div>
                    )}
                </Timer>}
            </div>
            <div className="viewQuestion">
                <h2>{!testDetail.start ? testDetail.intro.test_intro.greetings : selectedChapters.test_chapter && selectedChapters.test_chapter.question}</h2>
                <EditorJs
                    holder='text'
                    readOnly={true}
                    tools={EDITOR_JS_TOOLS}
                    data={(selectedChapters.test_intro && selectedChapters.test_intro.text) || (selectedChapters.test_chapter && selectedChapters.test_chapter.text)}
                    instanceRef={(instance) => (instanceRef.current = instance)}
                >
                    <div id='text'/>
                </EditorJs>
                {testDetail.start &&
                <div className='options'>
                    {selectedChapters.test_chapter && selectedChapters.test_chapter.type === 0 &&
                    <div className='singleOptions'>
                        {selectedChapters.test_chapter.all_variants.map((v: any, key: any) =>
                            <div key={key} className="option">
                                <input name='single' id={key} type="radio" checked={selectedAnswer[0] === v.id}
                                       value={v.variant} onChange={(e: any) => {
                                    // @ts-ignore
                                    setSelectedAnswer([v.id])
                                }}/>
                                <label htmlFor={key}>{v.variant}</label>
                            </div>
                        )}
                    </div>
                    }
                    {selectedChapters.test_chapter && selectedChapters.test_chapter.type === 1 &&
                    <div className='multiplyOptions'>
                        {selectedChapters.test_chapter.all_variants.map((v: any, key: any) =>
                            <div key={key} className="option">
                                <input name='single' id={key} type="checkbox" checked={selectedAnswer[0] === v.id}
                                       value={v.variant} onChange={(e: any) => {
                                    //@ts-ignore
                                    selectedAnswer[key] = {variant: e.target.value, answer: e.target.checked}
                                }}/>
                                <label htmlFor={key}>{v.variant}</label>
                            </div>
                        )}
                    </div>
                    }
                </div>
                }
                <div className={rightAnswer ? 'correct' : 'hide'}>
                    <EditorJs
                        holder='feedback_true'
                        readOnly={true}
                        tools={EDITOR_JS_TOOLS}
                        data={selectedChapters.test_chapter && selectedChapters.test_chapter.feedback_true}
                        instanceRef={(instance) => (instanceRefCorrect.current = instance)}
                    >
                        <img className='feedbackImg' src={check} alt="check"/>
                        <div id='feedback_true'/>
                    </EditorJs>
                </div>
                <div className={(!rightAnswer && rightAnswer !== null) ? 'noCorrect' : 'hide'}>
                    <EditorJs
                        holder='feedback_false'
                        readOnly={true}
                        tools={EDITOR_JS_TOOLS}
                        data={selectedChapters.test_chapter && selectedChapters.test_chapter.feedback_false}
                        instanceRef={(instance) => (instanceRefNoCorrect.current = instance)}
                    >
                        <img className='feedbackImg' src={cross} alt="check"/>
                        <div id='feedback_false'/>
                    </EditorJs>
                </div>
                <div className="saveButtons">
                    <button
                        className={(selectedAnswer.length <= 0 && testDetail.start) ? 'nextTestChapter disabled' : 'nextTestChapter'}
                        type='submit' onClick={() => {
                        if (testDetail.start && (selectedAnswer.length > 0) && rightAnswer === null) {
                            dispatch(sendAnswer(requestAnswer)).then((data: any) => {
                                setRightAnswer(data.payload.right)
                            })
                        } else if (testDetail.start && (selectedAnswer.length > 0) && rightAnswer !== null) {
                            if (selectedChapters.is_end) {
                                navigate(`/dashboard/test/results/${params.id}`)
                            } else {
                                dispatch(getTestCurrentChapter(request)).then((data: any) => {
                                    nextTest(data)
                                })
                            }
                        } else if (!testDetail.start) {
                            showModal()
                        }
                    }}>{checkAvailable()}
                    </button>
                </div>
                <Modal centered className='startTestModal' width={900} visible={isModalVisible} onOk={handleOk}
                       onCancel={handleCancel} footer={null}>
                    <img src={timerImg} alt="Timer"/>
                    <div className="desc">
                        <h2>{t("ViewCourse:given")}
                            <Timer
                                initialTime={testDetail.test.timer * 1000}
                                startImmediately={false}
                            >
                                {() => (
                                    <span><Timer.Minutes/>:<Timer.Seconds/></span>
                                )}
                            </Timer>
                            {t("ViewCourse:minutes")} <br/> {t("ViewCourse:luck")}!</h2>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
export default ViewTest