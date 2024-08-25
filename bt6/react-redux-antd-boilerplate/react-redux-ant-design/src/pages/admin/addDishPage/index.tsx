import './addDishPage.scss';

import { Link } from 'react-router-dom'
import { onlyNumber } from "@/utilities/validator";
import { redirectTo } from "@/utils/history.utils"
import { RootState } from "@/store";
import { postDish } from "@/services/dish.service";
import { fetchEnums } from "@/actions/appEnums.action";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

export default function addDishPage() {
    const categories = useSelector((state: RootState) => {
        return state.appEnums.categories
    });
   
    const handleAddSuccess = (values: any) => {    
        (async () => {  
            try {
                await postDish('', values);
                redirectTo('/admin/dishes-management');
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
            <h1 className="title-page">Add dish</h1>
            
            <Form className="form"  
                onFinish={handleAddSuccess}
                onFinishFailed={handleAddFail}
            >
                
                <Form.Item
                    label="Address Image"
                    name="dishImage"
                    rules={[{ required: true, message: "Please input your dish image!" }]}
                >
                    <Input className="input"/>
                </Form.Item>

                <Form.Item
                    label="Dish Name"
                    name="dishName"
                    rules={[{ required: true, message: "Please input your dish name!" }]}
                >
                    <Input className="input"/>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Please input your price!" },
                            { pattern: onlyNumber, message: "Please enter price by number"}]}
                >
                    <Input className="input" />
                </Form.Item>

                <Form.Item
                    label="Categories"
                    name="categoryId"
                    rules={[{ required: true, message: "Please input your categories!" }]}
                >
                    <Select placeholder="I'm Select" allowClear className="select">
                            {
                                categories.map((category:any, index:number) => {
                                    return <Option key={index} value={category.name}>{category.name}</Option>
                                })
                            }
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 17, span: 7}} className="wrapper-btn">
                    <Link to="/admin/dishes-management">
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
