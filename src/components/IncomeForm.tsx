import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toastSucess, toastError } from "../helper";

type IncomeType = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

type IncomeFormProps = {
  onGeTotalIncomeAmount: (amount: number) => void;
};
const IncomeForm = (props: IncomeFormProps) => {
  const [source, setSource] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  const totalAmount = incomes.reduce(
    (total, currentValue) => total + currentValue.amount,
    0
  );
  props.onGeTotalIncomeAmount(totalAmount);
  // console.log(totalAmount);

  const handleSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSource(value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAmount(Number(value));
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDate(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (source && amount && date) {
      const income = {
        id: uuidv4(),
        source: source,
        amount: amount,
        date: date,
      };

      //push the income
      setIncomes((prevIncomes) => [...prevIncomes, income]);

      toastSucess("Income is added successfully");

      setSource("");
      setAmount(0);
      setDate("");
    } else {
      toastError("Please fill all the fields");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="source">Income Source </label>
          <br />

          <input
            type="text"
            name="source"
            id="source"
            placeholder="Salary"
            value={source}
            onChange={handleSourceChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount of Income</label> <br />
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="date">Date of Income</label> <br />
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="form-field">
          <button type="submit">Add Income</button>
        </div>
      </form>

      {/* {console.log(incomes)} */}
      {incomes.length > 0 ? (
        <ul>
          {incomes.map((income) => {
            return (
              <li key={income.id}>
                {income.source} {income.amount} {income.date}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No Income sources</p>
      )}
    </div>
  );
};

export default IncomeForm;
