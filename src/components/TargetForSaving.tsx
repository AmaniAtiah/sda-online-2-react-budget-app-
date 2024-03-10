import React, { ChangeEvent, FormEvent, useState } from "react";

React;
const TargetForSaving = (props: { savingAmount: number }) => {
  console.log(props.savingAmount);

  const [target, setTarget] = useState(0);

  const handleTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTarget(Number(value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setTarget(0);
  };

  const calculateSavingPercentage = () => {
    if (target >= props.savingAmount) {
      return target !== 0 ? (props.savingAmount / target) * 100 : 0;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="source">Set Target </label>
          <br />

          <input
            type="number"
            name="target"
            id="target"
            value={target}
            onChange={handleTargetChange}
            required
          />
        </div>
        <div className="form-field">
          <button type="submit">Reset</button>
        </div>
      </form>

      <p className="target">Current Saving: {props.savingAmount}</p>
      <p className="target">Target: {target}</p>
      <div>
        <p>progress: {calculateSavingPercentage()}%</p>
        {/* Progress bar */}
        <progress max="100" value={calculateSavingPercentage()}></progress>
      </div>
    </div>
  );
};

export default TargetForSaving;
