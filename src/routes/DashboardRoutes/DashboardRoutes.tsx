import "./Dashboard.scss";
import React, {useEffect} from "react";
import MyCourses from "../../dashboard/pages/MyCourses/MyCourses";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getPermission, getToken,} from "../../redux/selectors/authorizationSelectors";
import HeaderDashboard from "../../dashboard/components/HeaderDashboard/HeaderDashboard";
import CreateCourse from "../../dashboard/pages/CreateCourses/CreateCourse/CreateCourse";
import AllCourses from "../../dashboard/pages/AllCourses/AllCourses";
import CreateLesson from "../../dashboard/pages/CreateCourses/CreateLesson/CreateLesson";
import UsersList from "../../dashboard/pages/AdminPanel/UsersList/UsersList";
import CreateContent from "../../dashboard/pages/CreateCourses/CreateContent/CreateContent";
import TheorySidebar from "../../dashboard/components/Sidebar/TheorySidebar";
import CreateTests from "../../dashboard/pages/CreateCourses/CreateTests/CreateTests";
import CreateTheory from "../../dashboard/pages/CreateCourses/CreateTheory/CreateTheory";
import TestsSidebar from "../../dashboard/components/Sidebar/TestsSidebar";
import ViewCourse from "../../dashboard/pages/ViewCourse/Course/ViewCourse";
import ViewLesson from "../../dashboard/pages/ViewCourse/Lesson/ViewLesson";
import ViewTheorySidebar from "../../dashboard/components/Sidebar/ViewTheorySidebar";
import ViewTest from "../../dashboard/pages/ViewCourse/Test/ViewTest";
import ViewTestResults from "../../dashboard/pages/ViewCourse/TestResults/ViewTestResults";
import CheckLab from "../../dashboard/pages/AdminPanel/CheckLab/CheckLab";
import Lab from "../../dashboard/pages/AdminPanel/CheckLab/Lab";
import {getUserData, isSidebar, logout,} from "../../redux/reducers/authorizationReducer";
import Settings from "../../dashboard/pages/Settings/Settings";
import Rating from "../../dashboard/pages/Rating/Rating";
import Profile from "../../dashboard/pages/Profile/Profile";
import KnowledgeBase from "../../dashboard/pages/KnowledgeBase/KnowledgeBase";
import KnowledgeBaseDetail from "../../dashboard/pages/KnowledgeBase/KnowledgeBaseDetail";
import {useMediaQuery} from "react-responsive";
import Statistics from "../../dashboard/pages/Statistics/Statistics";
import ViewTheory from "../../dashboard/pages/ViewCourse/Theory/ViewTheory";
import CourseStatistics from "../../dashboard/pages/Statistics/CourseStatistics/CourseStatistics";
import LessonStatistics from "../../dashboard/pages/Statistics/LessonStatistics/LessonStatistics";
import TestStatistics from "../../dashboard/pages/Statistics/TestStatistics/TestStatistics";
import TheoryStatistics from "../../dashboard/pages/Statistics/TheoryStatistics/TheoryStatistics";
import Mate from "../../dashboard/pages/Mate/Mate";
import UserDetail from "../../dashboard/pages/UserDetail/UserDetail";
import UserDetailCourse from "../../dashboard/pages/UserDetail/UserDetailCourse/UserDetailCourse";
import UserDetailLesson from "../../dashboard/pages/UserDetail/UserDetailLesson/UserDetailLesson";
import UserDetailTheory from "../../dashboard/pages/UserDetail/UserDetailTheory/UserDetailTheory";
import UserDetailTest from "../../dashboard/pages/UserDetail/UserDetailTest/UserDetailTest";
import {clearProfile} from "../../redux/reducers/usersReducer";
import TheoryChapterStatistics from "../../dashboard/pages/Statistics/TheoryChapterStatistics/TheoryChapterStatistics";
import TestChapterStatistics from "../../dashboard/pages/Statistics/TestChapterStatistics/TestChapterStatistics";
import LabChapterStatistics from "../../dashboard/pages/Statistics/LabChapterStatistics/LabChapterStatistics";
import NewUser from "../../dashboard/pages/NewUser/NewUser";
import CreateArticle from "../../dashboard/pages/Blog/CreateАrticle/CreateArticle";
import CreatePartners from "../../dashboard/pages/Partners/CreatePartners";
import CreatePortfolio from "../../dashboard/pages/Portfolio/CreatePortfolio";
import CreateArticleDetail from "../../dashboard/pages/Blog/CreateArticleDetail/CreateArticleDetail";
import CheckPortfolio from "../../dashboard/pages/CheckPortfolio/CheckPortfolio";
import {Helmet} from "react-helmet";

const Registration = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    let token = useAppSelector((state) => getToken(state));
    const permission = useAppSelector((state) => getPermission(state));
    const isOpenSidebar = useAppSelector(
        (state) => state.registerPage.isOpenSidebar
    );
    const isTablet = useMediaQuery({query: "(max-width: 1199px)"});

    let signOut = () => {
        // @ts-ignore
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
    };

    useEffect(() => {
        // @ts-ignore
        window.gapi.load("auth2", function () {
            // @ts-ignore
            window.gapi.auth2.init({
                // не забудьте указать ваш ключ в .env
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            });
        });
        isTablet
            ? dispatch(isSidebar("closeSidebar"))
            : dispatch(isSidebar("studentSidebar"));
        try {
            dispatch(getUserData()).then((data: any) => {
                if (data.payload === 401) {
                    dispatch(logout()).then(() => {
                        dispatch(clearProfile());
                        signOut();
                        navigate("/login");
                    });
                }
            });
        } catch (err: any) {
            if (err.response.statusCode === 401) {
                dispatch(logout()).then(() => {
                    dispatch(clearProfile());
                    navigate("/login");
                });
            }
        }

        if (!token) {
            navigate("/login");
        }
    }, [isTablet]);

    return (
        <div className={"fullDashboard"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`IT-ACADEMY LMS`}</title>
            </Helmet>
            <HeaderDashboard/>
            {/*{isOpenSidebar === 'studentSidebar' && <Sidebar/>}*/}

            <div className="container">
                {isOpenSidebar === "theorySidebar" && <TheorySidebar/>}
                {isOpenSidebar === "testsSidebar" && <TestsSidebar/>}
                {isOpenSidebar === "viewTheorySidebar" && <ViewTheorySidebar/>}
                <Routes>
                    <Route path="/" element={<Mate/>}/>
                    <Route path="myCourses" element={<MyCourses/>}/>
                    <Route path="allCourses" element={<AllCourses/>}/>
                    <Route path="rating" element={<Rating/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="knowledgeBase" element={<KnowledgeBase/>}/>
                    <Route path="knowledgeBase/:id" element={<KnowledgeBaseDetail/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="course/:id" element={<ViewCourse/>}/>
                    <Route path="lesson/:id" element={<ViewLesson/>}/>
                    <Route path="theory/:id" element={<ViewTheory/>}/>
                    <Route path="test/:id" element={<ViewTest/>}/>
                    <Route path="test/results/:id" element={<ViewTestResults/>}/>
                    <Route path="portfolio" element={<CreatePortfolio/>}/>

                    {/*The following are only available with the Admin or Mentor role*/}
                    <Route path="createCourse/" element={<CreateCourse/>}/>
                    <Route path="createLesson/:id" element={<CreateLesson/>}/>
                    <Route path="createContent/:id" element={<CreateContent/>}/>
                    <Route path="createTheory/:id" element={<CreateTheory/>}/>
                    <Route path="createTests/:id" element={<CreateTests/>}/>
                    <Route path="checkLab" element={<CheckLab/>}/>
                    <Route path="checkLab/lab/:id" element={<Lab/>}/>

                    {/* The following are only available with the Admin or Mentor or Manager role*/}
                    <Route path="users" element={<UsersList/>}/>
                    <Route path="statistics" element={<Statistics/>}/>
                    <Route path="newUser" element={<NewUser/>}/>
                    <Route path="createPartners" element={<CreatePartners/>}/>
                    <Route path="createArticle" element={<CreateArticle/>}/>
                    <Route path="checkPortfolio" element={<CheckPortfolio/>}/>
                    <Route path="createArticleDetail" element={<CreateArticleDetail/>}/>
                    <Route path="courseStatistics/:id" element={<CourseStatistics/>}/>
                    <Route path="lessonStatistics/:id" element={<LessonStatistics/>}/>
                    <Route path="testStatistics/:id" element={<TestStatistics/>}/>
                    <Route path="theoryStatistics/:id" element={<TheoryStatistics/>}/>
                    <Route path="userDetail/:id" element={<UserDetail/>}/>
                    <Route path="userDetailCourse/:id" element={<UserDetailCourse/>}/>
                    <Route path="userDetailLesson/:id" element={<UserDetailLesson/>}/>
                    <Route path="userDetailTheory/:id" element={<UserDetailTheory/>}/>
                    <Route path="userDetailTest/:id" element={<UserDetailTest/>}/>
                    <Route path="theoryChapterStatistics/:id" element={<TheoryChapterStatistics/>}/>
                    <Route path="testChapterStatistics/:id" element={<TestChapterStatistics/>}/>
                    <Route path="labChapterStatistics/:id" element={<LabChapterStatistics/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Registration;
