import React, { ChangeEvent, FormEvent, useState } from "react";

type TransferForSavingProps = {
  onGetSavingAmount: (amount: number) => void;
  totalIncomeAmount: number;
  totalExpenceAmount: number;
};

const TransferForSaving = (props: TransferForSavingProps) => {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAmount(Number(value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onGetSavingAmount(amount);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <p>
            Current Balance:{" "}
            {props.totalIncomeAmount + props.totalExpenceAmount}
          </p>
        </div>
        <div className="form-field">
          <p>Tranfer For saving Account</p>
          <input
            type="text"
            name="amount"
            id="amount"
            onChange={handleAmountChange}
            required
          />

          <button type="submit">Trans</button>
        </div>
      </form>
    </div>
  );
};

export default TransferForSaving;
