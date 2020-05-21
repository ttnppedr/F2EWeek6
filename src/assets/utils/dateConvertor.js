
export const calculateDays = (start ,num) => {
  const date = new Date(start);
  const TIMESTAMP = 86400000;
  const sum = date.getTime() + TIMESTAMP * num;
  return new Date(sum);
}

export const calculatePeriodOfDays = (start, end) => {
  const TIMESTAMP = 86400000;
  const STARTTIMESTAMP = new Date(start).getTime();
  const ENDTIMESTAMP = new Date(end).getTime();
  const arr = [];
  for (let i = STARTTIMESTAMP; i < ENDTIMESTAMP; i += TIMESTAMP) {
    let date = formateDate(new Date(i));
    arr.push(date);
  }
  return arr;
}

export const periodOfDays = (firstDay, secondDay) => {
  const TIMESTAMP = 86400000;
  const firstTimestamp = new Date(firstDay).getTime();
  const secondTimestamp = new Date(secondDay).getTime();
  const period = (secondTimestamp - firstTimestamp) / TIMESTAMP;
  return period;
}

