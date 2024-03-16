import React, { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toastSucess, toastError } from "../helper";
import { SubmitHandler, useForm } from "react-hook-form";

type ExpenceType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

type ExpenseFormProps = {
  onGeTotalIExponseAmount: (amount: number) => void;
  totalIncomeAmount: number;
};

const ExpenceForm = (props: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenceType>();
  const [expences, setExpences] = useState<ExpenceType[]>([]);

  const totalAmount = expences.reduce(
    (total, currentValue) => total + Number(currentValue.amount),
    0
  );

  useEffect(() => {
    props.onGeTotalIExponseAmount(totalAmount);
  }, [expences, totalAmount, props]);

  const expenceSubmit: SubmitHandler<ExpenceType> = (data) => {
    if (data.amount < 0) {
      toastError("Expence cannot be negative");
      return;
    }

    if (data.source && data.amount && data.date) {
      if (totalAmount + data.amount <= props.totalIncomeAmount) {
        const newExpense = { id: uuidv4(), ...data };
        setExpences((prevExpenses) => [...prevExpenses, newExpense]);

        toastSucess("Expense is added successfully");
        reset();
      } else {
        toastError("Insufficient balance");
      }
    } else {
      toastError("Please fill all the fields");
    }
  };

  const deleteExpence = (id: string | undefined) => {
    return setExpences((prevExpence) =>
      prevExpence.filter((expence) => expence.id !== id)
    );
  };
  return (
    <div className="expence_container">
      <div className="form_container">
        <form onSubmit={handleSubmit(expenceSubmit)}>
          <div className="form-field">
            <label htmlFor="source">Expence Source </label>
            <br />

            <input
              type="text"
              id="expence_source"
              placeholder="Elecricity Bill"
              {...register("source", {
                required: "Elecricity Bill is required",
              })}
            />
            {errors.source && (
              <span className="error">{errors.source.message}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="amount">Amount of Expence</label> <br />
            <input
              type="number"
              id="expence_amount"
              {...register("amount", {
                required: "Amount  is required",
                min: {
                  value: 0,
                  message: "Amount cannot be negative",
                },
              })}
            />
            {errors.amount && (
              <span className="error">{errors.amount.message}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="date">Date of Expence</label> <br />
            <input
              type="date"
              id="expence_date"
              {...register("date", {
                required: "date  is required",
              })}
            />
            {errors.date && (
              <span className="error">{errors.date.message}</span>
            )}
          </div>
          <div className="form-field">
            <button className="expence_btn" type="submit">
              Add Expence
            </button>
          </div>
        </form>
      </div>

      <div className="expence_list">
        <p>Expence List</p>
        {expences.length > 0 ? (
          <ul>
            {expences.map((expence) => {
              return (
                <li key={expence.id}>
                  <p> {expence.source}</p>
                  <p> {expence.amount}</p>
                  <p> {expence.date}</p>

                  <button
                    className="delete_btn"
                    type="button"
                    onClick={() => deleteExpence(expence.id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No Expence sources</p>
        )}
      </div>
    </div>
  );
};

export default ExpenceForm;
