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

function convertBrasilianDateToInputDate(date) {

  return date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2);

}

function convertDateToInputDate(date) {
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

  return year + '-' + month + '-' + day;
}