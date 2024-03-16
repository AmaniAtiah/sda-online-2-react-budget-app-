import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/budget-app");
  };
  return (
    <div className="budget_container">
      <p>Budget App</p>
      <button type="button" onClick={handleClick} className="budget_btn">
        Budget
      </button>
    </div>
  );
};

export default Home;
