<template>
  <jolo-button icon="search"
               @click="$emit('click', $event)"
  />
</template>

<script>
import JoloButton from './JoloButton';
export default {
  components: {
    JoloButton,
  },
};
</script>

<style scoped lang="scss">
</style>