/**
 * Phone formatting and validation utilities for Uzbekistan (+998) phone numbers.
 */

export function formatUzbekPhone(value: string): string {
  // Strip all non-digits
  const digits = value.replace(/\D/g, "");

  // If starts with 998, remove the prefix to handle local digits
  let localDigits = digits;
  if (localDigits.startsWith("998")) {
    localDigits = localDigits.slice(3);
  }

  // Cap at 9 digits for Uzbekistan national subscriber numbers
  localDigits = localDigits.slice(0, 9);

  let formatted = "+998";
  if (localDigits.length > 0) {
    formatted += ` (${localDigits.slice(0, 2)}`;
  }
  if (localDigits.length >= 2) {
    formatted += `)`;
  }
  if (localDigits.length > 2) {
    formatted += ` ${localDigits.slice(2, 5)}`;
  }
  if (localDigits.length > 5) {
    formatted += `-${localDigits.slice(5, 7)}`;
  }
  if (localDigits.length > 7) {
    formatted += `-${localDigits.slice(7, 9)}`;
  }

  return formatted;
}

export function isUzbekPhoneValid(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  // Must be 12 digits total: 998 + 9 local digits
  return digits.length === 12 && digits.startsWith("998");
}

export function getCleanPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
