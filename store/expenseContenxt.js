import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import {
  deleteExpense,
  fetchExpenses,
  addExpense,
  updateExpense,
} from "../util/http";
import useAuth from "./authContenxt";

const ExpenseContext = createContext({
  expenses: [],
  getAll: async () => {},
  addExpense: async (data) => {},
  deleteExpense: async (id) => {},
  updateExpense: async (id, data) => {},
  loading: false,
});

export const ExpenseContextProvider = ({ children }) => {
  const { token } = useAuth();

  console.log("token --->", token)

  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const getAll = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses(token);
      setExpenses(data || []);
    } catch (error) {
      setExpenses([]);
      Alert.alert("Error fetching all data", error.message);
    } finally {
      setLoading(false);
    }
  };

  const add = async (newExpense) => {
    setLoading(true);
    try {
      const id = await addExpense(token, newExpense);
      setExpenses((es) => [{ ...newExpense, id }, ...es]);
    } catch (error) {
      Alert.alert("Error saving data", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await deleteExpense(user.idToken, id);
      setExpenses((es) => es.filter((e) => e.id !== id));
    } catch (error) {
      Alert.alert("Error deleting all data", error.message);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, expense) => {
    setLoading(true);
    try {
      await updateExpense(token, id, expense);
      setExpenses((es) => es.map((e) => (e.id !== id ? e : expense)));
    } catch (error) {
      Alert.alert("Error updating all data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    getAll();
  }, []);

  const value = {
    expenses,
    add,
    deleteData,
    update,
    loading,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

const useExpenses = () => useContext(ExpenseContext);

export default useExpenses;
