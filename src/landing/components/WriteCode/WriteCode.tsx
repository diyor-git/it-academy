import React from "react";
import "./WriteCode.scss";
import codesabdox from "../../../assets/image/codesabdox.png";
const WriteCode = () => {

  return (
    <div className="write-code">
      <div className="container">
        <div className="write-code__title">
          <h2>Почувствуй себя программистом!</h2>
        </div>
        <div>
          <h3>Попробуй вставить код и посмотреть что получится!</h3>
          {/*@ts-ignore*/}
          <iframe src="https://codepen.io/skaterinenko/embed/MWOGqYQ?default-tab=html%2Cresult&editable=true"/>
        </div>
        <div className="take-code">
          <div className="content">
            <div className="first-content">
              <h3>Вставьте в index.html</h3>
              <div className="box"></div>
            </div>
            <div className="second-content">
              <h3>Вставь в style.css</h3>
              <div className="box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteCode;
