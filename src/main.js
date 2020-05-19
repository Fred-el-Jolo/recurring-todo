import Vue from 'vue';
import App from './App';
import './utils/filters';
// Font awesome integration
import './utils/font-awesome';

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
