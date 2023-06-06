import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";
import LandingRoutes from "./routes/LandingRoutes";
import Page404 from "./landing/pages/404Page/404Page";
import Preloader from "./landing/components/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {setLoading, setToken} from "./redux/reducers/authorizationReducer";

const App = () => {
    const DashboardRoutes = React.lazy(() => import('./routes/DashboardRoutes/DashboardRoutes'));
    const RegistrationRoutes = React.lazy(() => import('./routes/RegistrationRoutes/RegistrationRoutes'));
    const ResetPassword = React.lazy(() => import('./dashboard/pages/ResetPassword/ResetPassword'));
    const NewPassword = React.lazy(() => import('./dashboard/pages/ResetPassword/NewPassword'));
    const Login = React.lazy(() => import('./dashboard/pages/Login/Login'));
    const dispatch = useAppDispatch()
    let isLoading = useAppSelector(state => state.registerPage.isLoadingApp)
    useEffect(() => {
        //@ts-ignore
        dispatch(setToken(localStorage.getItem('Token')))
        dispatch(setLoading(false))
    }, [])

    if (isLoading) {
        return <Preloader/>;
    }
    return (
        <Routes>
            <Route path="/*" element={<LandingRoutes/>}/>
            <Route path="/dashboard/*" element={<DashboardRoutes/>}/>
            <Route path="/registration/*" element={<RegistrationRoutes/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/resetPassword" element={<ResetPassword/>}/>
            <Route path="/newPassword" element={<NewPassword/>}/>
            <Route path="*" element={<Page404/>}/>
        </Routes>
    );
};

export default App;
