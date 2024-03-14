import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  } = useForm<IncomeType>();
  // const [income, setIncome] = useState<IncomeType>({
  //   source: "",
  //   amount: 0,
  //   date: "",
  // });

  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  const totalAmount = incomes.reduce((total, currentValue) => {
    // console.log("Current Value:", currentValue.amount);
    return total + Number(currentValue.amount);
  }, 0);

  useEffect(() => {
    props.onGeTotalIncomeAmount(totalAmount);
  }, [incomes, totalAmount, props]);

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setIncome((prevIncome) => {
  //     return { ...prevIncome, [event.target.name]: event.target.value };
  //   });
  // };

  const IncomeSubmit: SubmitHandler<IncomeType> = (data) => {
    // event.preventDefault();

    if (data.amount < 0) {
      toastError("Amount cannot be negative");
      return;
    }
    if (data.source && data.amount && data.date) {
      const newIncome = { id: uuidv4(), ...data };

      // console.log(newIncome);

      //push the income
      setIncomes((prevIncomes) => [...prevIncomes, newIncome]);

      toastSucess("Income is added successfully");
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
    <div>
      <form onSubmit={handleSubmit(IncomeSubmit)}>
        <div className="form-field">
          <label htmlFor="source">Income Source </label>
          <br />

          <input
            type="text"
            id="source"
            placeholder="Salary"
            {...register("source", {
              required: "salary is required",
            })}
          />
          {errors.source && <span>{errors.source.message}</span>}
          {/* {sourceError && <p className="error">{sourceError}</p>} */}
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount of Income</label> <br />
          <input
            type="number"
            id="amount"
            {...register("amount", {
              required: "amount is required",
            })}
          />
          {errors.amount && <span>{errors.amount.message}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="date">Date of Income</label> <br />
          <input
            type="date"
            id="date"
            {...register("date", {
              required: "date is required",
            })}
          />
          {errors.date && <span>{errors.date.message}</span>}
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
                <button type="button" onClick={() => deleteIncome(income.id)}>
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
  );
};

export default IncomeForm;
