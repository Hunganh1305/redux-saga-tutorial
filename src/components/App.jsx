import React, { useState, useEffect } from "react";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";
import EditModal from "./EditModal";
import { connect } from "react-redux";
import {
  getUsersRequest,
  usersError,
  addUser,
  deleteUser,
  editItem,
} from "../actions/user";
import { Alert, Modal, Button } from "antd";
import useDisclosure from "../hooks/useDisclosure";
import { Link } from "react-router-dom";

const App = ({
  users,
  getUsersRequest,
  usersError,
  addUser,
  deleteUser,
  editItem,
}) => {
  const { isOpen, open, close } = useDisclosure();
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    getUsersRequest();
  }, [getUsersRequest]);

  const handleCreateUserSubmit = ({ firstName, lastName }) => {
    const existingIds = users.items.map((item) => item.id);
    const newId = generateUniqueId(existingIds);
    const newUser = {
      id: newId,
      firstName,
      lastName,
    };
    addUser(newUser);
  };

  const handleDeleteUserClick = (userId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => deleteUser(userId),
    });
  };

  const handleEditUserClick = (user) => {
    setItemToEdit(user);
    open();
  };

  const handleSaveEdit = (editedItem) => {
    editItem(editedItem);
    close();
  };

  const handleCloseAlert = () => {
    usersError({
      error: "",
    });
  };

  const generateUniqueId = (existingIds) => {
    let id;
    do {
      id = Math.floor(10 + Math.random() * 90);
    } while (existingIds.includes(id));
    return id;
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Users</h2>
        <Link to="/list-table">
          <Button type="primary">Go to List Table</Button>
        </Link>
      </div>
      {users.error && (
        <Alert
          message="Error"
          description={users.error}
          type="error"
          closable
          onClose={handleCloseAlert}
        />
      )}
      <NewUserForm onSubmit={handleCreateUserSubmit} />
      {!!users.items && !!users.items.length && (
        <UserList
          onDeleteUserClick={handleDeleteUserClick}
          onEditUserClick={handleEditUserClick}
          users={users.items}
        />
      )}
      {isOpen && (
        <EditModal
          isOpen={isOpen}
          item={itemToEdit}
          onClose={close}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  usersError,
  addUser,
  deleteUser,
  editItem,
})(App);
