export function prefixArrayValues(array, prefix) {
  if (array == null) {
    return '';
  }
  return array
    .reduce((acc, cur) => {
      return (acc += ` ${prefix}${cur}`);
    }, '')
    .trim();
}

export function todoSpecial(value, key) {
  if (key == null || value == null || value === '') {
    return '';
  }
  return `${key}:${value}`.trim();
}

export function date(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return '';
}

export function defaultValue(value, defaultValue) {
  return value != null ? value : defaultValue;
}

export function todoDone(value) {
  return value ? 'x' : '';
}

export function todoPriority(value) {
  return value ? `(${value})` : '';
}
