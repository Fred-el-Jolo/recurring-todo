<template>
  <div class="todo-label">
    <todo-label :contenteditable="edit" class="todo-label__text"
                :todo="todo"
                @click="onClick"
                @keydown="onKeyDown"
                @keyup="onKeyUp"
                @input="onInput"
    />
  </div>
</template>

<script>
import TodoLabel from './TodoLabel';

// https://github.com/todotxt/todo.txt
export default {
  components: {
    TodoLabel,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function () {
    return {
      rawValue: '',
      processedValue: '',
      todoStruct: {},
    };
  },
  methods: {
    onClick () {
      this.editable = this.edit ? true : false;
    },
    onKeyDown (event) {
      //console.log('on key down', event);
    },
    onKeyUp (event) {
      //console.log('on key up', event);
    },
    // https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes
    onInput ({ data, inputType }) {
      console.log(`${inputType} event, data=${data}`);
    },
  },
};
</script>

<style scoped lang="scss">
.todo-label {
  .todo-label__input {
    display: block;
  }
}
</style>