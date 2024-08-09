import React, { Component } from 'react';
import NewUserForm from './NewUserForm';
import UserList from './UserList';
import EditModal from './EditModal';
import { connect } from 'react-redux';
import { getUsersRequest, usersError, addUser, deleteUser, editItem } from '../actions/user';
import { Alert } from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isModalOpen: false,
            itemToEdit: null
        };
        this.props.getUsersRequest();
    }


    handleCreateUserSubmit = ({ firstName, lastName }) => {
        const newUser = {
            id: 16,
            firstName: firstName,
            lastName: lastName,
        };
        console.log(newUser);

        this.props.addUser(newUser);

    };

    handleDeleteUserClick = (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            this.props.deleteUser(userId);
        }
    };

    handleEditUserClick = (user) => {
        this.handleOpenEditModal(user)
    }

    handleOpenEditModal = (item) => {
        this.setState({
            isModalOpen: true,
            itemToEdit: item
        });
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false,
            itemToEdit: null
        });
    }

    handleSaveEdit = (editedItem) => {
        this.props.editItem(editedItem);
        this.handleCloseModal();
    }

    handleCloseAlert = () => {
        this.props.usersError({
            error: ''
        });
    };

    render() {
        // const stateUser = useSelector((state) => state.items)
        // console.log('stateUser', stateUser);

        const users = this.props.users;
        const { isModalOpen, itemToEdit } = this.state;

        return (
            <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
                <h2>
                    Users
                </h2>
                <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
                    {this.props.users.error}
                </Alert>
                <NewUserForm onSubmit={this.handleCreateUserSubmit} />
                {!!users.items && !!users.items.length &&
                    <UserList onDeleteUserClick={this.handleDeleteUserClick} onEditUserClick={this.handleEditUserClick} users={users.items} />
                }
                {isModalOpen && (
                    <EditModal
                        isOpen={isModalOpen}
                        item={itemToEdit}
                        onClose={this.handleCloseModal}
                        onSave={this.handleSaveEdit}
                    />
                )}
            </div>
        );
    }
}

export default connect(({ users }) => ({ users }), {
    getUsersRequest,
    usersError,
    addUser,
    deleteUser,
    editItem
})(App);