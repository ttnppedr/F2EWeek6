
export const calculateDays = num => {
  const date = new Date();
  const TIMESTAMP = 86400000;
  const sum = date.getTime() + TIMESTAMP * num;
  return new Date(sum);
}