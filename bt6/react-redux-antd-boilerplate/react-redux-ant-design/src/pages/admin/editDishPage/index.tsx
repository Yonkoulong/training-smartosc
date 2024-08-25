import './editDishPage.scss';

import React, { useEffect, useState } from 'react';
import { RootState } from "@/store";
import { Link } from 'react-router-dom';
import { onlyNumber } from "@/utilities/validator";
import { redirectTo } from "@/utils/history.utils"
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { getDishById, updateDish } from '@/services/dish.service';
import { Form, Input, Button, Select } from 'antd';


export default function editDishPage() {
    const { Option } = Select;
    const [ selectedDish, setSelectedDish ] = useState<any>();
    const categories = useSelector((state: RootState) => {
        return state.appEnums.categories
    });
    const params = useParams<{id:string}>();    

    useEffect(() => {
        (async () => {
            try {
                const resp = await getDishById(params.id);
                if(!resp) return;
                const currentDish = resp.data;
                setSelectedDish(currentDish);
                
            }catch (err) {
                console.log(err);
            }
        }
        )();
    }, [])
    
    useEffect(() => {
        console.log(selectedDish);
        
    }, [selectedDish])

    const handleEdit = (value: any) => {    
        (async () => {
            try {             
              await updateDish(params.id, value);
              redirectTo('/admin/dishes-management');
            } catch(error){
                console.log(error);
            }
        })()        
    };

    const handleEditFail = (errorInfo: any) => {
        console.log('Failed: ', errorInfo);
    };

    if(!selectedDish) {
        console.log("isLoading");
        return null;
    } 
    return (
        <div className="content">
            <h1 className="title-page">Edit dish</h1>
            
            <Form className="form"  
                onFinish={handleEdit}
                onFinishFailed={handleEditFail}
                initialValues={selectedDish}
            >
            
                <Form.Item
                    label="Address Image"
                    name="image"
                    rules={[{ required: true, message: "Please input your dish image!" }]}
                >
                    <Input className="input" value={selectedDish.image}/>
                </Form.Item>

                <Form.Item
                    label="Dish Name"
                    name="dishName"
                    rules={[{ required: true, message: "Please input your dish name!" }]}
                >
                    <Input className="input" value={selectedDish.dishname}/>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Please input your price!" },
                            { pattern: onlyNumber, message: "Please enter price by number"}]}
                >
                    <Input className="input"  value={selectedDish.price}/>
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
                    <Button htmlType="submit" className="btn-add">Save</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
