import { Route, Routes } from "react-router-dom";
import Preloader from "../landing/components/Preloader/Preloader";
import { Suspense } from "react";
import Landing from "../landing/pages/Landing/Landing";
import CourseDetail from "../landing/pages/CourseDetail/CourseDetail";
import StudentDetail from "../landing/pages/StudentDetail/StudentDetail";
import StudentsPortfolio from "../landing/pages/StudentsPortfolio/StudentsPortfolio";
import Blog from "../landing/pages/Blog/Blog";
import AboutUs from "../landing/pages/AboutUs/AboutUs";
import Page404 from "../landing/pages/404Page/404Page";
import ArticleDetail from "../landing/pages/Blog/Article/ArticleDetail";
import Memes from "../landing/pages/Memes/Memes";

const LandingRoutes = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="course/:id" element={<CourseDetail />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="student/:id" element={<StudentDetail />} />
        <Route path="students/portfolio" element={<StudentsPortfolio />} />
        <Route path="blog" element={<Blog />} />
        <Route path="memes" element={<Memes />} />
        <Route path="article/:id" element={<ArticleDetail />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};

export default LandingRoutes;
