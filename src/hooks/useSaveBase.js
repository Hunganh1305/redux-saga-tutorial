import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import useFetch from "./useFetch";

const useSaveBase = (apiEndpoint, navigateRouting) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    fetchData,
    data,
    error: fetchError,
    loading: fetchLoading,
  } = useFetch(apiEndpoint);

  const handleSubmit = useCallback(
    async (values) => {
      setLoading(true);
      setError(null);

      const isEditMode = Boolean(values.id);
      const method = isEditMode ? "PUT" : "POST";
      const url = isEditMode ? `${apiEndpoint}/${values.id}` : apiEndpoint;
      fetchData(url, method, values);

      try {
        await fetchData();

        if (fetchError) {
          throw new Error(fetchError);
        }

        if (data) {
          navigate(navigateRouting);
        }
      } catch (err) {
        setError(err.message);
        Modal.confirm({
          title: err.message,
          content: "An error occurred. Returning to the home page.",
          type: "error",
          okText: "Ok",
          cancelText: "",
          onOk: () => navigate(navigateRouting),
        });
      } finally {
        setLoading(fetchLoading);
      }
    },
    [apiEndpoint, navigate, fetchData, data, fetchError, fetchLoading]
  );

  return {
    loading,
    error,
    handleSubmit,
  };
};

export default useSaveBase;
