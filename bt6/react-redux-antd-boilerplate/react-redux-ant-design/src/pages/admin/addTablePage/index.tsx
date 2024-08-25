import './addTablePage.scss';

import { Link } from 'react-router-dom'
import { redirectTo } from "@/utils/history.utils"
import { RootState } from "@/store";
import { postTable } from "@/services/table.service";
import { onlyNumber } from "@/utilities/validator";
import { fetchEnums } from "@/actions/appEnums.action";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

export default function addTablePage() {
  
    const handleAddSuccess = (values: any) => {    
        (async () => {  
            try {
                await postTable('', values)
                redirectTo('/admin/tables-management')
            } catch(error){
                console.log(error);
            }
        })()
    };

    const handleAddFail = (errorInfo: any) => {
        console.log('Failed: ', errorInfo);
    }
    
    return (
        <div className="content">
            <h1 className="title-page">Add table</h1>
            
            <Form className="form"  
                onFinish={handleAddSuccess}
                onFinishFailed={handleAddFail}
            >
                
                <Form.Item
                    label="Address Image"
                    name="tableImage"
                    rules={[{ required: true, message: "Please input your table image!" }]}
                >
                    <Input className="input"/>
                </Form.Item>

                <Form.Item
                    label="Table Name"
                    name="tableName"
                    rules={[{ required: true, message: "Please input your table name!" }]}
                >
                    <Input className="input"/>
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
        			<Input.TextArea />
      			</Form.Item>

                <Form.Item wrapperCol={{ offset: 17, span: 7}} className="wrapper-btn">
                    <Link to="/admin/tables-management">
                        <Button htmlType="button" className="btn-cancel">
                            Cancel
                        </Button>
                    </Link>
                    
                    <Button htmlType="submit" className="btn-add">Add</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
