
import { Link } from 'react-router-dom';
import { redirectTo } from "@/utils/history.utils";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router";
import { getTableById, updateTable } from '@/services/table.service'
import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Select } from 'antd';


export default function editTablePage() {
	const { Option } = Select;
	const [ selectedTable, setSelectedTable ] = useState<any>();
	const params = useParams<{id: string}>();	
	
	useEffect(() => {
		(async () => {
			try {
				const resp = await getTableById(params.id);
				if(!resp) return;
				const currentTable = resp.data;
				setSelectedTable(currentTable)
			} catch (err) {
				console.log(err);
			}
		})();
	}, [])

	const handleEditTable = (value: any) => {
		(async () => {
			try {
				await updateTable(params.id, value);
				redirectTo('/admin/tables-management')
			}catch (error) {
				console.log(error);
			}
		})();
	}

	const handleEditTableFail = (errorInfo: any) => {
		console.log('Failed: ', errorInfo);
	}
	
	if(!selectedTable) {
		console.log("isLoading");
		return null;
	}

	return (
		<div className="content">
			<h1 className="title-page">Edit table</h1>

			<Form className="form"
				onFinish={handleEditTable} 
				onFinishFailed={handleEditTableFail}
				initialValues={selectedTable}
			>
				
				<Form.Item
                    label="Address Image"
                    name="image"
                    rules={[{ required: true, message: "Please input your table image!" }]}
                >
                    <Input className="input" value={selectedTable.image}/>
                </Form.Item>

                <Form.Item
                    label="Table Name"
                    name="tableName"
                    rules={[{ required: true, message: "Please input your table name!" }]}
                >
                    <Input className="input" value={selectedTable.tableName}/>
                </Form.Item>

                <Form.Item
                    label="Size"
                    name="size"
                    rules={[{ required: true, message: "Please choose your size table!" }]}
                >
                    <Select placeholder="I'm Select" allowClear className="select">    
						<Option value="2 people">2 people</Option>   
						<Option value="3 people">3 people</Option>   
						<Option value="4 people">4 people</Option>   
						<Option value="5 people">5 people</Option>   
						<Option value="more than 8 people">more than 8 people</Option>   
                    </Select>
                </Form.Item>

				<Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: "Please choose your type of table!" }]}
                >
                    <Select placeholder="I'm Select" allowClear className="select">    
						<Option value="Normal">Normal</Option>   
						<Option value="Medium">Medium</Option>   
						<Option value="Vip 1">Vip 1</Option>   
						<Option value="Vip 2">Vip 2</Option>   
						<Option value="Vip 3">Vip 3</Option>   
                    </Select>
                </Form.Item>

				<Form.Item 
					label="Description"
					name="description"
					rules={[{ required: true, message: "Please input should enter your describe table!" }]}
				>
        			<Input.TextArea value={selectedTable.description}/>
      			</Form.Item>

                <Form.Item wrapperCol={{ offset: 17, span: 7}} className="wrapper-btn">
                    <Link to="/admin/tables-management">
                        <Button htmlType="button" className="btn-cancel">
                            Cancel
                        </Button>
                    </Link>
                    
                    <Button htmlType="submit" className="btn-add">Save</Button>
                    
                </Form.Item>
			</Form>
		</div>
	)
}
