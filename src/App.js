import React from "react";
import "./App.css";
import TodoComponent from "./Todo/TodoComponent";
import Modal from "./Modal/Modal";
import FormValidation from "./FormValidation";
import HardFormValidation from "./FormValidation/hardForm";
import PaginationDyn from "./Pagination/PaginationDyn";
import PaginationPerPage from "./Pagination/PaginationPerPage";

function App() {
  return (
    <div className="wrapper">
      <Modal />
      <TodoComponent />
      <FormValidation />
      <HardFormValidation />
      <PaginationDyn />
      <PaginationPerPage />
    </div>
  );
}

export default App;
