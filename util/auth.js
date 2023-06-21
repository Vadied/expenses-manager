import axios from "axios";
import { FIREBASE_AUTH, API_KEY } from "../constants/http";

const authenticate = async ({ mode, email, password }) => {
  const res = await axios.post(
    `${FIREBASE_AUTH}/accounts:${mode}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return res.data;
};

export const createUser = ({ email, password }) =>
  authenticate({ mode: "signUp", email, password });

export const signIn = ({ email, password }) =>
  authenticate({ mode: "signInWithPassword", email, password });
