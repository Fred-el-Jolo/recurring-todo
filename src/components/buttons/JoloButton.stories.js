import { withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import fontAwesomeOptions from '../../utils/font-awesome';

import JoloButton from './JoloButton';
Vue.component('jolo-button', JoloButton);

export default {
  title: 'Buttons/JoloButton',
  decorators: [withKnobs],
};

export const arrayPropButton = () => ({
  components: { JoloButton },
  methods: {
    onClick: action('click button'),
  },
  template: `<jolo-button @click="onClick" :icon="['fab', 'font-awesome']"/>`,
});

export const stringPropButton = () => ({
  components: { JoloButton },
  methods: {
    onClick: action('click button'),
  },
  template: `<jolo-button @click="onClick" icon="circle"/>`,
});

export const availableButtons = () => ({
  components: { JoloButton },
  props: {
    icon: {
      default: select('icon', fontAwesomeOptions, 'coffee'),
    },
  },
  methods: {
    onClick: action('click button'),
  },
  template: `<jolo-button @click="onClick" :icon="icon"/>`,
});
