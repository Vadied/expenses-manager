import { ExpenseContextProvider } from "../../store/expenseContenxt";

const Context = ({ children }) => {
  return <ExpenseContextProvider>{children}</ExpenseContextProvider>;
};

export default Context;