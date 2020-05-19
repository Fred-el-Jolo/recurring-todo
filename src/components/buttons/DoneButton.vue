<template>
  <jolo-button icon="check-circle"
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
a {
  color: green;
}
</style>