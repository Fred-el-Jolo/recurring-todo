<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <div>
      <font-awesome-icon icon="coffee"
                         size="2x"
      />
    </div>
    <!--todo-label v-for="(todo, key) in todos"
                :key="key" :todo="todo"
    /-->
    <todo-label :edit="true" />
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
        '(A) 2020-05-13 New task +new +test @dev @stub due:2020-05-14',
        'x (B) 2020-05-13 Another one +new +test @dev @stub due:2020-05-14',
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
