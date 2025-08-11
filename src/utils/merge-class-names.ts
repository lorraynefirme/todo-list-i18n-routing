export const mergeClassNames = (
  ...classes: Array<string | false | undefined>
) => {
  return classes.filter((item) => Boolean(item)).join(" ");
};
