import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import '../../utils/font-awesome';

import SearchButton from './SearchButton.vue';

Vue.component('search-button', SearchButton);

export default {
  title: 'Buttons/SearchButton',
};

export const standardButton = () => ({
  components: { SearchButton },
  methods: {
    onClick: action('click button'),
  },
  template: `<search-button @click="onClick"/>`,
});
