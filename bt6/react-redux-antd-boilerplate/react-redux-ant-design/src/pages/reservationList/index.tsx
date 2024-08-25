import './reservationListPage.scss';
import React, { useEffect, useState } from 'react'

import { Table, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createFetchReservationAction } from '@/actions/reservation.action';

import HeaderHome from '@/components/HeaderHome';
import FooterHome from '@/components/FooterHome';

export function ReservationListPage() {
	const dispatch = useDispatch();
    const reservations = useSelector((state:any) => state.reservation.reservations);
	const user = useSelector((state:any) => state.users.user);
	
	const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
	const [ reservation, setReservation ] = useState([]);
	console.log(reservation);
	
	const { Search } = Input;
	
	const onSelectChange = (selectedRowKey: any, selectedRows: any) => {
		setSelectedRowKeys( selectedRowKey )
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	}

	const columns = [
		{ 
			title: 'Time Start',
			dataIndex: 'time',
			key: 'time',
			render: (t: any, r: any) => {

				return (
					<>{r.time[0]}</>
				)
			}
		},
		{
			title: 'Time End',
			dataIndex: 'time',
			key:'time',
			render: (t: any, r: any) => {
				
				return (
					<>{r.time[1]}</>
				)
			}
		},
		{
			title: 'Table Name',
			dataIndex: 'tableName',
			key: 'tableName',
		},
		{
			title: 'Size',
			dataIndex: 'size',
			key: 'size',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (t:any, r:any) => {
				return (
					<>{r.status == true ? "Booked" : "isWaiting"}</>
				)
			}	
		},
	];

	const onSearch = (value:any) => console.log(value);

	useEffect(() => {
		dispatch(createFetchReservationAction())
		const reservationList = reservations.filter((reservation:any) => reservation.userName === user.userName);
		setReservation(reservationList);
	}, []);

	if(!user && !reservation) {
        console.log("isLoading");
        return null;
    } 

	return (
		<div className="app">
			<HeaderHome/>
			<section id="reservation-list">
				<div className="container">
					<div className="wrapper">
						<div className="reservation-search">
							<Search placeholder="input search text"
								onSearch={onSearch}
								style={{ width: '304px'}}
								enterButton>
							</Search>
						</div>
						<div className="reservation-table">
							<Table rowSelection={rowSelection} columns={columns} dataSource={reservation}></Table>
						</div>
					</div>
				</div>
			</section>
			<FooterHome/>
		</div>
	)
}
