import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useListBase = (apiUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiUrl);
      const paginatedItems = getPaginatedItems(
        response.data.data,
        currentPage,
        pageSize
      );
      setData(paginatedItems);
      setTotalPages(Math.ceil(response.data.total / pageSize));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateItem = (id, updatedData) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  const deleteItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const getPaginatedItems = (data, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, data.length);
    return data.slice(startIndex - 1, endIndex);
  };

  const changePage = (page) => {
    const paginatedItems = getPaginatedItems(data, currentPage, pageSize);
    setData(paginatedItems);
    setCurrentPage(page);
  };

  const changePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    data,
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
  };
};

export default useListBase;
