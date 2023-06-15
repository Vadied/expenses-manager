import ExpensesOutput from "../components/expenses/ExpensesOutput";
import Loading from "../components/ui/Loading";
import useExpenses from "../store/expenseContenxt";

const RecentExpenses = () => {
  const { expenses, loading } = useExpenses();

  if (loading) return <Loading />;

  return (
    <ExpensesOutput
      expenses={expenses}
      period="All time"
      fallbackText="No expenses registered"
    />
  );
};

export default RecentExpenses;
