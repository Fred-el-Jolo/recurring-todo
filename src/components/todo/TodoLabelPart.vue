<template>
  <span :class="`todo-label__${property}`">{{ value }}</span>
</template>

<script>
export default {
  props: {
    property: { type: String, default: '' },
    value: { type: String, default: '' },
  },
};
</script>

<style>
</style>