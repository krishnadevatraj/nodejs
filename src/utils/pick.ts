export const pick = (
  object: Record<string, any>,
  keys: string[]
): Record<string, any> => {
  return keys.reduce(
    (obj, key) => {
      if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
      }
      return obj;
    },
    {} as Record<string, any>
  );
};
