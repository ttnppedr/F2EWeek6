
export const calculateDays = (start ,num) => {
  const date = new Date(start);
  const TIMESTAMP = 86400000;
  const sum = date.getTime() + TIMESTAMP * num;
  return new Date(sum);
}

export const periodOfDays = (firstDay, secondDay) => {
  const TIMESTAMP = 86400000;
  const firstTimestamp = new Date(firstDay).getTime();
  const secondTimestamp = new Date(secondDay).getTime();
  const period = (secondTimestamp - firstTimestamp) / TIMESTAMP;
  return period;
}

