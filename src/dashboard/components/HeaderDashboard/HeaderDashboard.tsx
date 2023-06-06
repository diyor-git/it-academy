import "./HeaderDashboard.scss";
import defaultAvatar from "../../../assets/icons/defaultAva.svg";
import { Avatar, Drawer, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getLoginData,
  getPermission,
} from "../../../redux/selectors/authorizationSelectors";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import {
  clearProfile,
  getHelp,
  getNotificationsList,
  setDrawer,
  setNotificationsOpen,
} from "../../../redux/reducers/usersReducer";
import exit from "../../../assets/icons/exit.svg";
import logoLMS from "../../../assets/image/logoLMS.png";
import burgerMenu from "../../../assets/icons/burgerMenu.svg";
import {
  getDrawerSelector,
  getHelpListSelector,
} from "../../../redux/selectors/usersSelectors";
import {
  getUserData,
  logout,
} from "../../../redux/reducers/authorizationReducer";
import { useMediaQuery } from "react-responsive";
import { getViewTheoryDetailSelector } from "../../../redux/selectors/viewCourseSelectors";
import ViewTheorySidebar from "../Sidebar/ViewTheorySidebar";
import Sidebar from "../Sidebar/Sidebar";
import settingsSVG from "../../../assets/icons/settings.svg";
import portfolioSVG from "../../../assets/icons/portfolio.svg";
import Notifications from "../Notifications/Notifications";

const HeaderDashboard = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => getLoginData(state));
  const theoryDetail = useAppSelector((state) =>
    getViewTheoryDetailSelector(state)
  );
  const drawerOpen = useAppSelector((state) => getDrawerSelector(state));
  const [adminPanel, setAdminPanel] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(drawerOpen);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 1199px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 575px)" });

  const showModal = () => {
    setIsModalVisible(true);
    dispatch(getHelp());
  };
  const showDrawer = () => {
    dispatch(setNotificationsOpen(true));
    dispatch(getNotificationsList()).then(() => {
      dispatch(getUserData());
    });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showMenu = () => {
    dispatch(setDrawer(true));
  };

  const onCloseMenu = () => {
    dispatch(setDrawer(false));
    //setMobileMenu(false);
  };
  let signOut = () => {
    // @ts-ignore
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut();
  };
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  useEffect(() => {
    setMobileMenu(drawerOpen);
  }, [drawerOpen]);
  useEffect(() => {
    // @ts-ignore
    window.gapi.load("auth2", function () {
      // @ts-ignore
      window.gapi.auth2.init({
        // не забудьте указать ваш ключ в .env
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
    });
  }, []);
  let navigate = useNavigate();
  const permission = useAppSelector((state) => getPermission(state));
  const helpList = useAppSelector((state) => getHelpListSelector(state));
  (function () {
    console.log("hello");
  })();
  return (
    <div className="headerDashboard">
      <div className="topHeader">
        <div className="name">
          <NavLink to="/dashboard">
            <img className="logo" src={logoLMS} alt="Logo" />
          </NavLink>
          <NavLink to={!isTablet ? "/dashboard/profile" : "/dashboard"}>
            <div className="user">
              <Avatar
                size={30}
                icon={<img src={defaultAvatar} alt="Avatar" />}
                src={loginData.avatar}
              />
              {!isMobile && (
                <h3>{`${loginData.first_name}  ${loginData.last_name}`}</h3>
              )}
            </div>
          </NavLink>
          <div className="notifications" onClick={showDrawer}>
            {loginData.notifications > 0 && (
              <span>{loginData.notifications}</span>
            )}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 0C13.9511 0 17.169 3.13941 17.2961 7.06012L17.3 7.30112V11.8019C17.3 12.6917 17.9831 13.4218 18.8533 13.4962L19.1332 13.5094C20.2445 13.6286 20.2872 15.2401 19.2614 15.4741L19.1332 15.4954L19 15.5024H1L0.866825 15.4954C-0.288942 15.3714 -0.288942 13.6334 0.866825 13.5094L1.14668 13.4962C1.96851 13.4259 2.62352 12.7708 2.69376 11.9486L2.7 11.8019V7.30112C2.7 3.26886 5.96828 0 10 0ZM11.557 17.103C12.3277 17.103 12.8087 17.9381 12.422 18.6047C11.9211 19.4684 10.9983 20 10 20C9.00166 20 8.07886 19.4684 7.57796 18.6047C7.21064 17.9714 7.62639 17.1861 8.32964 17.1092L8.443 17.103H11.557ZM4.70442 7.0826C4.81899 4.25617 7.14611 2 10 2C12.9271 2 15.3 4.37335 15.3 7.30112V11.8019L15.3051 11.9984L15.3276 12.2563C15.3797 12.6817 15.504 13.0848 15.6878 13.453L15.714 13.502H4.285L4.3122 13.453L4.41182 13.2362C4.59742 12.7951 4.7 12.3105 4.7 11.8019V7.30112L4.70442 7.0826Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="lang">
            <button
              className={i18n.language === "ru" ? "active" : ""}
              onClick={() => changeLanguage("ru")}
            >
              RU
            </button>
            <button
              className={i18n.language === "uz" ? "active" : ""}
              onClick={() => changeLanguage("uz")}
            >
              UZ
            </button>
          </div>
        </div>
        <div className="buttons">
          {!adminPanel ? (
            <>
              {(permission === "Admin" ||
                permission === "Mentor" ||
                permission === "Manager") && (
                <a>
                  <span
                    onClick={() => {
                      setAdminPanel(true);
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12L5 4"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 20L19 17"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 20L5 16"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 13L19 4"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 7L12 4"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 20L12 11"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="5"
                        cy="14"
                        r="2"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="9"
                        r="2"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="19"
                        cy="15"
                        r="2"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p>Админ.панель</p>
                  </span>
                </a>
              )}
            </>
          ) : (
            <>
              {(permission === "Admin" ||
                permission === "Mentor" ||
                permission === "Manager") && (
                <a>
                  <span
                    onClick={() => {
                      setAdminPanel(false);
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12L5 4"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 20L19 17"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 20L5 16"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19 13L19 4"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 7L12 4"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 20L12 11"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="5"
                        cy="14"
                        r="2"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="9"
                        r="2"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="19"
                        cy="15"
                        r="2"
                        stroke="#BEBEBE"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p>Уч.панель</p>
                  </span>
                </a>
              )}
            </>
          )}
          {(permission === "Student" || permission === "Пользователь") && (
            <NavLink to="/dashboard/settings">
              <span>
                <img src={settingsSVG} alt="Settings" id="settingsSvg" />
                <p>{t("Sidebar:settings")}</p>
              </span>
            </NavLink>
          )}
          <button className="help" onClick={showModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9C1 4.58172 4.58172 1 9 1V1C13.4183 1 17 4.58172 17 9V14.0909C17 14.9375 17 15.3608 16.8739 15.6989C16.6712 16.2425 16.2425 16.6712 15.6989 16.8739C15.3608 17 14.9375 17 14.0909 17H9C4.58172 17 1 13.4183 1 9V9Z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M9 8L15 8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12H15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>{t("Sidebar:help")}</p>
          </button>
          <button
            className="exit"
            onClick={() => {
              dispatch(logout());
              dispatch(clearProfile());
              signOut();
              navigate("/login");
            }}
          >
            <img src={exit} alt="Exit" />
            <p>{t("Sidebar:logOut")}</p>
          </button>
        </div>
        {isTablet && (
          <div className="mobileMenu">
            <img onClick={showMenu} src={burgerMenu} alt="Menu" />
          </div>
        )}
      </div>
      <div className="bottomHeader">
        {!adminPanel ? (
          <>
            <NavLink to="/dashboard/myCourses/">
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="6.00016"
                    height="6"
                    rx="1"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="1"
                    y="11"
                    width="6.00016"
                    height="6"
                    rx="1"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="11"
                    y="11"
                    width="6.00016"
                    height="6"
                    rx="1"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="11"
                    y="1"
                    width="6.00016"
                    height="6"
                    rx="1"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-linejoin="round"
                  />
                </svg>

                <p>{t("myCourses")}</p>
              </span>
            </NavLink>
            <NavLink to="/dashboard/allCourses">
              <span>
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H16.9722"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1 6.71387H12.4087"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1 12.4287H7.84524"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p>{t("allCourses")}</p>
              </span>
            </NavLink>
            <NavLink to="/dashboard/profile">
              <span>
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7766 16.4794C15.3483 15.2787 14.4047 14.2177 13.092 13.4609C11.7793 12.7041 10.1709 12.2939 8.51634 12.2939C6.86174 12.2939 5.25337 12.7041 3.94068 13.4609C2.628 14.2176 1.68436 15.2787 1.25611 16.4794"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="8.51647"
                    cy="4.76471"
                    rx="3.75817"
                    ry="3.76471"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <p>{t("Sidebar:profile")}</p>
              </span>
            </NavLink>
            <NavLink to="/dashboard/knowledgeBase">
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="15.9722"
                    height="16"
                    rx="3"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2.1416 6.71387H15.8321"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p>{t("Sidebar:knowledgeBase")}</p>
              </span>
            </NavLink>
            <NavLink to="/dashboard/rating">
              <span>
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 1H6.59404L10.5524 7.73761C8.80324 7.76781 7.23139 8.52921 6.12967 9.72992L1 1V1Z"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-miterlimit="22.9256"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.9658 1H15.3718L11.4135 7.73761C13.1626 7.76781 14.7344 8.52921 15.8362 9.72992L20.9658 1V1Z"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-miterlimit="22.9256"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.7295 20.1055C14.1294 20.1055 16.8848 17.3446 16.8848 13.9395C16.8848 10.5336 14.1287 7.77344 10.7295 7.77344C7.32961 7.77344 4.57422 10.5343 4.57422 13.9395C4.57422 14.2378 4.59575 14.5362 4.63882 14.8317"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-miterlimit="22.9256"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.83008 17.6719C6.26216 18.2413 6.78969 18.7302 7.389 19.1185"
                    stroke="#BEBEBE"
                    strokeWidth="1.5"
                    stroke-miterlimit="22.9256"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>{t("Sidebar:rating")}</p>
              </span>
            </NavLink>
            {(permission === "Admin" ||
              permission === "Manager" ||
              permission === "Mentor") && (
              <NavLink to="/dashboard/settings">
                <span>
                  <img src={settingsSVG} alt="Settings" id="settingsSvg" />
                  <p>{t("Sidebar:settings")}</p>
                </span>
              </NavLink>
            )}
            {(permission === "Student" || permission === 'Пользователь') && (
              <NavLink to="/dashboard/portfolio">
                <span>
                  <img
                    src={portfolioSVG}
                    alt="CreatePortfolio"
                    id="portfolioSvg"
                  />
                  <p>{t("Sidebar:createPortfolio")}</p>
                </span>
              </NavLink>
            )}
          </>
        ) : (
          <div className="adminButtons">
            {(permission === "Admin" || permission === "Mentor") && (
              <>
                <NavLink to="/dashboard/createCourse">
                  <span>
                    <p>Создать курс</p>
                  </span>
                </NavLink>
                <NavLink to="/dashboard/createArticle">
                  <span>
                    <p>Блог</p>
                  </span>
                </NavLink>
                <NavLink to="/dashboard/createPartners">
                  <span>
                    <p>Партнеры</p>
                  </span>
                </NavLink>
                <NavLink to="/dashboard/checkLab">
                  <span>
                    <p>Лабораторные</p>
                  </span>
                </NavLink>
              </>
            )}
            <NavLink to="/dashboard/statistics">
              <span>
                <p>Статистика</p>
              </span>
            </NavLink>
            <NavLink to="/dashboard/users">
              <span>
                <p>Пользователи</p>
              </span>
            </NavLink>
            <NavLink to="/dashboard/checkPortfolio">
              <span>
                <p>Портфолио</p>
              </span>
            </NavLink>
            <NavLink to="/dashboard/newUser">
              <span>
                <p>Создать студента</p>
              </span>
            </NavLink>
          </div>
        )}
      </div>

      <Modal
        centered
        title="Нужна помощь?"
        className="modalCourses"
        width={1000}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          {t("Sidebar:helpAdmin")}
          <a rel="noreferrer" href="https://t.me/kh_shakhriyor" target="_blank">
            {" "}
            {t("Sidebar:admin")}
          </a>
        </p>
        <p>
          {t("Sidebar:community")}
          <a
            rel="noreferrer"
            href="https://t.me/joinchat/ABxg-n4AyT5hMjNi"
            target="_blank"
          >
            {" "}
            {t("Sidebar:group")}
          </a>
        </p>
        {helpList &&
          helpList.map((h: any, key: any) => (
            <p key={key}>
              {t("Sidebar:group")} {h.title}, {t("Sidebar:question")}
              <a rel="noreferrer" target="_blank" href={h.telegram}>
                {" "}
                {t("Sidebar:thisGroup")}
              </a>
            </p>
          ))}
      </Modal>
      <Notifications />
      <Drawer
        placement="left"
        onClose={onCloseMenu}
        visible={mobileMenu}
        className="mobileMenu"
      >
        {theoryDetail.id ? <ViewTheorySidebar /> : <Sidebar />}
      </Drawer>
    </div>
  );
};

export default HeaderDashboard;
