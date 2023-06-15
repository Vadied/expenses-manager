import { createContext, useContext, useState } from "react";
import { DUMMY_EXPS } from "../constants/dummy";

const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

export const ExpenseContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(DUMMY_EXPS);

  const addExpense = ({ description, amount, date }) => {
    const id = `Ex_${expenses.length}`;
    setExpenses((es) => [{ id, description, amount, date }, ...es]);
  };

  const deleteExpense = (id) => {
    setExpenses((es) => es.filter((e) => e.id !== id));
  };

  const updateExpense = (expense) => {
    setExpenses((es) => es.map((e) => (e.id !== expense.id ? e : expense)));
  };

  const value = { expenses, addExpense, deleteExpense, updateExpense };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

const useExpenses = () => useContext(ExpenseContext);

export default useExpenses;
