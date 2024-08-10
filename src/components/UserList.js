import React from 'react';
import UserListItem from './UserListItem';
import { List } from 'antd';

const UserList = ({ users, onDeleteUserClick, onEditUserClick }) => {
    const sortedUsers = users.sort((a, b) => {
        if (a.firstName > b.firstName) {
            return 1;
        } else if (a.firstName < b.firstName) {
            return -1;
        } else if (a.lastName > b.lastName) {
            return 1;
        } else if (a.lastName < b.lastName) {
            return -1;
        }
        return 0;
    });
    return (
        <List
            itemLayout="horizontal"
            dataSource={sortedUsers}
            renderItem={(user) => (
                <List.Item key={user.id}>
                    <UserListItem
                        onDeleteClick={onDeleteUserClick}
                        onEditUserClick={onEditUserClick}
                        user={user}
                    />
                </List.Item>
            )}
        />
    );
};

export default UserList;