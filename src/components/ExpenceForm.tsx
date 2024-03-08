import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toastSucess, toastError } from "../helper";

type ExpenceType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

type ExpenseFormProps = {
  onGeTotalIExponseAmount: (amount: number) => void;
};

const ExpenceForm = (props: ExpenseFormProps) => {
  const [expence, setExpence] = useState<ExpenceType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [expences, setExpences] = useState<ExpenceType[]>([]);

  const totalAmount = expences.reduce(
    (total, currentValue) => total + currentValue.amount,
    0
  );

  useEffect(() => {
    props.onGeTotalIExponseAmount(totalAmount);
  }, [expences, totalAmount, props]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpence((prevExpence) => {
      return { ...prevExpence, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (expence.source && expence.amount && expence.date) {
      const newExpence = { id: uuidv4(), ...expence };

      console.log(newExpence);

      //push the income
      setExpences((prevExpences) => [...prevExpences, newExpence]);

      toastSucess("Expence is added successfully");
      setExpence({
        //   id: "",
        source: "",
        amount: 0,
        date: "",
      });
    } else {
      toastError("Please fill all the fields");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="source">Expence Source </label>
          <br />

          <input
            type="text"
            name="source"
            id="source"
            placeholder="Elecricity Bill"
            value={expence.source}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount of Expence</label> <br />
          <input
            type="number"
            name="amount"
            id="amount"
            value={expence.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="date">Date of Expence</label> <br />
          <input
            type="date"
            name="date"
            id="date"
            value={expence.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <button type="submit">Add Expence</button>
        </div>
      </form>

      {expences.length > 0 ? (
        <ul>
          {expences.map((expence) => {
            return (
              <li key={expence.id}>
                {expence.source} {expence.amount} {expence.date}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No Expence sources</p>
      )}
    </div>
  );
};

export default ExpenceForm;
