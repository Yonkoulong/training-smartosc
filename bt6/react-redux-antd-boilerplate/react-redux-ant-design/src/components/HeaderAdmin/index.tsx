import "./_headerAdmin.scss";

import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown, faUser, faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { redirectTo } from "@/utils/history.utils";
import { removeAccessToken } from "@/actions/token.actions";
import { Link } from "react-router-dom";

export default function HeaderAdmin() {
	const dispatch = useDispatch();
	const [ toggle, setToggle ] = useState(false);
    const [ navigation, setNavigation ] = useState(false);

	function toggleNavigation() {
		setNavigation(!navigation)
	}

	function handleLogout() {
		localStorage.removeItem("token");
		dispatch(removeAccessToken());
		redirectTo("/");
	}

	function handleToggle() {
		setToggle(!toggle)
	}

	return (
		<div className="header">
			<div className="grid-admin">
				<div className="header-brand">
					<a href="">
						<img src="/img/logo/logo-preview.png" alt="" className="logo" />
					</a>
					<h1>Panda</h1>
					<button className={ navigation == true ? "header__navbar-menu header__navbar-menu-open" : "header__navbar-menu"} 
                            onClick={ toggleNavigation }>
                            <div className="button-bar"></div>
                            <div className="button-bar"></div>
                            <div className="button-bar"></div>
                    </button>	
				</div>
				<div className="header-nav">
					<div className="header-nav-notify">
						<FontAwesomeIcon icon={faBell} className="bell-notify" />
					</div>
					<div className="header-nav-languages">
						<span className="text-language">EN</span>
						<FontAwesomeIcon icon={faCaretDown} className="caret-language" />
					</div>
					<div className="header-nav-info" onClick={handleToggle}>
						<img src="/img/avatar/admin.jpg" alt="" className="avatar" />
						<FontAwesomeIcon icon={faCaretDown} className="caret-avatar" />
					</div>
					<div className={toggle ? "header-dropdown" : "dp-none"}>
						<span className="text mrl-20">Hi, Yonkoulong!</span>
						<ul className="header-dropdown-list">
							<li className="header-dropdown-item">
								<FontAwesomeIcon icon={faUser} className="icon"/><span className="text">Profile</span>
							</li>
							<li className="header-dropdown-item">
								<FontAwesomeIcon icon={faGear} className="icon"/><span className="text">Setting</span>
							</li>
							<li className="header-dropdown-item" onClick={handleLogout}>
								<FontAwesomeIcon icon={faArrowRightFromBracket} className="icon"/><span className="text">Logout</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<nav>
                <div className={ navigation == true ? "nav nav-open" : "nav"}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/admin/dishes-management" className="nav-item-link">Dishes Management</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/tables-management" className="nav-item-link">Talbes Management</Link>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/reservation-management" className="nav-item-link">Reservation Management</a>
                        </li>
                    </ul>
                </div>
                <div className="backdrop"></div>
            </nav>
		</div>
	);
}
