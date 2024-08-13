import React, { useEffect, useState } from "react";
import { Table, Button, Pagination, Spin, Alert, Modal } from "antd";
import useListBase from "../hooks/useListBase";
import { useNavigate } from "react-router-dom";
import useDisclosure from "../hooks/useDisclosure";
import EditModal from "./EditModal";

const ListTable = () => {
  const {
    data: users,
    loading,
    error,
    currentPage,
    totalPages,
    pageSize,
    fetchData,
    updateItem,
    deleteItem,
    changePage,
    changePageSize,
  } = useListBase("/users");

  const { isOpen, open, close } = useDisclosure();
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => deleteItem(id),
    });
  };

  const handleEditUserClick = (user) => {
    setItemToEdit(user);
    open();
  };

  const handleSaveEdit = (editedItem) => {
    console.log("handle save edit", editedItem);

    updateItem(editedItem.id, editedItem);
    close();
  };

  const navigate = useNavigate();

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, user) => (
        <span>
          <Button
            style={{ margin: "auto 0", marginRight: "10px" }}
            type="primary"
            onClick={() => handleEditUserClick(user)}
          >
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ position: "fixed", top: "50%", left: "50%" }}>
        <Spin />
      </div>
    );
  }
  if (error)
    return <Alert message="Error" description={error} type="error" showIcon />;

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px", maxWidth: "1200px" }}>
      <Button
        type="primary"
        onClick={handleBackClick}
        style={{ marginBottom: "20px" }}
      >
        Back to Home
      </Button>
      <h2>Table Users</h2>
      <Table
        columns={columns}
        dataSource={users}
        pagination={false}
        rowKey="id"
      />
      <Pagination
        current={currentPage}
        total={totalPages * pageSize}
        pageSize={pageSize}
        onChange={changePage}
        onShowSizeChange={(current, size) => changePageSize(size)}
      />
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

export default ListTable;
