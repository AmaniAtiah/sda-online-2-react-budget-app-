import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useEffect,
  useState,
} from "react";
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
  } = useForm<ExpenceType>();
  const [expences, setExpences] = useState<ExpenceType[]>([]);

  const totalAmount = expences.reduce(
    (total, currentValue) => total + Number(currentValue.amount),
    0
  );

  useEffect(() => {
    props.onGeTotalIExponseAmount(totalAmount);
  }, [expences, totalAmount, props]);

  // console.log("total amount expence: " + totalAmount);
  // console.log("total amount income" + props.totalIncomeAmount);

  const expenceSubmit: SubmitHandler<ExpenceType> = (data) => {
    // event.preventDefault();

    if (data.amount < 0) {
      toastError("Expence cannot be negative");
      return;
    }

    if (data.source && data.amount && data.date) {
      if (totalAmount + data.amount <= props.totalIncomeAmount) {
        // If totalAmount is less than totalIncomeAmount, add the expense
        const newExpense = { id: uuidv4(), ...data };

        // console.log(newExpense);

        // Push the expense
        setExpences((prevExpenses) => [...prevExpenses, newExpense]);

        toastSucess("Expense is added successfully");
      } else {
        // If totalAmount is equal to or greater than totalIncomeAmount, show an error message
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
    <div>
      <form onSubmit={handleSubmit(expenceSubmit)}>
        <div className="form-field">
          <label htmlFor="source">Expence Source </label>
          <br />

          <input
            type="text"
            id="source"
            placeholder="Elecricity Bill"
            {...register("source", {
              required: "Elecricity Bill is required",
            })}
          />
          {errors.source && <span>{errors.source.message}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount of Expence</label> <br />
          <input
            type="number"
            id="amount"
            {...register("amount", {
              required: "Amount  is required",
            })}
          />
          {errors.amount && <span>{errors.amount.message}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="date">Date of Expence</label> <br />
          <input
            type="date"
            id="date"
            {...register("date", {
              required: "date  is required",
            })}
          />
          {errors.date && <span>{errors.date.message}</span>}
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
                <button type="button" onClick={() => deleteExpence(expence.id)}>
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
  );
};

export default memo(ExpenceForm);
