import "./Button.scss";
import React from "react";

interface Props {
  text: string;
  color: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, color }) => {
  return <button className={`button ${color}`}>{text}</button>;
};

export default Button;
