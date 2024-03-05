import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toastSucess, toastError } from "../helper";

type ExpenceType = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

const ExpenceForm = () => {
  const [source, setSource] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [expences, setExpences] = useState<ExpenceType[]>([]);

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
      const expence = {
        id: uuidv4(),
        source: source,
        amount: amount,
        date: date,
      };
      //push the income
      setExpences((prevExpences) => [...prevExpences, expence]);
      toastSucess("Expence is added successfully");
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
          <label htmlFor="source">Expence Source </label>
          <br />

          <input
            type="text"
            name="source"
            id="source"
            placeholder="Elecricity Bill"
            value={source}
            onChange={handleSourceChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount of Expence</label> <br />
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
          <label htmlFor="date">Date of Expence</label> <br />
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
          <button type="submit">Add Expence</button>
        </div>
      </form>

      <ul>
        {expences.length > 0 ? (
          expences.map((expence) => {
            return (
              <li key={expence.id}>
                {expence.source} {expence.amount} {expence.date}
              </li>
            );
          })
        ) : (
          <p>No Expence sources</p>
        )}
      </ul>
    </div>
  );
};

export default ExpenceForm;
