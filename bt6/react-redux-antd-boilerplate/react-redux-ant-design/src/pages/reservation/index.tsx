import './reservation.scss';

import  HeaderHome  from '@/components/HeaderHome';
import  FooterHome  from '@/components/FooterHome';

import React, { useEffect, useState } from 'react';
import { postBookingTable } from '@/services/reservation.service'
import { RootState, store } from '@/store';
import { 
    Form, 
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    AutoComplete,
    DatePicker, 
    Space,
    TimePicker, 
    Button,
} from 'antd';
import { redirectTo } from '@/utils/history.utils';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@/utilities/queryParam';
import { getTableById } from '@/services/table.service';
import { toast, ToastContainer } from 'react-toastify';
import { createFetchReservationAction } from '@/actions/reservation.action';

const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: { 
        xs: { span: 24 },
        sm: { span: 24 },
    },
}

const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!'}],
};

export function ReservationPage() {
    const query = useQuery();
    const dispatch = useDispatch();
    const userInfo = useSelector((state:any) => state.users.user);
    const reservations = useSelector((state:any) => state.reservation.reservations);
    
    const [form] = Form.useForm();
    const [ tableInfo, setTableInfo ] = useState<any>();
    const [ reservation, setReservation ] = useState<any>();

    const handleBookingSuccess = (fieldsValue: any) => {
        // Should format date value before submit.
        const rangeTimeValue = fieldsValue['time'];

        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].format('YYYY-MM-DD'),
            'time': [
                rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
          ],
        };
        const matchedReservation = reservation.filter((reservation:any) => {
            return reservation.time[0] === values.time[0] || reservation.time[1] === values.time[1]
        });
        if(matchedReservation.length > 0) {
            toast.error("You have booked table at this time already!", {
                theme: 'colored',
            })
            return;
        } else {
            (async() => {
                try {        
                    await postBookingTable('', values);
                    toast.success("You have booked table Successfully!", {
                        theme: 'colored',
                    })
                    store.dispatch(createFetchReservationAction());
                    await new Promise((resolve, reject) => { setTimeout(resolve, 1000)});
                    return redirectTo('/');
                } catch(error) {
                    console.log(error);
                }
            })()
        }
    };
    
    const handleBookingFail = (errorInfo: any) => {
        console.log('Failed ', errorInfo);
    }

    useEffect(() => {
        (async () => {
            dispatch(createFetchReservationAction());
            const reservation = reservations.filter((reservation:any) => reservation.userName == userInfo.userName)
            setReservation(reservation);
            const tableId:any = query.get('table') ;   
            const resp = await getTableById(tableId);
            if(!resp) return;
            const currentTable = resp.data;
            setTableInfo(currentTable);   
        })()
    }, [])

    if(!userInfo || !tableInfo ) {
        console.log("isLoading");
        return null;
    } 

    return (
        <div className="app">
            <HeaderHome/>
            <section id="reservation">
                <div className="container" style={{ backgroundImage: "url(" + "/img/backgrounds/bg-info.jpg" + ")" }}>
                    <div className="wrapper">
                        <div className="reservation__title">
                            <h3 className="reservation__title-heading">Book A Table</h3>
                            <p className="reservation__title-des">
                                Please choose your reservation date with specific time and number of people to book a table
                            </p>
                        </div>
                        <div className="reservation__form">
                            <Form 
                                {...formItemLayout} 
                                form={form}
                                name="" 
                                onFinish={handleBookingSuccess}
                                onFinishFailed={handleBookingFail}
                                initialValues={{
                                    ...tableInfo,
                                    ...userInfo
                                }}>
                                <Form.Item>
                                    <Form.Item 
                                        name="date" {...config}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'right', marginRight: '8px' }}
                                        className="form-item"
                                    >
                                        {/* <DatePicker style={{ padding: '10px', width: '360px'}} className="input"/>     */}
                                        
                                    </Form.Item>
                                    <Form.Item 
                                        name="size"
                                        rules={[
                                            { required: true, message: "Please input your table size!"}
                                        ]}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'left', marginLeft: '8px' }}
                                        className="form-item"
                                    >
                                        <Input className="input" placeholder="Party size" 
                                            style={{ padding: '10px', width: '360px', fontSize: '18px'}}
                                            value={tableInfo.size}     
                                        />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                    <Form.Item 
                                        name="time"
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'right', marginRight: '8px' }}    
                                        className="form-item"
                                    >
                                        <TimePicker.RangePicker className="input" style={{ padding: '10px', width: '360px'}} />
                                    </Form.Item>
                                    <Form.Item 
                                        name="type"
                                        rules={[
                                            { required: true, message: "Please input your table type!"}
                                        ]}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'left', marginLeft: '8px' }}
                                        className="form-item"
                                    >
                                        <Input className="input" placeholder="Type of table" 
                                            style={{ padding: '10px', width: '360px', fontSize: '18px'}} 
                                            value={tableInfo.type}    
                                        />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                    <Form.Item 
                                        name="tableName"
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'right', marginRight: '8px' }}
                                        className="form-item"
                                    >
                                        <Input className="input" placeholder="Name Table" 
                                            style={{ padding: '10px', width: '360px', fontSize: '18px' }} 
                                            value={tableInfo.tableName}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name="userName"
                                        rules={[
                                            { required: true, message: "Please input username!"}
                                        ]}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'left', marginLeft: '8px' }}
                                        className="form-item"
                                    > 
                                        <Input className="input" placeholder="User name" 
                                            style={{ padding: '10px', width: '360px', fontSize: '18px'}} 
                                            value={userInfo.userName}    
                                        />
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                    <Form.Item 
                                        name="email"
                                        rules={[
                                            { 
                                                type: 'email',
                                                message: 'The input is not valid E-mail',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail',
                                            }
                                        ]}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'right', marginRight: '8px' }}
                                        className="form-item"
                                    >
                                        <Input className="input" placeholder="Email" 
                                            style={{ padding: '10px', width: '360px', fontSize: '18px'}} 
                                            value={userInfo.email}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name="phoneNumber"
                                        rules={[
                                            { 
                                                required: true, 
                                                message: 'Please input your phone number!'
                                            }
                                        ]}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', textAlign: 'left', marginLeft: '8px' }}
                                        className="form-item"
                                    >
                                        <Input className="input" placeholder="Phone" 
                                            style={{ padding: '10px', width: '360px', fontSize: '18px'}} 
                                            value={userInfo.phoneNumber}    
                                        />
                                    </Form.Item>
                                </Form.Item>   

                                <Form.Item 
                                    name="description"
                                    rules={[
                                        { 
                                            required: true,
                                            message: 'Please input description',
                                        }
                                    ]}
                                    className="form-item"
                                >
                                    <Input.TextArea 
                                        showCount
                                        maxLength={1000}
                                        placeholder="Description"
                                        style={{ width: '750px', margin: '0 auto', height: '200px'}}  
                                        className="input input-area"  
                                        value={tableInfo.description}
                                    />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        xs: { span: 24, offset: 0 },
                                        sm: { span: 24, offset: 0 },
                                    }}
                                    className="form-item"
                                >
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        style={{ height: '50px', fontWeight: '600', fontSize: '18px' }}>
                                            COMPLETE RESERVATION
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
            <FooterHome/>
            <ToastContainer autoClose={1000}/>
        </div>
    );
}