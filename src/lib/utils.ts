export const trimObjectValues = (obj) => {
  if (typeof obj === "string") {
    return obj.trim();
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = trimObjectValues(obj[key]);
      return acc;
    }, {});
  }

  return obj;
};
