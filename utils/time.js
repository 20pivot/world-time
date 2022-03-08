const getTimezoneOffset = (timeZone, date = new Date()) => {
  const tz = date.toLocaleString("en", {timeZone, timeStyle: "long"}).split(" ").slice(-1)[0];
  const dateString = date.toString();
  const offset = Date.parse(`${dateString} UTC`) - Date.parse(`${dateString} ${tz}`);

  return offset / 3600000;
}

const getHH_MM = (time) => time.slice(0, 5)