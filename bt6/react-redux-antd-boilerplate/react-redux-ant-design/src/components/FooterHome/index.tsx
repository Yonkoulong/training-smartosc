import React from 'react';
import "@/styles/_common.scss";
import "@/styles/_grid.scss";
import "./footerHome.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function FooterHome() {
	return (
		<footer id="footer">
			<div className="container">
				<div className="wrapper">
					<ul className="footer__list row">
						<li className="footer__list-item col s-6">
							<h3 className="footer__item-heading">Panda Restaurant</h3>
							<ul className="footer__social-list">
								<li className="footer__social-item">Social Connect</li>
								<li className="footer__social-item">
									<FontAwesomeIcon icon={ faFacebookF } className="footer__social-item-icon"/>
									<FontAwesomeIcon icon={ faTwitter } className="footer__social-item-icon"/>
									<FontAwesomeIcon icon={ faInstagram } className="footer__social-item-icon"/>
								</li>
							</ul>

						</li>
						<li className="footer__list-item col s-12">
							<h3 className="footer__item-heading">Service</h3>
							<ul className="footer__service-list">
								<li className="footer__service-item">Delivery</li>
								<li className="footer__service-item">Pricing</li>
								<li className="footer__service-item">Fast Food</li>
								<li className="footer__service-item">Reserve your spot</li>
							</ul>
						</li>
						<li className="footer__list-item col s-12">
							<h3 className="footer__item-heading">Information</h3>
							<ul className="footer__information-list">
								<li className="footer__information-item">Event</li>
								<li className="footer__information-item">Contact us</li>
								<li className="footer__information-item">Privacy</li>
								<li className="footer__information-item">Term of services</li>
							</ul>
						</li>
						<li className="footer__list-item col s-12">
							<h3 className="footer__item-heading">Address</h3>
							<ul className="footer__address-list">
								<li className="footer__address-item">Ha Noi - Viet Nam</li>
								<li className="footer__address-item">Yonkou Long @464</li>
								<li className="footer__address-item">+84 966 928 464</li>
								<li className="footer__address-item">nguyenhailong270921@gmail.com</li>
							</ul>
						</li>
					</ul>
					<p className="footer-copy"><b>©</b> 2022 Nguyen Hai Long. <i>All right reserved</i></p>
				</div>
			</div>
		</footer>
	)
}
