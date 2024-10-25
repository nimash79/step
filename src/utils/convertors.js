import moment from "jalali-moment";

export const twoDigit = (value) => {
  value = value.toString();
  if (value.length === 1) return "0" + value;
  else return value;
};

export const e2p = (s) => {
  try {
    return s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  } catch (err) {
    return "";
  }
};
export const p2e = (s) => {
  try {
    return s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  } catch (err) {
    return "";
  }
};

export const secondsToTimer = (seconds) => {
  let minutes = twoDigit(parseInt(seconds / 60));
  seconds = twoDigit(seconds % 60);
  minutes = e2p(minutes);
  seconds = e2p(seconds);
  return `${minutes}':${seconds}"`;
};

export const secondsToTimer2 = (seconds) => {
  let minutes = twoDigit(parseInt(seconds / 60));
  let hours = twoDigit(parseInt(seconds / 3600));
  seconds = twoDigit(seconds % 60);
  minutes = twoDigit(minutes);
  seconds = twoDigit(seconds);
  hours = twoDigit(hours);
  return `${hours}:${minutes}:${seconds}`;
};

export const timerToSeconds = (timer) => {
  const units = timer.split(":");
  return (
    parseInt(units[0]) * 60 * 60 + parseInt(units[1]) * 60 + parseInt(units[2])
  );
};

export const convertTimeSpan = (time, withSeconds = true) => {
  const values = time.split(":");
  let result = `${e2p(values[0])}:${e2p(values[1])}'`;
  if (withSeconds) result += `:${e2p(values[2])}''`;
  return result;
};

export const secondsToLocaleString = (seconds) => {
  const hours = parseInt(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = parseInt(seconds / 60);
  return `${e2p(hours)} ساعت ${e2p(minutes)} دقیقه`;
}

export const miladiToPersian = (date) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("DD MMMM YYYY");
};

export const miladiToPersian2 = (date) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("dddd DD MMMM YYYY");
};

export const miladiToPersian3 = (date) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("YYYY-MM-DD");
};

export const miladiToPersian4 = (date) => {
  return moment(date, "YYYY-MM-DD HH:mm").locale("fa").format("DD MMMM YYYY - HH:mm");
};

export const persianToMiladi = (date) => {
  return moment.from(date, "fa", "YYYY-MM-DD").format("YYYY-MM-DD");
};
