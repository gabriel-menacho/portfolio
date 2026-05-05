const MIN_DIGITS = 10;

/** Digits only, for `wa.me/{digits}`. */
export function whatsappDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * `https://wa.me/...` when there are enough digits; optional pre-filled message.
 */
export function whatsappHref(
  phone: string,
  options?: { text?: string },
): string | null {
  const digits = whatsappDigits(phone);
  if (digits.length < MIN_DIGITS) return null;
  const base = `https://wa.me/${digits}`;
  const text = options?.text?.trim();
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
