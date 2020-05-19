<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <div>
      <font-awesome-icon icon="coffee"
                         size="2x"
      />
    </div>
    <todo-label v-for="(todo, key) in todos"
                :key="key" :todo="todo"
    />
  </div>
</template>

<script>
import TodoLabel from './components/todo/TodoLabel';
export default {
  name: 'App',
  components: {
    TodoLabel,
  },
  data () {
    return {
      message: 'Using Parcel In A Vue.js App',
      todos: [
        {
          title: 'New task',
          priority: 'A',
          creationDate: '2020-05-13',
          completionDate: null,
          isDone: false,
          projects: ['new', 'test'],
          contexts: ['dev', 'stub'],
          dueDate: '2020-05-14',
          isAuto: false,
          isRecurrent: false,
        },
        {
          title: 'Another one',
          priority: 'B',
          creationDate: '2020-05-13',
          completionDate: null,
          isDone: true,
          projects: ['new', 'test'],
          contexts: ['dev', 'stub'],
          dueDate: '2020-05-14',
          isAuto: false,
          isRecurrent: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  width: 600px;
  margin: 50px auto;
  text-align: center;
}
</style>
