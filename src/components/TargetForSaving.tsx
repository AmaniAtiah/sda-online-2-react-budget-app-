import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const TargetForSaving = (props: { savingAmount: number }) => {
  console.log(props.savingAmount);

  const [target, setTarget] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (target !== 0) {
      if (target >= props.savingAmount) {
        setProgress((props.savingAmount / target) * 100);
      } else {
        setProgress(100);
      }
    } else {
      setProgress(0);
    }
  }, [target, props.savingAmount]);

  const handleTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (Number(value) >= 0) {
      setTarget(Number(value));
    } else {
      setTarget(0);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTarget(0);
  };

  return (
    <div className="target_container">
      <div className="form_target">
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
            <button className="target_btn" type="submit">
              Reset
            </button>
          </div>
        </form>

        <div className="progress_container">
          <p className="target">Current Saving: {props.savingAmount}</p>
          <p className="target">Target: {target}</p>
          <div>
            <p>progress: {progress}%</p>
            <progress max="100" value={progress}></progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetForSaving;
