import './reservationPage.scss';
import React, { useEffect, useState, useRef } from 'react';

import { Table, Input, Space, Button } from 'antd';
import { faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import { createFetchReservationAction, updateStatus } from '@/actions/reservation.action';
import { confirmBookingTable, deleteBookingTable } from '@/services/reservation.service';
import { toast } from 'react-toastify';
import { store } from '@/store';

const { Search } = Input;

interface Reservation {
	key: string,
	date: Date,
	time: Date,
	tableName: string,
	size: string,
	type: string, 
	userName: string,
	phoneNumber: string,
	description: string
}

export function StatusCell({t,r}:any){
	const buttonRef = useRef<HTMLButtonElement>(null);
	const currentTime = +new Date();

	useEffect(()=>{

		if(buttonRef && buttonRef.current) {	

			if(currentTime < +new Date(r.time[1]) ){		
				//@ts-ignore
				buttonRef.current.innerText = "occupied";
				buttonRef.current.classList.add('occupied');
			} else {
				//@ts-ignore
				buttonRef.current.innerText = "unoccupied";
				buttonRef.current.classList.add('unoccupied');
			}	
		}
	},[r])

	return (
		<Space size="middle">
			<button ref={buttonRef} className={r.status == true ? "occupied" : "unoccupied"}></button>
		</Space>
	)
}

export default function reservationPage() {
	const dispatch = useDispatch();
	const reservations = useSelector((state: any) => state.reservation.reservations);	

	const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
	const [ reservationStatus, setReservationStatus ] = useState([]);
	const [ isClick, setIsClick ] = useState();

	const onSelectChange = (selectedRowKey: any, selectedRows: any) => {
		setSelectedRowKeys( selectedRowKey )
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	}
	
	const hasSelected = selectedRowKeys.length > 0;

	const onSearch = (value:any) => console.log(value);
	

	useEffect(() => {
		dispatch(createFetchReservationAction())
	}, [])

	const columns = [ 
		{
			title: 'Time Start',
			dataIndex: 'time',
			key: 'time',
			render: (t: any, r: any) => {
				
				return (
					<td className="ant-table-cell">{r.time[0]}</td>
				)
			}
		},
		{
			title: 'Time End',
			dataIndex: 'time',
			key:'time',
			render: (t: any, r: any) => {
				return (
					<td className="ant-table-cell">{r.time[1]}</td>
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
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName',
		},
		{
			title: 'Phone',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Status',
			dataIndex: '',
			key: 'status',
			render: (t:any, r:any) => {
				return (
					<StatusCell t={t} r={r}/>
				)
			}	
		},
		{
			title: 'Action',
			dataIndex: 'action',
			render: (t:any, r:any) => {
				
				async function onDelete() {
					const resp = await deleteBookingTable(r.id).catch((err) => {
						if(err) {
							console.log(err);
						}
					});

					if(!resp) {
						toast.error("Delete Table Reservation failed, please try agin!", {
							theme: 'colored',
						})
						return;
					}
					
					if(resp.status === 200) {
						store.dispatch(createFetchReservationAction());
						toast.success("Delete Successfully", {
							theme: 'colored',
						})
					}
				}

				const handleConfirmBookingTable = (r:any) => {
					const table = r;
					table.status = !table.status;
					setReservationStatus(table);
					setIsClick(r.id);
					(async () => {
						try {
							await confirmBookingTable(r.id, reservationStatus);	
						} catch (error) {
							console.log(error);
						}
					})();
				}

				return (
					 
					<Space size="middle">
						<span>
							<FontAwesomeIcon icon={faCircleCheck} className={isClick ? "dp-none" :"icon icon-check"} onClick={() => handleConfirmBookingTable(r)}/>
						</span>
						<span>
							<FontAwesomeIcon icon={faTrashCan} className="icon icon-trash" onClick={onDelete}/>
						</span>
					</Space>
				
				)			
			}
		},
	];

  	return (
		<div className="reservation-content">
			<div className="reservation-features">
				<h1 className="title-page">Reservation List</h1>
				<Search placeholder="input search text" 
					onSearch={onSearch} 
					style={{ width: '304px' }}
					enterButton 
				/>
			</div>
			<div className="reservation-list">
				<Table rowSelection={rowSelection} columns={columns} dataSource={reservations}></Table>
			</div>
		</div>
  	)
}
