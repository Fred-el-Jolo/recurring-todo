<template>
  <a @click="$emit('click', $event)">
    <font-awesome-icon :icon="icon"
                       size="2x"
    />
  </a>
</template>

<script>
export default {
  props: {
    icon: {
      type: [String, Array],
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
a {
  cursor: pointer;
}
</style>