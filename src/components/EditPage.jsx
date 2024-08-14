import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Spin } from "antd";
import useListBase from "../hooks/useListBase";
import useSaveBase from "../hooks/useSaveBase";

const EditPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { users } = location.state;

  // const { data: users } = useListBase("/users");
  console.log("user", users);

  const currentItem =
    users.items.find((user) => user.id === parseInt(id)) || {};
  const isEditMode = Boolean(currentItem && currentItem.id);

  const { loading, error, handleSubmit } = useSaveBase(currentItem, isEditMode);

  if (!isEditMode && !loading) {
    return (
      <div style={{ position: "fixed", top: "50%", left: "50%" }}>
        <Spin />
      </div>
    );
  }

  const handleFinish = async (values) => {
    await handleSubmit(values);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Edit User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          firstName: currentItem.firstName,
          lastName: currentItem.lastName,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input the first name!" }]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input the last name!" }]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPage;
