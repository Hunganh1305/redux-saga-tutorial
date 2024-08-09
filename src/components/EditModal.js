// EditModal.js
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';


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
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader toggle={onClose}>Edit Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSave}>Save</Button>{' '}
                    <Button color="secondary" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default EditModal;
