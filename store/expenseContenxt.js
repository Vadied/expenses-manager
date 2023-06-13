import { createContext, useContext, useState } from "react";
import { DUMMY_EXPS } from "../constants/dummy";

const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amunt, date }) => {},
});

export const ExpenseContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(DUMMY_EXPS);
  console.log(expenses)

  const addExpense = ({ description, amount, date }) => {
    const id = `Es_${expenses.length}`;
    setExpenses((es) => [{ id, description, amount, date }, ...es]);
  };

  const deleteExpense = (id) => {
    setExpenses((es) => es.filter((e) => e.id !== id));
  };

  const updateExpense = (id, { description, amunt, date }) => {
    setExpenses((es) =>
      es.map((e) => (e.id !== id ? e : { ...e, description, amunt, date }))
    );
  };

  const value = { expenses, addExpense, deleteExpense, updateExpense };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

const useExpenses = () => useContext(ExpenseContext);

export default useExpenses;
