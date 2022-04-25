function convertTimeToSeconds(time) {

  const [hours, minutes, seconds] = time.split(':').map(Number);
  const timeInSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
  return timeInSeconds;

};

function convertSecondsToHoursMinutesSeconds(seconds) {

  let hours = Math.floor(seconds / 3600);
  if (hours < 10) hours = '0' + hours
  seconds = seconds % 3600;
  let minutes = Math.floor(seconds / 60);
  if (minutes < 10) minutes = '0' + minutes
  seconds = seconds % 60;
  if (seconds < 10) seconds = '0' + seconds

  return hours + ':' + minutes + ':' + seconds

}