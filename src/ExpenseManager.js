import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Images/Expenses.jpg';

function ExpenseManager() {
  const [fixedIncome, setFixedIncome] = useState('');
  const [variableIncome, setVariableIncome] = useState(0);
  const [expenses, setExpenses] = useState({
    "Home EMI": '',
    "Rent": '',
    "Tuition / School": '',
    "Home Expense": '',
    "Medical Expense": '',
    "Insurance": '',
    "Investments": '',
    "Emergency Savings": ''
  });
  const [expenseSummary, setExpenseSummary] = useState({});
  const [remainingAmount, setRemainingAmount] = useState(0);

  const handleCalculateExpense = () => {
    let totalExpenses = 0;
    for (const expense in expenses) {
      totalExpenses += parseFloat(expenses[expense]) || 0;
    }

    const totalIncome = parseFloat(fixedIncome) + parseFloat(variableIncome);
    const remaining = totalIncome - totalExpenses;

    setExpenseSummary(expenses);
    setRemainingAmount(remaining);
  };

  const isCalculateDisabled = () => {
    return fixedIncome.trim() === '';
  };

  return (
    <div className="container mt-5">
      {/* <h1 className="text-center mb-4">$ Expense Manager $</h1> */}
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" height="200" />
        <h1>Expense Manager</h1>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Fixed Income"
            value={fixedIncome}
            onChange={(e) => setFixedIncome(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Variable Income (Optional)"
            value={variableIncome === 0 ? '' : variableIncome}
            onChange={(e) => setVariableIncome(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary btn-block"
            onClick={handleCalculateExpense}
            disabled={isCalculateDisabled()}
          >
            Calculate Expense
          </button>
        </div>
      </div>
      {Object.keys(expenses).map((expense, index) => (
        <div className="row mb-3" key={index}>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder={expense}
              value={expenses[expense]}
              onChange={(e) =>
                setExpenses({ ...expenses, [expense]: e.target.value })
              }
            />
          </div>
        </div>
      ))}
      {Object.keys(expenseSummary).length > 0 && (
        <div className="row mt-5">
          <div className="col">
            <h3 className="text-center">Expense Summary</h3>
            <ul className="list-group">
              {Object.keys(expenseSummary).map((expense, index) => (
                <li className="list-group-item" key={index}>
                  <span className="font-weight-bold">{expense}:</span> {expenseSummary[expense]}
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h3 className="text-center">Remaining Amount</h3>
            <p className="text-center">{remainingAmount}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseManager;
