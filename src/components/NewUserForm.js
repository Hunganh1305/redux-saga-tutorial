import React, { Component } from "react";
import { Button, Form, Input } from "antd";

class NewUserForm extends Component {
    state = {
        firstName: "",
        lastName: "",
    };
    formRef = React.createRef();

    handleSubmit = () => {
        const { firstName, lastName } = this.state;
        this.setState({
            firstName: "",
            lastName: "",
        });
        this.props.onSubmit({ firstName, lastName });
        this.formRef.current.resetFields();
    };

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value,
        });
    };

    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value,
        });
    };

    render() {
        return (
            <Form
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
                initialValues={{ firstName: "", lastName: "" }}
            >
                <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[{ required: true, message: "Please enter your first name" }]}
                >
                    <Input
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[{ required: true, message: "Please enter your last name" }]}
                >
                    <Input
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                    />
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
