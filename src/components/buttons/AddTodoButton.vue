<template>
  <jolo-button icon="plus-circle"
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