export function prefixArrayValues (array, prefix) {
  if (array == null) {
    return '';
  }
  return array
    .reduce((acc, cur) => {
      return (acc += ` ${prefix}${cur}`);
    }, '')
    .trim();
}

export function todoSpecial (array) {
  if (array == null) {
    return '';
  }
  return array
  .reduce((acc, cur) => {
    return (cur != null) ? acc += ` ${cur.key}:${cur.value}` : acc;
  }, '')
  .trim();
}

export function date (value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0,10);
  }
  return '';
}

export function defaultvalue (value, defaultValue) {
  return value != null ? value : defaultValue;
}

export function todoDone (value) {
  return value ? 'x' : '';
}

export function todoPriority (value) {
  return value ? `(${value})` : '';
}
