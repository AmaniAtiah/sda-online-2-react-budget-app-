import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toastSucess, toastError } from "../helper";
import { SubmitHandler, useForm } from "react-hook-form";

type IncomeType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

type IncomeFormProps = {
  onGeTotalIncomeAmount: (amount: number) => void;
};

const IncomeForm = (props: IncomeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IncomeType>();

  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  const totalAmount = incomes.reduce((total, currentValue) => {
    return total + Number(currentValue.amount);
  }, 0);

  useEffect(() => {
    props.onGeTotalIncomeAmount(totalAmount);
  }, [incomes, totalAmount, props]);

  const IncomeSubmit: SubmitHandler<IncomeType> = (data) => {
    if (data.source && data.amount && data.date) {
      const newIncome = { id: uuidv4(), ...data };

      setIncomes((prevIncomes) => [...prevIncomes, newIncome]);

      toastSucess("Income is added successfully");
      reset();
      console.log("Updated Incomes:", incomes);
    } else {
      toastError("Please fill all the fields");
    }
  };

  const deleteIncome = (id: string | undefined) => {
    return setIncomes((prevIncomes) =>
      prevIncomes.filter((income) => income.id !== id)
    );
  };

  return (
    <div className="income_container">
      <div className="form_container">
        <form onSubmit={handleSubmit(IncomeSubmit)}>
          <div className="form-field">
            <label htmlFor="source">Income Source </label>

            <input
              type="text"
              id="income_source"
              placeholder="Salary"
              {...register("source", {
                required: "salary is required",
              })}
            />
            {errors.source && (
              <span className="error">{errors.source.message}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="amount">Amount of Income</label>
            <input
              type="number"
              id="incpme_amount"
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
          </div>
          <div className="form-field">
            <label htmlFor="date">Date of Income</label>
            <input
              type="date"
              id="income_date"
              {...register("date", {
                required: "date is required",
              })}
            />
            {errors.date && (
              <span className="error">{errors.date.message}</span>
            )}
          </div>
          <div className="form-field">
            <button className="income_btn" type="submit">
              Add Income
            </button>
          </div>
        </form>
      </div>

      <div className="income_list">
        <p>Income List</p>
        {incomes.length > 0 ? (
          <ul>
            {incomes.map((income) => {
              return (
                <li key={income.id}>
                  <p> {income.source}</p>
                  <p> {income.amount}</p>
                  <p> {income.date}</p>

                  <button
                    className="delete_btn"
                    type="button"
                    onClick={() => deleteIncome(income.id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No Income sources</p>
        )}
      </div>
    </div>
  );
};

export default IncomeForm;
