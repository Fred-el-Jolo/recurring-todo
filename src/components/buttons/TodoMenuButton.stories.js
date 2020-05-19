import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import '../../utils/font-awesome';

import TodoMenuButton from './TodoMenuButton.vue';

Vue.component('done-button', TodoMenuButton);

export default {
  title: 'Buttons/TodoMenuButton',
  parameters: {
    backgrounds: [
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' },
    ],
  },
};

export const standardButton = () => ({
  components: { TodoMenuButton },
  methods: {
    onClick: action('click button'),
  },
  template: `<todo-menu-button @click="onClick"/>`,
});
