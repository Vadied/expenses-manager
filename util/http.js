import axios from "axios";
import { FIREBASE_URL } from "../constants/http";

export const addExpense = async (data) => {
  const result = await axios.post(`${FIREBASE_URL}/expenses.json`, data);
  return result.data.name;
};

export const fetchExpenses = async () => {
  const result = await axios.get(`${FIREBASE_URL}/expenses.json`);
  return Object.entries(result.data)
    .map(([id, value]) => ({
      ...value,
      id,
      date: new Date(value.date),
    }))
    .reverse();
};

export const updateExpense = async (id, data) =>
  axios.put(`${FIREBASE_URL}/expenses/${id}.json`, data);

export const deleteExpense = async (id) =>
  axios.delete(`${FIREBASE_URL}/expenses/${id}.json`);
