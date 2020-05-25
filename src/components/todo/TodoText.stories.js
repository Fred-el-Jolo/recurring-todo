import '../../utils/filters';
import Vue from 'vue';

import TodoText from './TodoText.vue';

Vue.component('todo-text', TodoText);

export default {
  title: 'TodoText/TodoText',
};

export const activeTodo = () => ({
  components: { TodoText },
  template: `<todo-text />`,
});
