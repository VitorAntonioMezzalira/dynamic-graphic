function convertDateToDayMonthYear(date) {

  date = new Date(date);

  let day = date.getDate();
  if (day < 10) {
    day = '0' + String(day);
  };

  let month = date.getMonth();
  if (month < 10) {
    month = '0' + String(month);
  };
  
  let year = date.getFullYear();

  return day + '/' + month + '/' + year;

};