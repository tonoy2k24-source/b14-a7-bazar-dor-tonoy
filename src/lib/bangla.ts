const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => digits[Number(d)]);
}

export function banglaDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export function toBnNumber(value: number, fractionDigits = 0): string {
  const fixed = Number(value).toFixed(fractionDigits);
  const [intPart, decPart] = fixed.split(".");
  const grouped = Number(intPart).toLocaleString("en-IN");
  return toBn(decPart ? `${grouped}.${decPart}` : grouped);
}