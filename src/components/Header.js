import React from "react";
import "./Header.css";
import logo from "../logo512.png";

export default function Header(){
    return (
        <div className="header">
            <img src={logo} alt="React" className="logoImage" />
            <span className="text">React Quiz</span>
        </div>
    )
}