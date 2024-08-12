import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const EditModal = ({ isOpen, onClose, onSave, item }) => {
    const [form] = Form.useForm();
    const [id, setId] = useState(item.id);

    useEffect(() => {
        setId(item.id);
        form.setFieldsValue({
            firstName: item.firstName,
            lastName: item.lastName,
        });
    }, [item, form]);

    const handleFinish = (values) => {
        onSave({ id, ...values });
        onClose();
    };

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
                form={form}
                layout="vertical"
                initialValues={{
                    firstName: item.firstName,
                    lastName: item.lastName,
                }}
                onFinish={handleFinish}
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
};

export default EditModal;
