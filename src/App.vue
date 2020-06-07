<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <div>
      <font-awesome-icon icon="coffee"
                         size="2x"
      />
    </div>
    (A) 2020-05-11 2020-05-12 Title +project @context due:2020-05-20 auto:false recurrent:false
    <todo-text v-for="(todoItem, key) in todos"
               :key="key" :todo="todoItem"
    />
    <todo-text :edit="true" />
  </div>
</template>

<script>
import { Todo } from './utils/todo';
import TodoText from './components/todo/TodoText';
export default {
  name: 'App',
  components: {
    TodoText,
  },
  data () {
    return {
      message: 'Recurring todo',
      todos: [
        new Todo(
          false,
          'A',
          new Date('2020-05-11'),
          new Date('2020-05-12'),
          'Yop mate !!!',
          ['test', 'test2'],
          ['yop', 'yop2'],
          [
            { key: 'due', value: '2020-05-20' },
            { key: 'auto', value: 'false' },
            { key: 'recurrent', value: 'false' },
          ],
        ),
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
