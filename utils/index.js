import moment from 'moment';

const formatDatePart = (part) => {
  return ('0' + (part)).slice(-2);
};

function dateString() {
  const rDate = new Date();
  const year = rDate.getFullYear();
  const month = formatDatePart(rDate.getMonth() + 1);
  const day = formatDatePart(rDate.getDate());
  const hours = formatDatePart(rDate.getHours());
  const minutes = formatDatePart(rDate.getMinutes());
  const seconds = formatDatePart(rDate.getSeconds());
  const milliSeconds = formatDatePart(rDate.getMilliseconds());

  return `${year}${month}${day}_${hours}_${minutes}_${seconds}_${milliSeconds}`;
}

const randomNum = (start = 0, end = 1000) => {
  return Math.floor(Math.random() * end) + start;
};

const utcDate = () => {
  return moment.utc().format();
};

export { dateString, utcDate, randomNum };
