import { AuthContextProvider } from "../../store/authContenxt";
import { ExpenseContextProvider } from "../../store/expenseContenxt";

const Context = ({ children }) => {
  return (
    <AuthContextProvider>
      <ExpenseContextProvider>{children}</ExpenseContextProvider>
    </AuthContextProvider>
  );
};

export default Context;
