import useExpenses from "../store/expenseContenxt";
import { getDateMinusDays, getFormattedDate } from "../util/date";

import ExpensesOutput from "../components/expenses/ExpensesOutput";
import Loading from "../components/ui/Loading";

const RecentExpenses = () => {
  const { expenses, loading } = useExpenses();
  if (loading) return <Loading />;

  const today = new Date();
  const week = getDateMinusDays(today, 7);
  const filtered = expenses.filter(
    (e) =>
      getFormattedDate(e.date) > getFormattedDate(week) &&
      getFormattedDate(e.date) <= getFormattedDate(today)
  );

  return (
    <ExpensesOutput
      expenses={filtered}
      period="7 days"
      fallbackText="No expenses registered"
    />
  );
};

export default RecentExpenses;
