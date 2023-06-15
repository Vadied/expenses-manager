import { FlatList } from "react-native";

import ExpensesListItem from "./ExpensesListItem";

const renderitem = ({ item }) => {
  return <ExpensesListItem {...item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderitem}
      keyExtractor={(item, i) => i}
    />
  );
};

export default ExpensesList;
