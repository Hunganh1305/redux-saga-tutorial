import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';

class EditModal extends Component {
    constructor(props) {
        super(props);
        const { id, firstName, lastName } = this.props.item;
        this.state = {
            id: id,
            firstName: firstName,
            lastName: lastName
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item !== this.props.item) {
            this.setState({
                id: this.props.item.id,
                firstName: this.props.item.firstName,
                lastName: this.props.item.lastName
            });
        }
    }

    handleFinish = (values) => {
        const { id } = this.state;
        const { firstName, lastName } = values;
        this.props.onSave({ id, firstName, lastName });
        this.props.onClose();
    }

    render() {
        const { isOpen, onClose } = this.props;
        const { firstName, lastName } = this.state;
        return (
            <Modal
                title="Edit Item"
                open={isOpen}
                onCancel={onClose}
                footer={[
                    <Button key="cancel" onClick={onClose}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" form="editForm" htmlType="submit">
                        Save
                    </Button>,
                ]}
            >
                <Form
                    id="editForm"
                    layout="vertical"
                    initialValues={{ firstName, lastName }}
                    onFinish={this.handleFinish}
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input the first name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input the last name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default EditModal;
