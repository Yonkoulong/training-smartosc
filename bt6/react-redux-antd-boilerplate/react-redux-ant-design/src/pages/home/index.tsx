import "@/styles/_common.scss";
import "@/styles/_grid.scss";
import "./homePage.scss";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/virtual';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import HeaderHome from "@/components/HeaderHome";
import Authencation from "@/components/Authencation";
import FooterHome from "@/components/FooterHome";

import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { redirectTo } from "@/utils/history.utils";
import { Navigation } from 'swiper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellConcierge, faPaperPlane,faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { createFetchDishAction } from "@/actions/dish.action";
import { createFetchTableAction } from "@/actions/table.action"
import { popupAuthAction } from "@/actions/popup.actions";
import { store, RootState } from "@/store";
import { Swiper, SwiperSlide} from 'swiper/react';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@/utilities/queryParam";
import { ToastContainer } from "react-toastify";
import React, {useState, useEffect} from "react";
import { buildQueries } from "@testing-library/react";
import { getDishById } from "@/services/dish.service";
import { postDishToTheCart } from "@/services/cart.service";
import { createFetchDishFromCartAction } from "@/actions/cart.action";

export function HomePage() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state:any) => state.users.user);
	const dishes = useSelector((state:any) => state.dish.dishes);
	const tables = useSelector((state:any) => state.table.tables);
	const categories = useSelector((state:any) => state.appEnums.categories);
	const isPopup = useSelector((state: any) => state.popup.popup);
	const carts = useSelector((state: any) => state.cart.carts);

	const [ dishFilter, setDishFilter ] = useState(dishes);
	const [ activeCategory, setActiveCategory ] = useState();

	function handleBooking(table: any) {
		if(userInfo == null) {
			dispatch(popupAuthAction(false));
		} else {
			redirectTo(`/reservation?table=${table.id}`)
		}		
	}

	function handleMouseOut() {
		dispatch(popupAuthAction(false));
	}

	function handleDishesFilterFollowCategory(id:any) {
		const result = dishes.filter((dish: any) => {
			return dish.categoryId === id;
		});
		setDishFilter(result);
	}

	function handleOrderDish(id: any) {		
		(async () => {
			try {
				const dish = await getDishById(id);
				
				console.log(dish);
				const postDish = await postDishToTheCart('', dish.data);

			} catch (error) {
				console.log(error);
			}
		})()
	}

	useEffect(() => {
		dispatch(createFetchDishAction());
		dispatch(createFetchTableAction());
		dispatch(createFetchDishFromCartAction());
	}, [])

  	return (
    	<div className="app" >	
        	<HeaderHome/>

			{/* display popup */}
			<div className={isPopup ? "auth dp-block" : "dp-none"}>
				{isPopup && <> <Authencation/> <div className="backdrop" onClick={handleMouseOut}></div> </> }
			</div>

			{/* home */}
			<section id="home">
				<div className="container">
					<div className="wrapper">
						<div className="home__title">
							<h1 className="home__title-heading">Panda Restaurant</h1>
							<h3 className="home__title-subHeading">Try the best food everyday</h3>
							<button className="btn btn-green">View menu</button>
						</div>
						<div className="home__image">
							<img src="/img/home/home.png" alt="home-image"/>
						</div>
					</div>
				</div>
			</section>

			{/* about */}
			<section id="about">
					<div className="container">
						<div className="wrapper row">
							<div className="col col-6 about__image">
								<img src="/img/about/about.jpg" alt="about-image"/>
							</div>
							<div className="col col-6 about__intro">
								<span className="about__intro-title">The Panda Restaurants</span>
								<h3 className="about__intro-heading">We cook the best tasty food</h3>
								<p className="about__intro-description">While all of our restaurants are elaborated to elicit ambience of aesthetics and sophistication, 
									each location embodies a unique style and characteristic which we are particularly proud of. Rejoicing 
									in local flavors and culinary innovation, we specialize in evelating classic Vietnamese recipes to international 
									standards whilst managing to retain their quintessence.
								</p>
								<button className="btn btn-green">Learn More</button>
							</div>
						</div>
					</div>
			</section>

			{/* services */}
			<section id="services">
				<div className="container">
					<div className="wrapper row">
						<div className="services__intro">
							<span className="services__intro-title">Offering</span>
							<h3 className="services__intro-heading">Our amazing services</h3>
						</div>
						<div className="services__container">
							<ul className="services__list">
								<li className="services__item col c-4 m-12 s-12">
									<img src="/img/icon/plates.png" alt=""  className="services__item-img"/>
									<h5 className="services__item-heading">Vietnamese Culinary Artisanship</h5>
									<p className="service__item-description">
										We create meny that highlights traditional Vietnamese cusine and show cacses 
										natonal heritage, enticing the senses of fine dning enthusiasts.
									</p>
								</li>
								<li className="services__item col c-4 m-12 s-12">
								<img src="/img/icon/food.png" alt=""  className="services__item-img"/>
									<h5 className="services__item-heading">Premium Ingredients</h5>
									<p className="service__item-description">
										We are proud to offer fresh food from daily deliveries to ensure 
										that only the finest ingredients are used to create our premium dishes.
									</p>
								</li>
								<li className="services__item col c-4 m-12 s-12">
									<img src="/img/icon/delivery.png" alt=""  className="services__item-img"/>
									<h5 className="services__item-heading">Fast Delivery</h5>
									<p className="service__item-description">
										Order any food near you. Choose from the largest selection of 
										PanDa Restaurants and have your meal delivered to your door.
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		
			{/* menu */}
			<section id="menu">
				<div className="container">
					<div className="wrapper"> 
						<div className="menu__intro">
							<span className="menu__intro-title">Enjoy</span>
							<h3 className="menu__intro-heading">Our Menus</h3>
						</div>
		
						<div className="menu__filter-btn">
							<button className="btn btn-filter" 
									onClick={() => setDishFilter(dishes)}>
										ALL
							</button>			
							{
								categories?.map((category: any, index: number) => {
									return <button 
										key={index} 
										className="btn btn-filter"
										onClick={() => handleDishesFilterFollowCategory(category.id)}>
											{category.name}
									</button>
								})
							}
						</div>

						<div className="menu__dishes">
							<ul className="menu__dishes-list row">	
								{	 
									dishFilter.map((dish:any, index:number) => 
										<li key={index} className="menu__dishes-item">
											<div className="menu__dishes-item-bg" style={{ backgroundImage: `url(${dish.dishImage})` }}></div>
											<h3 className="menu__dishes-item-name">{dish.dishName}</h3>
											<span className="menu__dishes-item-price">${dish.price}</span>
											<div className="menu__dishes-item-cart">
												<FontAwesomeIcon icon={ faCartShopping } className="cart-icon" onClick={() => handleOrderDish(dish.id)}/>
											</div>
										</li>
									)
								}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* table */}
			<section id="table">
				<div className="container">
					<div className="wrapper">
						<div className="table__intro">
							<span className="table__intro-title">Make Reservation</span>
							<h3 className="table__intro-heading">Our Available Tables</h3>
						</div>
						<div className="table__reservation">
							<Swiper 
								modules={[Navigation]}
								spaceBetween={50}
								slidesPerView={4} 
								navigation
								className="table__reservation-list">
								{
									tables.map((table:any, index:number) => 
										<SwiperSlide className="table__reservation-item c-3 m-3 s-6" key={index}>
											<img src={table.image} alt={table.tableName} className="table-image"/>
											<div className="table__reservation-item-info">
												<h3 className="table-name">{table.tableName}</h3>
												<div className="table-quality">
													<span className="table-size">{table.size}</span>
													<span className="cross">-</span>
													<span className="table-type">{table.type}</span>
												</div>
												<p className="table-description">{table.description}</p>
											</div>		
											<div className="overlay">
												<FontAwesomeIcon icon={ faBellConcierge } className="reservation-icon"
													onClick={() => handleBooking(table)}
												/>
											</div>								
										</SwiperSlide>
									)
								}
							</Swiper>
						</div>
					</div>	
				</div>		
			</section>
			
			<section id="banner">
				<div className="container">
					<div className="wrapper">
						<div className="banner__title">
							<span className="banner__title-text">SIGN UP FOR NEWSLETTER</span>
							<h3 className="banner__title-heading">Get Exclusive Deals from The Panda Restaurants</h3>
						</div>
						<div className="banner__email">
							<input type="text" className="banner-ipt" placeholder="Enter your email address" />
							<FontAwesomeIcon icon={faPaperPlane} className="banner-icon"/>
						</div>
					</div>
				</div>	
			</section>

			<FooterHome/>
			<ToastContainer autoClose={1000}/>
    	</div>
  	);
}
