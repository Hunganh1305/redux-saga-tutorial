import React, { Component } from 'react';
import NewUserForm from './NewUserForm';
import UserList from './UserList';
import { connect, useSelector } from 'react-redux';
import { getUsersRequest, usersError, addUser, deleteUser } from '../actions/user';
import { Alert } from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.getUsersRequest();
    }


    handleCreateUserSubmit = ({ firstName, lastName }) => {
        console.log('Create', firstName, lastName);
        const newUser = {
            id: '',
            firstName: firstName,
            lastName: lastName,
        };
        console.log(newUser);

        this.props.addUser(newUser);

    };

    handleDeleteUserClick = (userId) => {
        console.log('Delete ID: ', userId);
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            this.props.deleteUser(userId);
        }
    };

    handleCloseAlert = () => {
        this.props.usersError({
            error: ''
        });
    };

    render() {
        // const stateUser = useSelector((state) => state.items)
        // console.log('stateUser', stateUser);

        const users = this.props.users;

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
                    <UserList onDeleteUserClick={this.handleDeleteUserClick} users={users.items} />
                }
            </div>
        );
    }
}

export default connect(({ users }) => ({ users }), {
    getUsersRequest,
    usersError,
    addUser,
    deleteUser
})(App);