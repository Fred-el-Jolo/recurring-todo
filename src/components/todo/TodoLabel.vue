<template>
  <p ref="inputNode"
     class="todo-label"
     :data-done="!!todo.done"
  >
    <span class="todo-label__done">{{ todo.done | todoDone }}</span>
    <span class="todo-label__priority">{{ todo.priority | todoPriority }}</span>
    <span class="todo-label__creation-date">{{ todo.creationDate | date }}</span>
    <span class="todo-label__completion-date">{{ todo.completionDate | date }}</span>
    <span class="todo-label__title">{{ todo.title | default('') }}</span>
    <span class="todo-label__projects">{{ todo.projects | prefixArrayValues('+') }}</span>
    <span class="todo-label__contexts">{{ todo.contexts | prefixArrayValues('@') }}</span>
    <span class="todo-label__specials">{{ todo.specials | todoSpecial }}</span>
  </p>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: function () {
        return {
          done: false,
          priority: null,
          creationDate: null,
          completionDate: null,
          title: null,
          projects: [],
          contexts: [],
          specials: [],
        };
      },
    },
  },
  computed: {
    formatDone () {
      return this.todo.done ? 'x' : '';
    },
    formatPriority () {
      return this.todo.priority ? `(${this.todo.priority})` : '';
    },
  },
};
</script>

<style lang="scss">
$color-grey: #74705d;
$color-purple: #ac80ff;
$color-orange: #ff8f0f;
$color-dark: rgba(0, 0, 0, 1);
$color-yellow: #e7db74;
$color-red: #f92470;
$color-blue: #67d8ef;

.todo-label {
  font-size: 2em;
  text-align: center;

  &[data-done] {
    color: $color-grey;
  }

  &:not([data-done]) {
    & .todo-label__priority {
      color: $color-purple;
    }

    & .todo-label__creation-date,
    & .todo-label__completion-date {
      color: $color-orange;
    }

    & .todo-label__title {
      color: $color-dark;
    }

    & .todo-label__projects {
      color: $color-yellow;
    }

    & .todo-label__contexts {
      color: $color-red;
    }

    & .todo-label__specials {
      color: $color-blue;
    }
  }
}
</style>
