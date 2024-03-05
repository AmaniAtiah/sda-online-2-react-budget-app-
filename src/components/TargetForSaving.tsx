const TargetForSaving = () => {
  return (
    <div>
      <form action="">
        <div className="form-field">
          <label htmlFor="source">Set Target </label>
          <br />

          <input type="number" name="amount" id="amount" required />
        </div>
        <div className="form-field">
          <button type="submit">Reset</button>
        </div>
      </form>

      <p className="target">Current Saving: 0</p>
      <p className="target">Target: 0</p>
      <p>
        <progress max={5000} value={1000} />
      </p>
    </div>
  );
};

export default TargetForSaving;
