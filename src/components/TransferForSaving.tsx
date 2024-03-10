import { log } from "console";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

type TransferForSavingProps = {
  onGetSavingAmount: (amount: number) => void;
  totalIncomeAmount: number;
  totalExpenceAmount: number;
};

const TransferForSaving = (props: TransferForSavingProps) => {
  const [amount, setAmount] = useState(0);
  let [balance, setBalance] = useState(0);

  // const [balance, setBalance] = useState(0);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setAmount(Number(value));
  };

  const calculateBalance = () => {
    const calculatedBalance =
      props.totalIncomeAmount - props.totalExpenceAmount;
    setAmount((amount) => amount + calculatedBalance);

    // if (calculatedBalance < 0) {
    //   return props.totalIncomeAmount;
    // }
  };

  useEffect(() => {
    const calculatedBalance =
      props.totalIncomeAmount - props.totalExpenceAmount - amount;
    setBalance(calculatedBalance);
    // setAmount((amount) => amount + calculatedBalance);
  }, [amount, props.totalIncomeAmount, props.totalExpenceAmount]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    props.onGetSavingAmount(amount);
    setAmount(0);
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
