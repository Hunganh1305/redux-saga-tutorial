import React from 'react';
import UserListItem from './UserListItem';
import { List } from 'antd';

const UserList = ({ users, onDeleteUserClick, onEditUserClick }) => {
    const sortedUsers = React.useMemo(() => {
        return [...users].sort((a, b) => {
            if (a.firstName !== b.firstName) {
                return a.firstName.localeCompare(b.firstName);
            }
            return a.lastName.localeCompare(b.lastName);
        });
    }, [users]);

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

