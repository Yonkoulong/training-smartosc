import './tablesPage.scss';
import '@/styles/_common.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTable } from '@/services/table.service';
import { createFetchTableAction } from "@/actions/table.action"
import {store, RootState} from "@/store"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Space  } from 'antd';

const columns = [ 
	{
		title: 'Image',
		dataIndex: 'image',
		key: 'image',
		width: 100,
		maxWidth: 100,
		render: (t:any, r:any) => <img src={`${r.image}`} />
	},
	{
		title: 'Table Name',
		dataIndex: 'tableName',
		key: 'tableName'
	},
	{
		title: 'Size',
		dataIndex: 'size',
		key:'size',
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		render: (t:any, r:any) => {
			async function onDelete() {
				const resp = await deleteTable(r.id).catch((err) => {
					if(err) {
						console.log(err);	
					}
				})
				if(!resp) return;

				if(resp.status === 200) {
					store.dispatch(createFetchTableAction())
				}
			}
			return (
				<Space size="middle">
					<button className="btn-delete" onClick={onDelete}>Delete</button>
					<Link to={`/admin/tables-management/edit/${r.id}`}>
						<button className="btn-edit">Edit</button>
					</Link>
				</Space>
			)
		}
	}
];

export default function tablesPage() {
	const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
	const dispatch = useDispatch();
	const [toggle, setToggle] = useState(false);
	const tables = useSelector((state: any) => state.table.tables)
	
	
	const onSelectChange = (selectedRowKey:any, selectedRows: any) => {
		setSelectedRowKeys( selectedRowKey );
	};
	
	const rowSelection = {
		selectedRowKeys, 
		onChange: onSelectChange,
	};
	
	const hasSelected = selectedRowKeys.length > 0;

	useEffect(() => {
		dispatch(createFetchTableAction())
	}, [])

  return (
    <div className="table-content">
        <div className="table-features">
            <h1 className="title-page">Table List</h1>
            <div className="table-features-wrapper">
				<div className="table-features-filter">
					<div className="dropdown">
						<span>Types</span><FontAwesomeIcon icon={faChevronDown} className="icon-dropdown"/>
					</div>
				</div>
				<div className="table-features-action">
					<button className="btn-delete-count">
						Delete Table
						<span style={{ marginLeft: 8}}>{hasSelected ? `(${selectedRowKeys.length})`: ''}</span>
					</button>
					<Link to="/admin/tables-management/create">	
						<button className="btn-add">
							<FontAwesomeIcon icon={faPlus} /> Add table
						</button>
					</Link>
				</div>
            </div>
        </div>
        <div className="table-list">
			<Table rowSelection={rowSelection} columns={columns} dataSource={tables}></Table>
        </div>
    </div>
  )
}


