import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import '../../utils/font-awesome';

import DoneButton from './DoneButton.vue';

Vue.component('done-button', DoneButton);

export default {
  title: 'Buttons/DoneButton',
};

export const standardButton = () => ({
  components: { DoneButton },
  methods: {
    onClick: action('click button'),
  },
  template: `<done-button @click="onClick"/>`,
});
