function datetime_config_default(env) {
  return {
    dateFormat: "YYYY-MM-DD",
    timeFormat: "h:mm:ss",
    i18n: {
      previousMonth: "Previous Month",
      nextMonth: "Next Month",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  };
}
export {
  datetime_config_default as default
};
