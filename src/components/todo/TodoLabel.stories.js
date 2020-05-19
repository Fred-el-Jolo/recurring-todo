import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';

import '../../utils/filters';
import Vue from 'vue';

import TodoLabel from './TodoLabel.vue';

Vue.component('todo-label', TodoLabel);

export default {
  title: 'TodoLabel',
  decorators: [withKnobs],
  parameters: {
    backgrounds: [
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' },
    ],
  },
};

export const activeTodo = () => ({
  components: { TodoLabel },
  props: {
    todo: {
      default: {
        title: text('title', 'Task title'),
        priority: text('priority', 'A'),
        creationDate: text('creation date', '2020-05-13'),
        completionDate: text('completion date', ''),
        isDone: boolean('is done', false),
        projects: array('projects', ['new', 'test']),
        contexts: array('contexts', ['dev', 'stub']),
        dueDate: text('due date', '2020-05-14'),
        isAuto: boolean('is auto', false),
        isRecurrent: boolean('is recurrent', false),
      },
    },
  },
  template: `<todo-label :todo="todo"/>`,
});
