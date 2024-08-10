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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSave = () => {
        const { id, firstName, lastName } = this.state;
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
                    <Button key="save" type="primary" onClick={this.handleSave}>
                        Save
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="First Name">
                        <Input
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={this.handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Last Name">
                        <Input
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={this.handleChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default EditModal;
