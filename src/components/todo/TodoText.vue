<template>
  <div>
    (A) 2020-05-11 2020-05-12 Yop mate !!! +test +test2 @yop @yop2 due:2020-05-20 auto:false recurrent:false
    <todo-label :todo="todoObject" />
    <input v-if="edit"
           v-model="rawValue"
           type="text"
           @keyup.space.enter="onChange"
    >
  </div>
</template>

<script>
import { Todo, parse } from '../../utils/todo';
import TodoLabel from './TodoLabel';

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
    onChange () {
      this.todoObject = parse(this.rawValue);
    },
  },
};
</script>

<style lang="scss">
</style>
