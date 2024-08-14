import { useState, useCallback } from "react";
import API_BASE_URL from "../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const useSaveBase = (
  initialData = {
    id: "",
    firstName: "",
    lastName: "",
  },
  isEditMode = false,
  endpoint = ""
) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      setLoading(true);
      setError(null);
      console.log(values);

      try {
        let response;
        if (isEditMode) {
          response = await API_BASE_URL.put(
            `${endpoint}/${formData.id}`,
            values
          );
        } else {
          response = await API_BASE_URL.post(endpoint, values);
        }
        navigate("/");
        return response.data;
      } catch (err) {
        setError(err.message);
        Modal.confirm({
          title: err.message,
          content: "Turn back to Home Page",
          type: "error",
          okText: "Ok",
          cancelText: '',
          onOk: () => navigate("/"),
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, isEditMode, endpoint, navigate]
  );

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    setFormData,
  };
};

export default useSaveBase;
