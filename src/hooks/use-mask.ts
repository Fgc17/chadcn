export type MaskType =
  | string
  | ((maskedValue: string, rawValue: string) => string | null)
  | null;

export const maskit = (string: string, mask: MaskType) => {
  const fieldValue = string;

  const rawValue = fieldValue.replace(/[^0-9a-zA-Z]/g, "");

  if (typeof mask === "function") {
    mask = mask(fieldValue, rawValue);
  }

  if (!mask) return fieldValue;

  let formattedValue = "";
  let inputIndex = 0;
  let maskIndex = 0;

  while (inputIndex < rawValue.length && maskIndex < mask.length) {
    const maskChar = mask[maskIndex];
    const inputChar = rawValue[inputIndex];

    if (maskChar === "9") {
      // Placeholder for a digit
      if (!/\d/.test(inputChar || "")) {
        break; // Break if input character is not a digit
      }
      formattedValue += inputChar;
      inputIndex++;
    } else if (maskChar === "a") {
      // Placeholder for a letter
      if (!/[a-zA-Z]/.test(inputChar || "")) {
        break; // Break if input character is not a letter
      }
      formattedValue += inputChar;
      inputIndex++;
    } else if (maskChar === "*") {
      // Wildcard character, accept any character
      formattedValue += inputChar;
      inputIndex++;
    } else {
      formattedValue += maskChar;
      // No need to check if inputChar matches maskChar, as rawValue contains only letters and digits
    }
    maskIndex++;
  }

  return formattedValue;
};

export const useMask = () => ({
  maskit,
});
