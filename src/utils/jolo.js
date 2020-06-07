export function isDate (input) {
  return (input instanceof Date && !isNaN(input.valueOf()));
}
