import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import '../../utils/font-awesome';

import TodoMenuButton from './TodoMenuButton.vue';

Vue.component('done-button', TodoMenuButton);

export default {
  title: 'Buttons/TodoMenuButton',
};

export const standardButton = () => ({
  components: { TodoMenuButton },
  methods: {
    onClick: action('click button'),
  },
  template: `<todo-menu-button @click="onClick"/>`,
});
