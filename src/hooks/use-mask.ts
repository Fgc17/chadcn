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
      if (!/\d/.test(inputChar || "")) {
        break;
      }
      formattedValue += inputChar;
      inputIndex++;
    } else if (maskChar === "a") {
      if (!/[a-zA-Z]/.test(inputChar || "")) {
        break;
      }
      formattedValue += inputChar;
      inputIndex++;
    } else if (maskChar === "*") {
      formattedValue += inputChar;
      inputIndex++;
    } else {
      formattedValue += maskChar;
    }
    maskIndex++;
  }

  return formattedValue;
};

export const useMask = () => ({
  maskit,
});
