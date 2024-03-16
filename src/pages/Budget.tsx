import React, { useCallback, useState } from "react";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ExpenceForm from "../components/ExpenceForm";
import IncomeForm from "../components/IncomeForm";
import TargetForSaving from "../components/TargetForSaving";
import TransferForSaving from "../components/TransferForSaving";

const Budget = () => {
  const [savingAmount, setSavingAmount] = useState(0);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenceAmount, setTotalExpenceAmount] = useState(0);

  const getSavingAmount = useCallback((amount: number) => {
    setSavingAmount(amount);
  }, []);

  const getTotalIncomeAmount = useCallback((amount: number) => {
    setTotalIncomeAmount(amount);
  }, []);

  const getTotalExpenceAmount = useCallback((amount: number) => {
    setTotalExpenceAmount(amount);
  }, []);

  return (
    <div>
      <ToastContainer />

      <IncomeForm onGeTotalIncomeAmount={getTotalIncomeAmount} />

      <ExpenceForm
        onGeTotalIExponseAmount={getTotalExpenceAmount}
        totalIncomeAmount={totalIncomeAmount}
      />

      <TargetForSaving savingAmount={savingAmount} />

      <TransferForSaving
        onGetSavingAmount={getSavingAmount}
        totalIncomeAmount={totalIncomeAmount}
        totalExpenceAmount={totalExpenceAmount}
      />
    </div>
  );
};

export default Budget;
