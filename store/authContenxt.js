import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createUser, signIn } from "../util/auth";

const AuthContext = createContext({
  user: null,
  token: "",
  authenticate: async (token) => {},
  login: async (data) => {},
  logout: async () => {},
  signup: async (data) => {},
  loading: false,
});

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const authenticate = (token) => {
    setToken(token);
    AsyncStorage.setItem("Exp_Token", token || "");
  };

  const login = async ({ email, password }) => {
    console.log("login")
    setLoading(true);
    try {
      const user = await signIn({ email, password });
      setUser(user || null);
      authenticate(user?.idToken || "");
    } catch (error) {
      Alert.alert("Error during login", error.message);
      setLoading(false);
    }
  };

  const signup = async (data) => {
    console.log("signup")
    setLoading(true);
    try {
      const user = await createUser(data);
      setUser(user);
      authenticate(user?.idToken || "");
    } catch (error) {
      Alert.alert("Error signing up", error.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken("");
    await AsyncStorage.removeItem("Exp_token")
    setLoading(false)
  };

  const value = {
    user,
    token,
    authenticate,
    login,
    logout,
    signup,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
