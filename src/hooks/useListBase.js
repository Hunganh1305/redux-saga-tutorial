import { useState, useEffect, useCallback } from "react";
import useFetch from "./useFetch";

const useListBase = (apiUrl, options = {}) => {
  const { data: fetchedData, loading, error } = useFetch(apiUrl, options);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
  });

  useEffect(() => {
    if (fetchedData) {
      const paginatedItems = getPaginatedItems(
        fetchedData.data,
        pagination.currentPage,
        pagination.pageSize
      );
      setData(paginatedItems);
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalPages: Math.ceil(fetchedData.total / prevPagination.pageSize),
      }));
    }
  }, [fetchedData, pagination.currentPage, pagination.pageSize]);

  const updateItem = (id, updatedData) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  const deleteItem = (id) => {
    setData((prevData) => {
      const updatedData = prevData.filter((item) => item.id !== id);
      const newTotalPages = Math.ceil(updatedData.length / pagination.pageSize);

      const newCurrentPage =
        pagination.currentPage > newTotalPages && newTotalPages > 0
          ? newTotalPages
          : pagination.currentPage;

      setPagination((prevPagination) => ({
        ...prevPagination,
        currentPage: newCurrentPage,
        totalPages: newTotalPages,
      }));

      return updatedData;
    });
  };

  const getPaginatedItems = (data, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, data.length);
    return data.slice(startIndex - 1, endIndex);
  };

  const changePage = (page) => {
    const paginatedItems = getPaginatedItems(data, page, pagination.pageSize);
    setData(paginatedItems);
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: page,
    }));
  };

  const changePageSize = (size) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageSize: size,
      currentPage: 1,
    }));
  };

  return {
    data,
    loading,
    error,
    pagination,
    updateItem,
    deleteItem,
    changePage,
    changePageSize,
  };
};

export default useListBase;
