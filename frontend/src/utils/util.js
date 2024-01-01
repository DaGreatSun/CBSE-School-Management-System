export function displayDateTimeFormat(time) {
  return new Date(time).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function todaysDate() {
  var date = new Date().toISOString().split("T")[0];
  return date;
}
