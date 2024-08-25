import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";
import { Checkbox } from "antd/lib";
import { redirectTo } from "@/utils/history.utils";
import { useDispatch, useSelector } from 'react-redux';
import { clientAuthService } from "@/services/client-auth.service";
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from "react";

import { validateAccessToken,validateAccessTokenSuccess } from '@/actions/token.actions';
import { popupAuthAction } from "@/actions/popup.actions";


import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import userEvent from "@testing-library/user-event";

export default function SignInTab() {
	const dispatch = useDispatch();
  	const [userAccount, setUserAccount] = useState([]);


  	const onFinish = async (values: any) => {
		const resp:any = await clientAuthService.login(values);
		if (!resp) return;
		localStorage.setItem("token", JSON.stringify(resp));;		
		
		dispatch(validateAccessToken(resp.accessToken));
		dispatch(popupAuthAction(true));
	
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
		name="basic"
		labelCol={{ span: 24 }}
		wrapperCol={{ span: 24 }}
		initialValues={{ remember: true }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
		autoComplete="off"
		>
			<Form.Item
				label="Username"
				name="username"
				rules={[{ required: true, message: "Please input your username!" }]}
			>
				<Input className="input" />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: "Please input your password!" }]}
			>
				<Input.Password className="input" />
			</Form.Item>

			<Form.Item
				name="remember"
				valuePropName="checked"
				wrapperCol={{ offset: 6, span: 18 }}
			>
				<Checkbox>Remember me!</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ span: 24 }}>
				<Button type="primary" htmlType="submit" className="button">
				Sign In
				</Button>
			</Form.Item>
		</Form>
	);
}
