import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import '../../utils/font-awesome';

import AddTodoButton from './AddTodoButton.vue';

Vue.component('add-todo-button', AddTodoButton);

export default {
  title: 'Buttons/AddTodoButton',
  parameters: {
    backgrounds: [
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' },
    ],
  },
};

export const standardButton = () => ({
  components: { AddTodoButton },
  methods: {
    onClick: action('click button'),
  },
  template: `<add-todo-button @click="onClick"/>`,
});
