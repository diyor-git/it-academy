import '../../CreateCourses/CreateTheory/CreateTheory.scss'
import './ViewTheory.scss'
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {renderSelectedChapter, setSelectedChapter} from "../../../../redux/reducers/coursesReducer";
import {getSelectedChapterSelector} from "../../../../redux/selectors/coursesSelectors";
import {EDITOR_JS_TOOLS} from '../../../../redux/selectors/constants';
import EditorJs from 'react-editor-js';
import clue from '../../../../assets/image/clue.png'
import sure from '../../../../assets/image/sure.png'
import {isSidebar} from "../../../../redux/reducers/authorizationReducer";
import {
    clearViewTheory,
    getTheoryChapterDetail,
    getTheoryDetail,
    getTheoryIntroDetail,
    getTheoryLabDetail,
    patchTheoryChapterDetail,
    patchTheoryIntroDetail,
    patchTheoryLabDetail,
    setMenuItem,
    setPassedContent,
    setPassedLab,
    setPassedLabTrial
} from '../../../../redux/reducers/viewCourseReducer';
import hourglass from '../../../../assets/icons/hourglass.svg'
import {getInitialMenuItemSelector, getViewTheoryDetailSelector} from "../../../../redux/selectors/viewCourseSelectors";
import {Modal} from 'antd';
import {useTranslation} from 'react-i18next';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useMediaQuery} from 'react-responsive'

const ViewTheory = React.memo(() => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let params: any = useParams()
    let navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isClueModalVisible, setIsClueModalVisible] = useState(false);
    const [isSureModalVisible, setIsSureModalVisible] = useState(false);
    const [repositoryLink, setRepositoryLink] = useState(null);
    let theoryDetail = useAppSelector(state => getViewTheoryDetailSelector(state))
    let selectedChapters = useAppSelector(state => getSelectedChapterSelector(state))
    let initialMenuItem: any = useAppSelector(state => getInitialMenuItemSelector(state))
    const isTablet = useMediaQuery({query: '(max-width: 1199px)'})
    let done: any = {
        id: selectedChapters.id,
        done: true,
    }
    let submitted: any = {
        id: selectedChapters.id,
        submitted: true,
        github: repositoryLink || undefined
    }
    const instanceRef: any = useRef(null)
    const instanceLabRef: any = useRef(null)
    const {register, handleSubmit, control, formState: {errors}} = useForm<any>();
    const onSubmit: SubmitHandler<any> = data => {
    } //do not delete
    let nextChapter = () => {
        dispatch(getTheoryDetail(params.id))
        dispatch(setMenuItem(initialMenuItem + 1))
        dispatch(getTheoryChapterDetail(theoryDetail.chapters_and_labs[initialMenuItem].id)).then((data) => {
            dispatch(setSelectedChapter(data.payload))
            dispatch(renderSelectedChapter(true))
        })
    }
    let nextLab = () => {
        dispatch(getTheoryDetail(params.id))
        dispatch(setMenuItem(initialMenuItem + 1))
        dispatch(getTheoryLabDetail(theoryDetail.chapters_and_labs[initialMenuItem].id)).then((data: any) => {
            !data.payload.submitted && showClueModal()
            dispatch(setSelectedChapter(data.payload))
        })
    }

    //A function that saves your progress and requests the next content in order
    let checkChapter = () => {
        //If the next chapters theory
        if (theoryDetail.chapters_and_labs[initialMenuItem] && theoryDetail.chapters_and_labs[initialMenuItem].theory_chapter) {
            //And now you are on the intro
            if (selectedChapters.theory_intro) {
                //Save intro and request next theory
                dispatch(patchTheoryIntroDetail(done)).then(() => {
                    nextChapter()
                })
            }
            //If you are now in the laboratory
            else if (selectedChapters.theory_lab) {
                //Then save the lab and request the next theory
                showSureModal()
                // dispatch(patchTheoryLabDetail(submitted)).then(() => {
                //     showModal()
                //     nextChapter()
                // })
            }
            //If you're on theory
            else {
                //Then save the theory and request the next theory
                dispatch(patchTheoryChapterDetail(done)).then(() => {
                    nextChapter()
                })
            }
        }

        //If the next chapter is lab
        else if (theoryDetail.chapters_and_labs[initialMenuItem] && theoryDetail.chapters_and_labs[initialMenuItem].theory_lab) {
            //And you are now at the lab and she is not being tested
            if (selectedChapters.theory_lab && !selectedChapters.submitted) {
                //Then send that laboratory to which you are now
                dispatch(patchTheoryLabDetail(submitted)).then((data: any) => {
                    showModal()
                    //But if the laboratory is sent for verification but has not yet been tested, then return the user to the list of lessons
                    if (data.payload.submitted && data.payload.is_trial && !data.payload.done) {
                        dispatch(setPassedLabTrial(true))
                        navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
                    }
                    if (data.payload.submitted && !data.payload.is_trial && !data.payload.done) {
                        dispatch(setPassedLab(true))
                        navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
                    }
                })
            }
            //And now you are on the intro
            if (selectedChapters.theory_intro) {
                //Save intro and request next lab
                dispatch(patchTheoryIntroDetail(done)).then(() => {
                    nextLab()
                })
            }
            //If the lab is already fully verified
            else if (selectedChapters.theory_lab && selectedChapters.submitted && selectedChapters.done) {
                //Then ask for the next lab
                nextLab()
            }
            //If you're on theory now
            else if (selectedChapters.theory_chapter) {
                //Then save the theory and request a laboratory
                dispatch(patchTheoryChapterDetail(done)).then((data: any) => {
                    nextLab()
                })
            }
        } else {
            //If you are now on theory and this last chapter
            if (selectedChapters.theory_chapter) {
                //Then save this theory and send the user to the list of lessons
                dispatch(patchTheoryChapterDetail(done)).then(() => {
                    dispatch(setPassedContent(true))
                    navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
                })
            }
            //If you are in the lab and this is the final chapter
            if (selectedChapters.theory_lab) {
                //Save this lab and send the user to the lesson list
                showSureModal()
                // dispatch(patchTheoryLabDetail(submitted)).then(() => {
                //     dispatch(setPassedContent(true))
                //     history.push(`/dashboard/lesson/${theoryDetail.lesson}`)
                // })
            }
        }
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showClueModal = () => {
        setIsClueModalVisible(true);
    };
    const handleClueOk = () => {
        setIsClueModalVisible(false);
    };
    const handleClueCancel = () => {
        setIsClueModalVisible(false);
    };
    const showSureModal = () => {
        setIsSureModalVisible(true);
    };
    const handleSureOk = () => {
        setIsSureModalVisible(false);
        if (theoryDetail.chapters_and_labs[initialMenuItem] && theoryDetail.chapters_and_labs[initialMenuItem].theory_chapter) {
            if (selectedChapters.theory_lab) {
                if (!selectedChapters.theory_lab.embed && !repositoryLink) {
                    return null
                } else {
                    dispatch(patchTheoryLabDetail(submitted)).then(() => {
                        showModal()
                        nextChapter()
                    })
                }
            }
        }
        if (selectedChapters.theory_lab) {
            if (!selectedChapters.theory_lab.embed && !repositoryLink) {
                console.log('TExt3')
                return null
            } else {
                dispatch(patchTheoryLabDetail(submitted)).then(() => {
                    dispatch(setPassedContent(true))
                    navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
                })
            }
        }
    };
    const handleSureCancel = () => {
        setIsSureModalVisible(false);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        if (selectedChapters.is_end) {
            dispatch(patchTheoryLabDetail(submitted)).then(() => {
                dispatch(setPassedContent(true))
                navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
            })
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        if (selectedChapters.is_end) {
            dispatch(patchTheoryLabDetail(submitted)).then(() => {
                dispatch(setPassedContent(true))
                navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
            })
        }
    };
    let handleClear = () => {
        instanceRef.current.clear()
    }
    let handleRender = () => {
        (selectedChapters.theory_chapter || selectedChapters.theory_intro) &&
        instanceRef.current.isReady.then(() => {
            instanceRef.current.render(selectedChapters.theory_chapter ? selectedChapters.theory_chapter.text : selectedChapters.theory_intro.text)
        })
        selectedChapters.theory_lab &&
        instanceLabRef.current.isReady.then(() => {
            instanceLabRef.current.render(selectedChapters.theory_lab.text)
        })
    }

    useEffect(() => {
        dispatch(getTheoryDetail(params.id)).then((data: any) => {
            dispatch(getTheoryIntroDetail(data.payload.intro.id))
            if (!data.payload.intro) {
                dispatch(setSelectedChapter({type: 'Theory Intro'}))
            } else {
                dispatch(setSelectedChapter(data.payload.intro))
            }
        })
    }, [])

    useEffect(() => {
        !isTablet ? dispatch(isSidebar('viewTheorySidebar')) : dispatch(isSidebar('closeSidebar'))
    }, [isTablet])

    useEffect(() => {
        if (selectedChapters.submitted && selectedChapters.is_trial && !selectedChapters.done) {
            dispatch(setPassedLabTrial(true))
            navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
        }
        if (selectedChapters.submitted && !selectedChapters.is_trial && !selectedChapters.done) {
            dispatch(setPassedLab(true))
            navigate(`/dashboard/lesson/${theoryDetail.lesson}`)
        }
        // Don't render when the selected chapter has embed. Otherwise, render always
        if (selectedChapters.theory_lab && selectedChapters.theory_lab.embed) {
            return undefined
        } else {
            handleRender()
        }
        if (selectedChapters.clear) {
            handleClear()
        }
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
            dispatch(clearViewTheory())
            dispatch(setMenuItem(0))
        }
    }, [])

    // if (!selectedChapters.id) {
    //     return <Preloader/>
    // }
    return (
        <div className='viewTheory'>
            {selectedChapters.theory_intro &&
            <div className='intro'>
                <img src={selectedChapters.theory_intro.image} alt="Banner"/>
                <h2>{selectedChapters.theory_intro.title}</h2>
            </div>
            }
            {selectedChapters.theory_chapter &&
            <h2 className='title'>{selectedChapters.theory_chapter.title}</h2>}
            {/*See editorjs.io and www.npmjs.com/package/react-editor-js for details*/}
            <div
                className={(selectedChapters.theory_intro || selectedChapters.theory_chapter) ? 'editor' : 'hideEditor'}>
                <EditorJs
                    holder='theoryText'
                    readOnly={true}
                    tools={EDITOR_JS_TOOLS}
                    data={(selectedChapters.theory_chapter && selectedChapters.theory_chapter.text) || (selectedChapters.theory_intro && selectedChapters.theory_intro.text)}
                    instanceRef={(instance) => (instanceRef.current = instance)
                    }>
                    <div id='theoryText'/>
                </EditorJs>
            </div>
            <div className="answered">
                {(selectedChapters.minimum_points && selectedChapters.theory_lab) &&
                <h2>{t("ViewCourse:minimum")} {selectedChapters.minimum_points} {t("ViewCourse:points")}</h2>}
                {(!selectedChapters.minimum_points && selectedChapters.theory_lab) &&
                <h2>{t("ViewCourse:attempt")}</h2>}
                {(selectedChapters.answered && selectedChapters.answered[0].points) && selectedChapters.answered.map((a: any, key: any) =>
                    <div className='answer' key={key}>
                        <h2 className={a.enough ? 'green' : 'red'}>{t("ViewCourse:numberAttempt")}{key + 1}</h2>
                        <p>{t("ViewCourse:pointsScored")}: {a.points}</p>
                        <p>{a.comment && `${t("ViewCourse:mentorsComment")}: ${a.comment}`}</p>
                        {a.github && <a href={a.github}>{t("ViewCourse:repository")}</a>}
                        {!a.enough && <p>{t("ViewCourse:notEnough")}</p>}
                    </div>)}
            </div>
            {selectedChapters.theory_lab && selectedChapters.theory_lab.embed &&
            <iframe title='lab' className='lab' allowFullScreen loading="lazy"
                    src={selectedChapters.theory_lab.embed}/>
            }
            <div
                className={selectedChapters.theory_lab && !selectedChapters.theory_lab.embed ? 'editor' : 'hideEditor'}>
                <h2 className='title'>{selectedChapters.theory_lab && selectedChapters.theory_lab.title}</h2>
                <EditorJs
                    holder='labText'
                    readOnly={true}
                    tools={EDITOR_JS_TOOLS}
                    data={selectedChapters.theory_lab && selectedChapters.theory_lab.text}
                    instanceRef={(instance) => (instanceLabRef.current = instance)
                    }>
                    <div id='labText'/>
                </EditorJs>
                <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="repositoryLink"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <input
                                placeholder={t("ViewCourse:repositoryLink")}
                                onChange={(e: any) => {
                                    field.onChange(e)
                                    setRepositoryLink(e.target.value)
                                }}
                            />
                        )}
                    />
                    {errors.repositoryLink && <span className='error'>{t("requiredField")}</span>}
                </form>
            </div>

            <Modal centered className='labModal' width={600} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <img src={hourglass} alt="Hourglass"/>
                <h2>{t("ViewCourse:labVerification")}</h2>
            </Modal>
            <Modal centered title={t("ViewCourse:sureLab")} className='clueModal' width={900}
                   visible={isSureModalVisible}
                   closable={false}
                   onOk={handleClueOk}
                   onCancel={handleClueCancel} footer={null}>
                {(selectedChapters.theory_lab && selectedChapters.theory_lab.embed) ?
                    <>
                        <h2>{t("ViewCourse:sureLab2")}</h2>
                        <h2>{t("ViewCourse:sureLab3")}</h2>
                        <img src={sure} alt="Clue"/>
                        <h2>{t("ViewCourse:sureLab4")}</h2>
                    </> :
                    <>
                        <h2>{t("ViewCourse:sureLab2")}</h2>
                        <h2>{t("ViewCourse:sureGitLab")}</h2>
                        <h2>{t("ViewCourse:sureGitLab2")}</h2>
                    </>
                }

                <div className="buttons">
                    <button className='listLesson' onClick={handleSureCancel}>{t("ViewCourse:noSure")}</button>
                    {(selectedChapters.theory_lab && !selectedChapters.theory_lab.embed && !repositoryLink) ?
                        <p className='error'>{t("ViewCourse:noRep")}</p> :
                        <button onClick={handleSureOk}>{t("ViewCourse:yesSure")}</button>}
                </div>
            </Modal>
            <Modal centered title={t("ViewCourse:howToPass")} className='clueModal' width={1500}
                   visible={isClueModalVisible}
                   onOk={handleClueOk}
                   onCancel={handleClueCancel} footer={null}>
                <img src={clue} alt="Clue"/>
            </Modal>
            <div className="footerIntro">
                <div className="line"/>
                <div className="buttons">
                    <Link to={`/dashboard/lesson/${theoryDetail.lesson}`}>
                        <button className='listLesson'>
                            {t("ViewCourse:listLesson")}
                        </button>
                    </Link>

                    <button type='submit' form="hook-form"
                            onClick={checkChapter}>
                        {!selectedChapters.is_end ? t("ViewCourse:continue") : t("ViewCourse:endTheory")}
                    </button>
                </div>
            </div>
        </div>
    )
})

export default ViewTheory