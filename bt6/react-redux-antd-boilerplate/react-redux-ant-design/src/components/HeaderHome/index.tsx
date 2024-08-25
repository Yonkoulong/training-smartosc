import "@/styles/_common.scss";
import "./headerHome.scss";

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { redirectTo } from "@/utils/history.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faCaretDown, faGear, faArrowRightFromBracket, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { popupAuthAction } from "@/actions/popup.actions";
import { validateAccessToken, validateAccessTokenSuccess, removeAccessToken } from "@/actions/token.actions";
import { toast } from "react-toastify";

export default function HeaderHome() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state:any) => { return state.users.user })    
    const [ toggle, setToggle ] = useState(false);
    const [ navigation, setNavigation ] = useState(false);
    
    function handleToggle() {
        setToggle(!toggle);
    }

    function toggleNavigation() {
        setNavigation(!navigation);        
    }

    function handleLogout() {
        setToggle(!toggle);
        dispatch(removeAccessToken());
        localStorage.removeItem("token");
        redirectTo("/");
    }

    function handlePopup() {    
        dispatch(popupAuthAction(false));        
    }; 

    return (
        <header>
            <div className="container">
                <div className="wrapper">
                    <div className="header__logo">
                        <img src="/img/logo/home-logo.jpg" alt="logo-pada" />
                    </div>
                    <div className="header__navbar">
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item">
                                <Link to="/" className="header__navbar-item-link">Home</Link>
                            </li>
                            <li className="header__navbar-item">
                                <Link to="#about" className="header__navbar-item-link">About</Link>
                            </li>
                            <li className="header__navbar-item">
                                <Link to="#Services" className="header__navbar-item-link">Services</Link>
                            </li>
                            <li className="header__navbar-item">
                                <Link to="#contact" className="header__navbar-item-link">Contact Us</Link>
                            </li>
                            {
                                userInfo == null ? 
                                <li className="header__navbar-item">
                                    <div className="header__navbar-item-link" onClick={handlePopup}>Login</div>
                                </li> : <></>
                            }
                            <li className="header__navbar-item">
                                <Link to="#" className="header__navbar-item-link" >
                                    <div className="header__navbar-item-wrapper">
                                        <FontAwesomeIcon icon={ faCartShopping } className="cart-icon"/>
                                        <span className="quantities">0</span>
                                    </div>
                                </Link>
                            </li>
                            {
                                userInfo != null ?
                                <li className="header__navbar-item">
                                    <div className="header__navbar-item-info" onClick={() => handleToggle()}>
                                        <span className="user-name">{userInfo.userName}</span>
                                        <FontAwesomeIcon icon={faCaretDown} className="caret-down" />
                                    </div>
                                    <div className={toggle ? "header-dropdown" : "dp-none"}>
                                        <ul className="header-dropdown-list">
                                            <li className="header-dropdown-item">
                                                <FontAwesomeIcon icon={faUser} className="icon"/><span className="text">Profile</span>
                                            </li>
                                            <li className="header-dropdown-item">
                                                <FontAwesomeIcon icon={faGear} className="icon"/><span className="text">Setting</span>
                                            </li>
                                            <li className="header-dropdown-item">
                                                <Link to="/user/reservation-list"><FontAwesomeIcon icon={faClockRotateLeft} className="icon"/><span className="text">Reservation</span></Link>
                                            </li>
                                            <li className="header-dropdown-item" onClick={handleLogout}>
                                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon"/><span className="text">Logout</span>
                                            </li>
                                        </ul>
                                    </div> 
                                </li> : <></>
                            }
                        </ul>
                    </div>
                    <div className="header__navbar-mobile">
                        <div className="header__navbar-cart">
                            <div className="header__navbar-item-wrapper">
                                <FontAwesomeIcon icon={ faCartShopping } className="cart-icon"/>
                                <span className="quantities">0</span>
                            </div>
                        </div>
                        <button className={ navigation == true ? "header__navbar-menu header__navbar-menu-open" : "header__navbar-menu"} 
                            onClick={ toggleNavigation }>
                            <div className="button-bar"></div>
                            <div className="button-bar"></div>
                            <div className="button-bar"></div>
                        </button>	
                    </div>
                </div>
            </div>
            <nav>
                <div className={ navigation == true ? "nav nav-open" : "nav"}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-item-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#about" className="nav-item-link">About</a>
                        </li>
                        <li className="nav-item">
                            <a href="#services" className="nav-item-link">Services</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-item-link">Contact Us</a>
                        </li>
                        <li className="nav-item nav-item__separator"></li>
                        {
                            userInfo == null ? 
                            <li className="nav-item--small">
                                <div className="nav-item-link" onClick={handlePopup}>Login</div>
                            </li> : <></>
                        }
                        {
                            userInfo != null ?
                            <li className="nav-item--small" onClick={handleLogout}>
                               <div className="nav-item-link">Logout</div>
                            </li> : <></>
                        }
                    </ul>
                </div>
                <div className="backdrop"></div>
            </nav>
        </header>
    )
}
