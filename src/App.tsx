import React from "react";
import logo from "./logo.svg";
import "./App.css";
import IncomeForm from "./components/IncomeForm";
import ExpenceForm from "./components/ExpenceForm";
import TargetForSaving from "./components/TargetForSaving";
import TransferForSaving from "./components/TransferForSaving";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import Counter from "./components/Counter";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="container ">
        {/* <Counter /> */}
        <div className="column">
          <IncomeForm />
        </div>
        <div className="column">
          <ExpenceForm />
        </div>
        <div className="column">
          <TargetForSaving />
        </div>
        <div className="container-under">
          <TransferForSaving />
        </div>
      </div>
    </>
  );
}

export default App;
