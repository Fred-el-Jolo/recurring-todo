<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <counter></counter>
    <counter></counter>
  </div>
</template>

<script>
import Counter from "./components/counter.js";
export default {
  name: "App",
  components: {
    Counter
  },
  data() {
    return {
      message: "Using Parcel In A Vue.js App"
    };
  }
};
</script>

<style scoped>
.container {
  width: 600px;
  margin: 50px auto;
  text-align: center;
}
</style>
