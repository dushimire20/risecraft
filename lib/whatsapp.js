export function buildWhatsAppLink(phone, message) {
  const digits = String(phone || "").replace(/\D/g, "");
  const withCountryCode = digits.startsWith("250") ? digits : `250${digits.replace(/^0/, "")}`;
  const url = new URL(`https://wa.me/${withCountryCode}`);
  if (message) url.searchParams.set("text", message);
  return url.toString();
}
