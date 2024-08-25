import './dishesPage.scss';
import '@/styles/_common.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDish } from '@/services/dish.service';
import { createFetchDishAction } from "@/actions/dish.action";
import { store, RootState } from "@/store"
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import { Table, Button, Space  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';


export default function dishesPage() {
	const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const dispatch = useDispatch();
	const dishes = useSelector((state: any) => state.dish.dishes);
	const [toggle, setToggle] = useState(false);
	const categories = useSelector((state: RootState) => {
		return state.appEnums.categories;
	});

	const columns = [ 
		{
			title: 'Image',
			dataIndex: 'dishImage',
			key: 'dishImage',
			width: 100,
			maxWidth: 100,
			render: (t:any, r:any) => <img src={`${r.dishImage}`} />
		},
		{
			title: 'Dish Name',
			dataIndex: 'dishName',
			key: 'dishName'
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key:'price',
		},
		{
			title: 'Category',
			dataIndex: 'categoryId',
			key: 'categoryId',
			render: (t: any, r:any) => {
				
				categories.map((category:any, index:number) => {
					if(r.categoryId == category.id) {
						 r.categoryId = category.name;
					}
				})			
				return (
					<>{r.categoryId}</>

				)	
			} 
		},
		{
			title: 'Action',
			dataIndex: 'action',
			render: (t:any, r:any) => {
				async function onDelete(){
					const resp = await deleteDish(r.id).catch((err)=>{
						if(err){
							console.log(err);
						}
					})
					if(!resp) {
						toast.error("Delete Failed, please try again!", {
							theme: 'colored',
						});
						return;
					};
	
					if(resp.status === 200){
						store.dispatch(createFetchDishAction())
						toast.success("Delete Successfully!", {
							theme: 'colored',
						});
					}
				}
				return (
					<Space size="middle">
						  <button onClick={onDelete} className="btn-delete">Delete</button>
						  <Link to={`/admin/dishes-management/edit/${r.id}`}>
							  <button className="btn-edit">Edit</button>
						</Link>
					</Space>
				  )
			},
		}
	];
	
	const onSelectChange = (selectedRowKey:any, selectedRows: any) => {
		setSelectedRowKeys( selectedRowKey );
	};
	
	const rowSelection = {
		selectedRowKeys, 
		onChange:  onSelectChange,
	};
	
	const hasSelected = selectedRowKeys.length > 0;

	useEffect(() => {
		dispatch(createFetchDishAction());
	}, []);

	const handleDropdown = () => {
		setToggle(!toggle);
	}

	return (
		<div className="content">
			<div className="dish-features">
				<h1 className="title-page">Menu</h1>
				<div className="dish-features-wrapper">
					<div className="dish-features-filter">
						<div className="dropdown" onClick={handleDropdown}>
							<span>Category</span> <FontAwesomeIcon icon={faChevronDown} className="icon-dropdown"/>
						</div>
						<ul className={toggle ? "dropdown-list" : "dropdown-list dp-none" } 

						>
							{ categories.map((category:any, index:number) => {
								return <li className="dropdown-item" key={index}>{category.name}</li>
							}) }
						</ul>
					</div>
					<div className="dish-features-action">
						<button className="btn-delete-count ">
							Delete dish
							<span style={{ marginLeft: 8}}>{hasSelected ? `(${selectedRowKeys.length})`: ''}</span>
						</button>
						<Link to="/admin/dishes-management/create">	
							<button className="btn-add">
								<FontAwesomeIcon icon={faPlus} /> Add dish
							</button>
						</Link>
					</div> 
				</div>
			</div>
			<div className="dish-list">
				<Table rowSelection={rowSelection} columns={columns} dataSource={dishes}></Table>
			</div>
			<ToastContainer autoClose={2000}/>
		</div>
	)
}
