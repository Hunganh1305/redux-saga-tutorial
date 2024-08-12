import React, { Component } from "react";
import { Button, Form, Input } from "antd";

class NewUserForm extends Component {
    formRef = React.createRef();

    handleFinish = (values) => {
        const { firstName, lastName } = values;
        this.props.onSubmit({ firstName, lastName });
        this.formRef.current.resetFields();
    };

    render() {
        return (
            <Form
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleFinish}
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
    }
}

export default NewUserForm;
