/** Sanitize phone input: only allow digits, +, -, (, ), and spaces. Max 12 chars. */
export const sanitizePhone = (value: string): string => {
  return value.replace(/[^0-9+\-() ]/g, "").slice(0, 12);
};

/** Validate phone: must have at least 7 digit characters and max 12 total chars */
export const isValidPhone = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && value.length <= 12;
};

/** Max message length */
export const MAX_MESSAGE_LENGTH = 1000;
