import Vue from 'vue';

Vue.filter('prefixArrayValues', (array, prefix) => {
  return array
    .reduce((acc, cur) => {
      return (acc += ` ${prefix}${cur}`);
    }, '')
    .trim();
});

Vue.filter('prefixString', (value, prefix) => {
  return `${prefix}${value}`;
});
