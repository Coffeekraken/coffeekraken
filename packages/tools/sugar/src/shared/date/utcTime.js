function utcTime(hours = true, minutes = true, seconds = true) {
  const timeAr = [];
  const date = new Date();
  if (hours)
    timeAr.push(date.getHours());
  if (minutes)
    timeAr.push(date.getMinutes());
  if (seconds)
    timeAr.push(date.getSeconds());
  return timeAr.join(":");
}
export {
  utcTime as default
};
