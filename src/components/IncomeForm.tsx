import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { toastSucess, toastError } from "../helper";

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
  const [income, setIncome] = useState<IncomeType>({
    source: "",
    amount: 0,
    date: "",
  });

  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  const totalAmount = incomes.reduce((total, currentValue) => {
    console.log("Current Value:", currentValue.amount);
    return total + Number(currentValue.amount);
  }, 0);

  useEffect(() => {
    props.onGeTotalIncomeAmount(totalAmount);
  }, [incomes, totalAmount, props]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIncome((prevIncome) => {
      return { ...prevIncome, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (income.source && income.amount && income.date) {
      const newIncome = { id: uuidv4(), ...income };

      console.log(newIncome);

      //push the income
      setIncomes((prevIncomes) => [...prevIncomes, newIncome]);

      toastSucess("Income is added successfully");
      setIncome({
        //   id: "",
        source: "",
        amount: 0,
        date: "",
      });
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
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="source">Income Source </label>
          <br />

          <input
            type="text"
            name="source"
            id="source"
            placeholder="Salary"
            value={income.source}
            onChange={handleChange}
            required
          />
          {/* {sourceError && <p className="error">{sourceError}</p>} */}
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount of Income</label> <br />
          <input
            type="number"
            name="amount"
            id="amount"
            value={income.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="date">Date of Income</label> <br />
          <input
            type="date"
            name="date"
            id="date"
            value={income.date}
            onChange={handleChange}
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

export default memo(IncomeForm);
