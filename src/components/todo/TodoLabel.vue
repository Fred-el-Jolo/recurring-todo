<template>
  <p>{{ formatTodoLabel }}</p>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  /*
	data: function() {
    return {
      todo: {
			  title: "",
        priority: "",
        creationDate: "",
        completionDate: "",
        isDone: "",
        projects: [],
        contexts: [],
        dueDate: "",
        isAuto: "",
        isRecurrent: ""
      }
    };
  },
	*/
  computed: {
    formatPriority () {
      return `(${this.todo.priority})`
    },
    formatTitle () {
      return this.todo.title
    },
    formatCreationDate () {
      return this.todo.creationDate
    },
    formatCompletionDate () {
      return this.todo.completionDate
    },
    formatIsDone () {
      return this.todo.isDone ? 'x' : ''
    },
    formatProjects () {
      return this.todo.projects
        .reduce((acc, cur) => {
          return (acc += ` +${cur}`)
        }, '')
        .trim()
    },
    formatContexts () {
      return this.todo.contexts
        .reduce((acc, cur) => {
          return (acc += ` @${cur}`)
        }, '')
        .trim()
    },
    formatDueDate () {
      return `due:${this.todo.dueDate}`
    },
    formatIsAuto () {
      return `auto:${this.todo.isAuto}`
    },
    formatIsRecurrent () {
      return `recurrent:${this.todo.isRecurrent}`
    },
    formatTodoLabel () {
      return `${this.formatIsDone} \
${this.formatPriority} \
${this.formatCompletionDate} \
${this.formatCreationDate} \
${this.formatTitle} \
${this.formatProjects} \
${this.formatContexts} \
${this.formatDueDate} \
${this.formatIsAuto} \
${this.formatIsRecurrent}`
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
