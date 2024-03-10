import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IncomeForm from "./components/IncomeForm";
import ExpenceForm from "./components/ExpenceForm";
import TargetForSaving from "./components/TargetForSaving";
import TransferForSaving from "./components/TransferForSaving";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [savingAmount, setSavingAmount] = useState(0);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenceAmount, setTotalExpenceAmount] = useState(0);

  const getSavingAmount = (amount: number) => {
    setSavingAmount(amount);
  };

  const getTotalIncomeAmount = (amount: number) => {
    setTotalIncomeAmount(amount);
  };
  // console.log(totalIncomeAmount);

  const getTotalExpenceAmount = (amount: number) => {
    setTotalExpenceAmount(amount);
  };

  return (
    <>
      <ToastContainer />
      <div className="container ">
        <div className="column">
          <IncomeForm onGeTotalIncomeAmount={getTotalIncomeAmount} />
        </div>
        <div className="column">
          <ExpenceForm
            onGeTotalIExponseAmount={getTotalExpenceAmount}
            totalIncomeAmount={totalIncomeAmount}
          />
        </div>
        <div className="column">
          <TargetForSaving savingAmount={savingAmount} />
        </div>
        <div className="container-under">
          <TransferForSaving
            onGetSavingAmount={getSavingAmount}
            totalIncomeAmount={totalIncomeAmount}
            totalExpenceAmount={totalExpenceAmount}
          />
        </div>
      </div>
    </>
  );
}

export default App;
