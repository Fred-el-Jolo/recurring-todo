<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <div>
      <font-awesome-icon icon="coffee"
                         size="2x"
      />
    </div>

    <todo-text v-for="(todo, key) in todos"
               :key="key" :todo="todo"
    />
  </div>
</template>

<script>
import TodoText from './components/todo/TodoText';
export default {
  name: 'App',
  components: {
    TodoText,
  },
  data () {
    return {
      message: 'Using Parcel In A Vue.js App',
      todos: [
        {
          done: true,
          priority: 'A',
          creationDate: new Date('2020-05-11'),
          completionDate: new Date('2020-05-12'),
          title: 'Yop mate !!!',
          projects: ['test', 'test2'],
          contexts: ['yop', 'yop2'],
          specials: [
            { key: 'due', value: '2020-05-20' },
            { key: 'auto', value: 'false' },
            { key: 'recurrent', value: 'false' },
          ],
        },
        {
          done: false,
          priority: 'B',
          creationDate: new Date('2020-05-11'),
          completionDate: new Date('2020-05-12'),
          title: 'Yop mate !!!',
          projects: ['test', 'test2'],
          contexts: ['yop', 'yop2'],
          specials: [
            { key: 'due', value: '2020-05-20' },
            { key: 'auto', value: 'false' },
            { key: 'recurrent', value: 'false' },
          ],
        },
        null,
      ],
      todo: {
        done: false,
        priority: 'A',
        creationDate: new Date('2020-05-11'),
        completionDate: new Date('2020-05-12'),
        title: 'Yop mate !!!',
        projects: ['test', 'test2'],
        contexts: ['yop', 'yop2'],
        specials: [
          { key: 'due', value: '2020-05-20' },
          { key: 'auto', value: 'false' },
          { key: 'recurrent', value: 'false' },
        ],
      },
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
