import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type TransferForSavingProps = {
  onGetSavingAmount: (amount: number) => void;
  totalIncomeAmount: number;
  totalExpenceAmount: number;
};

const TransferForSaving = (props: TransferForSavingProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [balance, setBalance] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const calculatedBalance =
      props.totalIncomeAmount - props.totalExpenceAmount - totalSavings;
    setBalance(calculatedBalance);
  }, [props.totalIncomeAmount, props.totalExpenceAmount, totalSavings]);

  const onSubmit = (data: any) => {
    const amount = Number(data.amount);

    const remainingBalance = balance - amount;
    if (remainingBalance >= 0) {
      setTotalSavings((prevTotal) => prevTotal + amount);
      setBalance(remainingBalance);
      props.onGetSavingAmount(totalSavings + amount);
      reset();
    } else {
      console.log("Insufficient balance for the transfer");
    }
  };

  return (
    <div className="tranfer_container">
      <div className="form_tranfer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <p>Current Balance: {balance}</p>
          </div>
          <div className="form-field">
            <p>Transfer For saving Account</p>
            <input
              type="number"
              id="amount"
              {...register("amount", {
                required: "amount is required",
                min: {
                  value: 0,
                  message: "Amount cannot be negative",
                },
              })}
            />
            {errors.amount && (
              <span className="error">{errors.amount.message}</span>
            )}

            <br />
            <button className="tranfer_btn" type="submit">
              Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferForSaving;
