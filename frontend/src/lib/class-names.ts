export const classNames = (...classes: (string | undefined | boolean | null)[]) => {
  return classes.filter(Boolean).join(' ')
};