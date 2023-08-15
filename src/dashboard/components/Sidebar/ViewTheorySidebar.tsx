import './Sidebar.scss'
import {Menu, Tooltip} from 'antd'
import {useEffect, useState} from "react"
import logo from '../../../assets/image/logoLMS.png'
import {Link, useLocation} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {renderSelectedChapter, setSelectedChapter} from "../../../redux/reducers/coursesReducer"
import {getInitialMenuItemSelector, getViewTheoryDetailSelector} from "../../../redux/selectors/viewCourseSelectors"
import Preloader from "../../../landing/components/Preloader/Preloader"
import {getTheoryChapterDetail, getTheoryLabDetail, setMenuItem} from "../../../redux/reducers/viewCourseReducer"

const TheorySidebar = () => {
    const dispatch = useAppDispatch()
    let theoryDetail: any = useAppSelector(state => getViewTheoryDetailSelector(state))
    let initialMenuItem: any = useAppSelector(state => getInitialMenuItemSelector(state))
    let location = useLocation()
    let [collapsed, setCollapsed] = useState(false)

    if (!theoryDetail?.chapters_and_labs?.[0]) {
        return <Preloader/>
    }
    return (
        <div className='viewSidebar'>
            <Menu
                defaultSelectedKeys={initialMenuItem.toString()}
                defaultOpenKeys={initialMenuItem.toString()}
                selectedKeys={initialMenuItem.toString()}
                inlineCollapsed={false}
                mode="inline"
                className='menu'
            >
                <Link to='/dashboard'>
                    <div className="logo">
                        <img src={logo} alt="Logo"/>
                    </div>

                </Link>
                <Menu.Item onClick={() => {
                    dispatch(setSelectedChapter(theoryDetail.intro))
                    dispatch(renderSelectedChapter(true))
                    dispatch(setMenuItem(0))
                }} key="0">
                    {theoryDetail.intro.theory_intro.title}
                </Menu.Item>
                {theoryDetail.id && theoryDetail.chapters_and_labs.map((c: any, key: any) =>
                    <Menu.Item onClick={() => {
                        c.theory_chapter ?
                            dispatch(getTheoryChapterDetail(c.id))
                                .then(() => {
                                    dispatch(renderSelectedChapter(true))
                                })
                            : dispatch(getTheoryLabDetail(c.id))
                        dispatch(setSelectedChapter(c))
                        dispatch(setMenuItem(key + 1))
                        dispatch(renderSelectedChapter(true))
                    }} key={key + 1} disabled={!c.available}>
                        <Tooltip title={!c.available && 'Проходите главы по порядку'}>
                            {c.theory_chapter ? c.theory_chapter.title : c.theory_lab.title}
                        </Tooltip>
                    </Menu.Item>
                )}
            </Menu>
        </div>
    )
}

export default TheorySidebar