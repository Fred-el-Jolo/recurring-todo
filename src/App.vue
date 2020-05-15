<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <todo-label :todo="todo" />
  </div>
</template>

<script>
import TodoLabel from './components/todo/TodoLabel.vue'
export default {
  name: 'App',
  components: {
    TodoLabel,
  },
  data () {
    return {
      message: 'Using Parcel In A Vue.js App',
      todo: {
        title: 'New task',
        priority: 'A',
        creationDate: '2020-05-13',
        completionDate: '',
        isDone: false,
        projects: ['new', 'test'],
        contexts: ['dev', 'stub'],
        dueDate: '2020-05-14',
        isAuto: false,
        isRecurrent: false,
      },
    }
  },
}
</script>

<style scoped>
.container {
  width: 600px;
  margin: 50px auto;
  text-align: center;
}
</style>
