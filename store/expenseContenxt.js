import { createContext, useContext, useEffect, useState } from "react";

import {
  deleteExpense,
  fetchExpenses,
  addExpense,
  updateExpense,
} from "../util/http";

const ExpenseContext = createContext({
  expenses: [],
  getAll: async () => {},
  addExpense: async (data) => {},
  deleteExpense: async (id) => {},
  updateExpense: async (id, data) => {},
  loading: false,
  error: "",
  clearError: () => {},
});

export const ExpenseContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);

  const getAll = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await fetchExpenses();
      setExpenses(data || []);
    } catch (error) {
      setExpenses([]);
      setError("Error fetching all data");
    } finally {
      setLoading(false);
    }
  };

  const add = async (newExpense) => {
    setError("");
    setLoading(true);
    try {
      const id = await addExpense(newExpense);
      setExpenses((es) => [{ ...newExpense, id }, ...es]);
    } catch (error) {
      setError("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setError("");
    setLoading(true);
    try {
      await deleteExpense(id);
      setExpenses((es) => es.filter((e) => e.id !== id));
    } catch (error) {
      setError("Error deleting data");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, expense) => {
    setError("");
    setLoading(true);
    try {
      await updateExpense(id, expense);
      setExpenses((es) => es.map((e) => (e.id !== id ? e : expense)));
    } catch (error) {
      setError("Error updating data");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  useEffect(() => {
    getAll();
  }, []);

  const value = {
    expenses,
    add,
    deleteData,
    update,
    loading,
    error,
    clearError,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

const useExpenses = () => useContext(ExpenseContext);

export default useExpenses;
