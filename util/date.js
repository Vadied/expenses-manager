export const getFormattedDate = (date) =>
  new Date(date)?.toISOString().slice(0, 10) || "";

export const getDateMinusDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

export const isDate = (date) => {
  console.log("data --->", date)
  const stringData = new Date(date).toString();
  return stringData !== "Invalid Date";
};
