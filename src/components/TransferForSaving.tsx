import { log } from "console";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

type TransferForSavingProps = {
  onGetSavingAmount: (amount: number) => void;
  totalIncomeAmount: number;
  totalExpenceAmount: number;
};

const TransferForSaving = (props: TransferForSavingProps) => {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setAmount(Number(value));
  };

  useEffect(() => {
    const calculatedBalance =
      props.totalIncomeAmount - props.totalExpenceAmount - totalSavings;
    setBalance(calculatedBalance);
  }, [amount, props.totalIncomeAmount, props.totalExpenceAmount]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const remainingBalance = balance - amount;
    if (remainingBalance >= 0) {
      setTotalSavings((prevTotal) => prevTotal + amount);

      setAmount(0);

      setBalance(remainingBalance);

      props.onGetSavingAmount(totalSavings + amount);
    } else {
      console.log("Insufficient balance for the transfer");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <p>Current Balance: {balance}</p>
        </div>
        <div className="form-field">
          <p>Tranfer For saving Account</p>
          <input
            type="text"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />

          <button type="submit">Transfer</button>
        </div>
      </form>
    </div>
  );
};

export default TransferForSaving;
