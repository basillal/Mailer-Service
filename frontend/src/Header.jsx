import React from "react";
import "./App.css";
export const Header = ({title}) => {
  return (
    <>
      <header>
        <div className="dashboard">
          <h1>{title}</h1>
        </div>
        <div className="header-right">
          <div className="Status">Active</div>
          <div className="header-text">
            <h1>Admin</h1>
          </div>

          <div className="user"></div>
        </div>
      </header>
    </>
  );
};
