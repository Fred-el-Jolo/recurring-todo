<template>
  <div>
    <todo-label :todo="todoObject" />
    <input v-if="edit"
           v-model="rawValue" type="text"
           @keyup.space.enter="flushChanges" @input="onChange"
    >
  </div>
</template>

<script>
import debounce from 'lodash-es/debounce';
import { parse } from '../../utils/todo';
import TodoLabel from './TodoLabel';

const debouncedParse = debounce(function () {
  this.todoObject = parse(this.rawValue);
}, 300);

export default {
  components: { TodoLabel },
  props: {
    todo: {
      type: Object,
      default: null,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      todoObject: this.todo || undefined,
      rawValue: this.todo != null ? this.todo.toString() : '',
    };
  },
  methods: {
    onChange: debouncedParse,
    flushChanges () {
      debouncedParse.flush();
    },
  },
};
</script>

<style lang="scss"></style>
