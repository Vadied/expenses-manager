import axios from "axios";
import { FIREBASE_URL } from "../constants/http";

export const addExpense = async (token, data) => {
  const result = await axios.post(
    `${FIREBASE_URL}/expenses.json?auth=${token}`,
    data
  );
  return result.data.name;
};

export const fetchExpenses = async (token) => {
  const result = await axios.get(`${FIREBASE_URL}/expenses.json?auth=${token}`);
  return Object.entries(result.data)
    .map(([id, value]) => ({
      ...value,
      id,
      date: new Date(value.date),
    }))
    .reverse();
};

export const updateExpense = async (token, id, data) =>
  axios.put(`${FIREBASE_URL}/expenses/${id}.json?auth=${token}`, data);

export const deleteExpense = async (token, id) =>
  axios.delete(`${FIREBASE_URL}/expenses/${id}.json?auth=${token}`);
