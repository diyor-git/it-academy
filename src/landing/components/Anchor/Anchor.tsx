import React from "react";
import { HashLink } from "react-router-hash-link";
import "./Anchor.scss";
const Anchor = () => {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="anchor" onClick={toTop}>
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  );
};

export default Anchor;
