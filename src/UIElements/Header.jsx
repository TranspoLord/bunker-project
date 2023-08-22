import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./header.css";

function Header({ previousPage, buttons }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (previousPage) {
      navigate(previousPage);
    } else {
      navigate(-1);
    }
  };

  const handleClick = (link, external) => {
    if(external) {
      window.location.href = link;
    } else {
      navigate(link);
    }
  };

  return (
    <div className="header">
      <div className="header-buttons">
        <div className="button">
          <Link to="/">Home</Link>
        </div>
        {buttons ? buttons.map((button, index) => (
          <div className="button">
            <button key={index} onClick={() => handleClick(button.link, button.external)}>
              {button.name}
            </button>
          </div>
        )) : ""}
      </div>
      <button className="button" onClick={goBack}>
        Back
      </button>
    </div>
  );
}

export default Header;
