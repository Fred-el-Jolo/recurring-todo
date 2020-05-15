<template>
  <p :data-done="todo.isDone">
    <span v-if="todo.isDone">{{ formatIsDone }}</span>
    <span v-if="todo.priority"
          class="priority"
    >{{ formatPriority }}</span>
    <span
      v-if="todo.completionDate"
      class="completion-date"
    >{{ todo.completionDate }}</span>
    <span
      v-if="todo.creationDate"
      class="creation-date"
    >{{ todo.creationDate }}</span>
    <span class="title">{{ todo.title }}</span>
    <span
      v-if="todo.projects.length"
      class="projects"
    >{{ todo.projects | prefixArrayValues('+') }}</span>
    <span
      v-if="todo.contexts.length"
      class="contexts"
    >{{ todo.contexts | prefixArrayValues('@') }}</span>
    <span
      v-if="todo.dueDate"
      class="extra"
    >{{ todo.dueDate | prefixString('due:') }}</span>
    <span class="extra">{{ todo.isAuto | prefixString('auto:') }}</span>
    <span class="extra">{{ todo.isRecurrent | prefixString('recurrent:') }}</span>
  </p>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatPriority () {
      return `(${this.todo.priority})`;
    },
    formatIsDone () {
      return this.todo.isDone ? 'x' : '';
    },
  },
};
</script>

<style scoped lang="scss">
$color-grey: #74705d;
$color-purple: #ac80ff;
$color-dark: rgba(0, 0, 0, 1);
$color-yellow: #e7db74;
$color-red: #f92470;
$color-blue: #67d8ef;

p {
  font-size: 2em;
  text-align: center;

  &[data-done] {
    color: $color-grey;
  }

  &:not([data-done]) {
    & span.priority {
      color: $color-purple;
    }

    & span.completion-date {
      color: $color-purple;
    }

    & span.creation-date {
      color: $color-purple;
    }

    & span.title {
      color: $color-dark;
    }

    & span.projects {
      color: $color-yellow;
    }

    & span.contexts {
      color: $color-red;
    }

    & span.extra {
      color: $color-blue;
    }
  }
}
</style>
