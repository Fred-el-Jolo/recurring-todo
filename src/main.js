import Vue from 'vue';
import App from './App';
import './utils/filters';

// Runtime + compiler;
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

// Runtime only
//new Vue({
//  el: "#app",
//  render: h => h(App)
//});
