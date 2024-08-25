import "./_signup.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popupAuthAction } from "@/actions/popup.actions";
import { Checkbox } from "antd/lib";
import { onlyNumber } from "@/utilities/validator";
import { ToastContainer, toast } from 'react-toastify';
import { clientAuthService } from '@/services/client-auth.service';

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

const SignupTab = () => {
	
    const dispatch = useDispatch();
	const onFinish = async (values: any) => {
		try {
			const resp = await clientAuthService.register(values);
			toast.success("Register Successfully!", {
				theme: 'colored',
			})
			dispatch(popupAuthAction(true));

		} catch (error) {
			console.log(error);	
			toast.error("Register Failed!", {
				theme: 'colored',
			})
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);

		toast.error("Register Failed!", {
			theme: 'colored',
		})
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
				name="userName"
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
				label="Email"
				name="email"
				rules={[
				{
					type: "email",
					required: true,
					message: "Please input your email!",
				},
				]}
			>
				<Input className="input" />
			</Form.Item>

			<Form.Item
				label="Phone Number"
				name="phoneNumber"
				rules={[
				{
					required: true,
				},
				{
					pattern: onlyNumber,
					message: "Please input your phone number!",
				},
				{
					max: 10,
				},
				]}
			>
				<Input className="input" />
			</Form.Item>

			<Form.Item
				name="remember"
				valuePropName="checked"
				wrapperCol={{ offset: 4, span: 20 }}
			>
				<Checkbox>I agree with Terms of Privacy</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ span: 24 }} className="wrapper-button">
				<Button type="primary" htmlType="submit" className="button">
				Sign Up
				</Button>
			</Form.Item>
		</Form>
	);
};

export default SignupTab;
