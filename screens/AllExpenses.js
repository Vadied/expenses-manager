import ExpensesOutput from "../components/expenses/ExpensesOutput";

const AllExpenses = () => {
  return <ExpensesOutput period="7 days" fallbackText="No registered expenses found!"/>;
};

export default AllExpenses;
