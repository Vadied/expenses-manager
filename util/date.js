export const getFormattedDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const getDateMinusDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
