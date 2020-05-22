import { 
  calculateDays,
  periodOfDays 
} from '@/assets/utils/dateConvertor.js';

export const calculatePrice = (holidayDayPrice, normalDayPrice) => {  
  return !(holidayDayPrice + normalDayPrice)
    ? 0
    : holidayDayPrice + normalDayPrice 
};

export const calculateRoomPrice = (dayType, cost, seleted) => {
  return seleted.reduce((total, day) => {
    let isSelectedNormal = dayType.some(selected => selected == day);
    if (!isSelectedNormal) return total;

    total += cost;
    return total;
  }, 0);
};
  
export const getSelectedDays = (start, end) => {
  const daysNumber = [];
  const week = ['日', '一', '二', '三', '四', '五', '六'];
  const period = periodOfDays(start, end);

  for (let i = 0; i < period; i++) {
    let periodTimestamps = calculateDays(start, i);
    daysNumber.push(new Date(periodTimestamps).getDay());
  }

  return daysNumber.map(num => week[num]);
}