const TransferForSaving = () => {
  return (
    <div>
      <form action="">
        <div className="form-field">
          <p>Current Balance: 0</p>
        </div>
        <div className="form-field">
          <p>Tranfer For saving Account</p>
          <input type="text" name="amount" id="amount" required />

          <button type="submit">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default TransferForSaving;
