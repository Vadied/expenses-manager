import ExpensesOutput from "../components/expenses/ExpensesOutput";
import useExpenses from "../store/expenseContenxt";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const { expenses } = useExpenses();
  const today = new Date();
  const week = getDateMinusDays(today, 7);
  const filtered = expenses.filter((e) => e.date > week && e.date <= today);
  return <ExpensesOutput expenses={filtered} period="7 days" />;
};

export default RecentExpenses;
