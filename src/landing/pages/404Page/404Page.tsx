import React from "react";
import "./404Page.scss";
import page404 from "../../../assets/image/404page.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import FooterAcademy from "../../components/FooterAcademy/FooterAcademy";

const Page404 = () => {
  return (
    <div className="page-404">
      <Header theme="black" />
      <div className="container">
        <div className="content">
          <div className="first-content">
            <h1>Извините, страница не найдена</h1>
            <Link to="/">
              <button>На главную</button>
            </Link>
          </div>
          <div className="second-content">
            <img src={page404} alt="" />
          </div>
        </div>
      </div>
        <FooterAcademy/>
    </div>
  );
};

export default Page404;
