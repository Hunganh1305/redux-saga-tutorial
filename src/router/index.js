import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../components/App";
import ListTable from "../components/ListTable";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/list-table" Component={ListTable} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
