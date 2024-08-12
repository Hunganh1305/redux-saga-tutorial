import React from "react";
import { Button, Form, Input } from "antd";

const NewUserForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        const { firstName, lastName } = values;
        onSubmit({ firstName, lastName });
        form.resetFields();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ firstName: "", lastName: "" }}
        >
            <Form.Item
                label="First name"
                name="firstName"
                rules={[{ required: true, message: "Please enter your first name" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: "Please enter your last name" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button block type="primary" value="large" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewUserForm;
