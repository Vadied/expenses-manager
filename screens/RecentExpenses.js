import ExpensesOutput from "../components/ExpensesOutput";
import { DUMMY_EXPS } from "../constants/dummy";

const RecentExpenses = () => {
  return <ExpensesOutput expenses={DUMMY_EXPS} period="7 days" />;
};

export default RecentExpenses;
