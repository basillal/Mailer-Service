import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [showSidebar, setSidebar] = useState(false);

  const Sidebar = () => {
    setSidebar(!showSidebar);
  };

  const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="dropdown">
        <button
          onClick={handleToggle}
          type="button"
          className="inline-flex w-fulltext justify-center gap-x-1.5 "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Reports
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            className="absolute  z-10 mt-2 w-37 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <Link
                to={`/successreports`}
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Success
              </Link>
              <Link
                to={`/errorreport`}
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Failed
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="nav">
      <div onClick={Sidebar} className="logo">
        <h1>Mailer</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 17 13"
          fill="none"
        >
          <path
            d="M0 4.68339V9.37506C0 10.2039 0.32924 10.9987 0.915291 11.5848C1.50134 12.1708 2.2962 12.5001 3.125 12.5001H13.5417C14.3705 12.5001 15.1653 12.1708 15.7514 11.5848C16.3374 10.9987 16.6667 10.2039 16.6667 9.37506V4.68339L8.76042 8.24173C8.62613 8.30209 8.48057 8.3333 8.33333 8.3333C8.1861 8.3333 8.04054 8.30209 7.90625 8.24173L0 4.68339ZM0.0770832 2.43339L8.33333 6.15006L16.5896 2.43339C16.4327 1.7423 16.0456 1.12504 15.4918 0.682893C14.938 0.240744 14.2503 -3.46902e-05 13.5417 6.10637e-05H3.125C2.41633 -3.46902e-05 1.72867 0.240744 1.17485 0.682893C0.621028 1.12504 0.233936 1.7423 0.0770832 2.43339Z"
            fill="#3D63F7"
          />
        </svg>
      </div>
      <div className="list">
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 35 31"
              fill="none"
            >
              <path
                d="M0 0.692322V12.1346L20.1923 15.5L0 18.8654V30.3077L35 15.5L0 0.692322Z"
                fill="#444444"
              />
            </svg>
            <Link className="link" to={`/sent`}>
              Sent
            </Link>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 35 35"
              fill="none"
            >
              <path
                d="M32.1338 4.63377C32.3614 4.39802 32.4874 4.08226 32.4846 3.75452C32.4817 3.42677 32.3503 3.11326 32.1185 2.8815C31.8868 2.64974 31.5732 2.51828 31.2455 2.51543C30.9178 2.51258 30.602 2.63857 30.3662 2.86627L14.1163 19.1163L13.75 21.25L15.8837 20.8838L32.1338 4.63377ZM8.125 3.75002C6.96468 3.75002 5.85188 4.21096 5.03141 5.03143C4.21094 5.8519 3.75 6.9647 3.75 8.12502V26.875C3.75 28.0353 4.21094 29.1481 5.03141 29.9686C5.85188 30.7891 6.96468 31.25 8.125 31.25H26.875C28.0353 31.25 29.1481 30.7891 29.9686 29.9686C30.7891 29.1481 31.25 28.0353 31.25 26.875V14.375C31.25 14.0435 31.1183 13.7256 30.8839 13.4911C30.6495 13.2567 30.3315 13.125 30 13.125C29.6685 13.125 29.3505 13.2567 29.1161 13.4911C28.8817 13.7256 28.75 14.0435 28.75 14.375V26.875C28.75 27.3723 28.5525 27.8492 28.2008 28.2008C27.8492 28.5525 27.3723 28.75 26.875 28.75H8.125C7.62772 28.75 7.15081 28.5525 6.79917 28.2008C6.44754 27.8492 6.25 27.3723 6.25 26.875V8.12502C6.25 7.62774 6.44754 7.15083 6.79917 6.7992C7.15081 6.44756 7.62772 6.25002 8.125 6.25002H20.625C20.9565 6.25002 21.2745 6.11832 21.5089 5.8839C21.7433 5.64948 21.875 5.33154 21.875 5.00002C21.875 4.6685 21.7433 4.35056 21.5089 4.11614C21.2745 3.88172 20.9565 3.75002 20.625 3.75002H8.125Z"
                fill="#444444"
              />
            </svg>
            <Link className="link" to={`/composer`}>
              Composer
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 35 35"
              fill="none"
            >
              <path
                d="M13.125 24.7917H10.2083V14.5833H13.125V24.7917ZM18.9583 24.7917H16.0417V10.2083H18.9583V24.7917ZM24.7917 24.7917H21.875V18.9583H24.7917V24.7917ZM27.7083 27.7083H7.29167V7.29167H27.7083V27.8542M27.7083 4.375H7.29167C5.6875 4.375 4.375 5.6875 4.375 7.29167V27.7083C4.375 29.3125 5.6875 30.625 7.29167 30.625H27.7083C29.3125 30.625 30.625 29.3125 30.625 27.7083V7.29167C30.625 5.6875 29.3125 4.375 27.7083 4.375Z"
                fill="#444444"
              />
            </svg>
            <Dropdown className="link" />
          </li>
          <li>
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            <Link className="link" to={`/logout`}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
