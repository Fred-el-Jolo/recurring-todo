import Vue from "vue";
import App from "./App";

// Runtime + compiler;
new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});

// Runtime only
//new Vue({
//  el: "#app",
//  render: h => h(App)
//});
