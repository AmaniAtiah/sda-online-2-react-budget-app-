import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useEffect,
  useState,
} from "react";
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
  totalIncomeAmount: number;
};

const ExpenceForm = (props: ExpenseFormProps) => {
  const [expence, setExpence] = useState<ExpenceType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [expences, setExpences] = useState<ExpenceType[]>([]);

  const totalAmount = expences.reduce(
    (total, currentValue) => total + Number(currentValue.amount),
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

  console.log("total amount expence: " + totalAmount);
  console.log("total amount income" + props.totalIncomeAmount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (expence.source && expence.amount && expence.date) {
      if (totalAmount + expence.amount <= props.totalIncomeAmount) {
        // If totalAmount is less than totalIncomeAmount, add the expense
        const newExpense = { id: uuidv4(), ...expence };

        console.log(newExpense);

        // Push the expense
        setExpences((prevExpenses) => [...prevExpenses, newExpense]);

        toastSucess("Expense is added successfully");
      } else {
        // If totalAmount is equal to or greater than totalIncomeAmount, show an error message
        toastError("Insufficient balance");
      }

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

  const deleteExpence = (id: string | undefined) => {
    return setExpences((prevExpence) =>
      prevExpence.filter((expence) => expence.id !== id)
    );
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
