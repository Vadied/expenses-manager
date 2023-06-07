import ExpensesOutput from "../components/ExpensesOutput";
import { DUMMY_EXPS } from "../constants/dummy";

const AllExpenses = () => {
  return <ExpensesOutput expenses={DUMMY_EXPS} period="7 days" />;
};

export default AllExpenses;
