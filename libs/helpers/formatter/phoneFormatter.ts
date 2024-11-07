export function phoneFormatter(phoneNumber: string): string {
  let cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "+62" + cleaned.slice(1);
  }

  if (cleaned.startsWith("62") && !cleaned.startsWith("+62")) {
    cleaned = "+62" + cleaned.slice(2);
  }

  const formatted = cleaned.replace(
    /(\+62)(\d{3})(\d{4})(\d{4})/,
    "$1 $2-$3-$4"
  );

  return formatted;
}
