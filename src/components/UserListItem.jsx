import React from 'react';
import { Button } from 'antd';

const UserListItem = ({ user, onDeleteClick, onEditUserClick }) => {
    const stringToHslColor = (str = '') => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = hash % 360;
        return `hsl(${h}, 60%, 80%)`;
    };

    const initials = !!user?.firstName && !!user?.lastName
        ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
        : '';

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        margin: 'auto 0',
                        textAlign: 'center',
                        height: '40px',
                        width: '40px',
                        lineHeight: '40px',
                        borderRadius: '50%',
                        color: 'white',
                        fontWeight: 'bold',
                        background: stringToHslColor(user.firstName + user.lastName)
                    }}
                >
                    {initials}
                </div>
                <div style={{ margin: 'auto 0', paddingLeft: '10px' }}>
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 'auto 0', marginRight: '10px' }}>
                    <Button type="primary" value="large" onClick={() => onEditUserClick(user)}>
                        Edit
                    </Button>
                </div>
                <div style={{ margin: 'auto 0' }}>
                    <Button type="primary" value="large" danger onClick={() => onDeleteClick(user.id)}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserListItem;
