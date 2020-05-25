<template>
  <div>
    <p ref="inputNode" :class="[{editable: edit}, 'todo-label']"
       :contenteditable="edit"
       @keyup.@="onContext"
       @keyup.+="onProject"
       @keyup.space="onSpace"
       @keyup.enter="onEnter"
       @keyup="onKeyUp"
       @keydown.space="cleanInput"
       @keyup.backspace="onDelete"
       @keyup.delete="onDelete"
       @keyup.clear="onDelete"
       @keyup.paste="onDelete"
       @keyup.redo="onDelete"
       @keyup.undo="onDelete"
    />
    <div>
      Raw value: <span>'{{ rawValue }}'</span>
    </div>
    <div>
      Last matched prefixes: <span>'{{ lastMatchedPrefixes }}'</span>
    </div>
    <div>
      Template: <span>{{ JSON.stringify(template, null, 2) }}</span>
    </div>
  </div>
</template>

<script>
const prefix = /^(?:(x)\s*){0,1}(?:(\([a-zA-Z]\))\s*){0,1}(?:([0-9]{4}-[0-9]{2}-[0-9]{2})\s*){0,1}(?:([0-9]{4}-[0-9]{2}-[0-9]{2})\s*){0,1}/i;
const projects = /\s*(\+[\S]+)/g;
const contexts = /\s*(@[\S]+)/g;
const specials = /\s*([\S:]+:[\S:]+)/g;

export default {
  props: {
    todo: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      template: {
        done: null,
        priority: null,
        creationDate: null,
        completionDate: null,
        title: null,
        projects: [],
        contexts: [],
        specials: [],
      },
      rawValue: '',
      lastMatchedPrefixes: '',
    };
  },
  computed: {
    getDates () {
      if (this.creationDate == null) {
        return '';
      }
      return this.completionDate != null ? `${this.creationDate} ${this.completionDate}` : this.creationDate;
    },
    done: {
      get: function () {
        return this.template.done;
      },
      set: function (newValue) {
        if (!!newValue !== this.template.done) {
          this.template.done = !!newValue;
          this.renderDone(this.template.done);
        }
      },
    },
    priority: {
      get: function () {
        return this.template.priority;
      },
      set: function (newValue) {
        if (newValue !== this.template.priority) {
          this.template.priority = newValue != null ? newValue.trim() : null;
          if (newValue != null) {
            this.renderTodoPart('todo-label__priority', this.template.priority);
          }
        }
      },
    },
    creationDate: {
      get: function () {
        return this.template.creationDate;
      },
      set: function (newValue) {
        if (newValue !== this.template.creationDate) {
          this.template.creationDate = newValue != null ? newValue.trim() : null;
          if (newValue != null) {
            this.renderTodoPart('todo-label__creationDate', newValue);
          }
        }
      },
    },
    completionDate: {
      get: function () {
        return this.template.completionDate;
      },
      set: function (newValue) {
        if (newValue !== this.template.completionDate) {
          this.template.completionDate = newValue != null ? newValue.trim() : null;
          if (newValue != null) {
            this.renderTodoPart('todo-label__completionDate', newValue);
          }
        }
      },
    },
    title: {
      get: function () {
        return this.template.title;
      },
      set: function (newValue) {
        if (newValue !== this.template.title) {
          this.template.title = newValue != null ? newValue.trim() : null;
        }
      },
    },
    projects: {
      get: function () {
        return this.template.projects;
      },
      set: function (newValue) {
        if (newValue != null && !this.template.projects.includes(newValue)) {
          this.template.projects.push(newValue.trim());
        }
      },
    },
    contexts: {
      get: function () {
        return this.template.contexts;
      },
      set: function (newValue) {
        if (newValue != null && !this.template.contexts.includes(newValue)) {
          this.template.contexts.push(newValue.trim());
        }
      },
    },
    specials: {
      get: function () {
        return this.template.specials;
      },
      set: function (newValue) {
        if (newValue != null && !this.template.specials.includes(newValue)) {
          this.template.specials.push(newValue.trim());
          this.renderTodoPart('todo-label__special', newValue, true);
        }
      },
    },
  },
  mounted: function () {},
  methods: {
    cleanInput () {
      this.clearEmptySpans();
      // What if I want to edit within a span !!! do it only if on end boundary
      this.getOutOfSpan();
    },
    onSpace () {
      this.processInput(this.rawValue);
    },
    onEnter () {
      //this.getOutOfSpan();
      this.processInput(this.rawValue);
      // Submit
    },
    // TODO: get caret position to only recompute current span impacted
    onDelete () {
      this.clearEmptySpans();
      this.clearTodo();
      //this.processInput(this.rawValue);
    },
    onKeyDown (event) {
      console.log(event);
    },
    onKeyUp (event) {
      this.rawValue = event.target.textContent;
      if (this.rawValue == null || this.rawValue === '') {
        this.clearTodo();
      }
    },
    onProject () {
      this.renderStraightTodoPart('todo-label__project');
    },
    onContext () {
      this.renderStraightTodoPart('todo-label__context');
    },
    clearTodo () {
      this.template.done = null;
      this.template.priority = null;
      this.template.creationDate = null;
      this.template.completionDate = null;
      this.template.title = null;
      this.template.projects = [];
      this.template.contexts = [];
      this.template.specials = [];
    },
    processInput (todoString) {
      todoString = this.processPrefixes(todoString);
      todoString = this.processTokens(todoString, projects, value => (this.projects = value));
      todoString = this.processTokens(todoString, contexts, value => (this.contexts = value));
      todoString = this.processTokens(todoString, specials, value => (this.specials = value));
      console.log('todoString=' + todoString);
      this.title = todoString.trim();
    },
    processPrefixes (todoString) {
      const prefixes = prefix.exec(todoString);
      if (prefixes) {
        [this.lastMatchedPrefixes, this.done, this.priority, this.creationDate, this.completionDate] = prefixes;
        todoString = todoString.replace(this.lastMatchedPrefixes, '');
      }
      return todoString;
    },
    processTokens (todoString, regexp, callback) {
      const matches = todoString.matchAll(regexp);

      for (const match of matches) {
        // match[0]  // Matched string
        // match[1]  // capturing group
        callback(match[1]);
        todoString = todoString.replace(match[0], '');
      }
      return todoString;
    },
    createTodoSpan (cssClass, textContent) {
      const newNode = document.createElement('span');
      newNode.className = cssClass;

      if (textContent != undefined) {
        newNode.appendChild(document.createTextNode(textContent));
      }

      return newNode;
    },
    clearEmptySpans () {
      const emptySpans = this.$refs.inputNode.querySelectorAll('span:empty');
      emptySpans.forEach(function (span) {
        span.remove();
      });

      const spans = this.$refs.inputNode.querySelectorAll('span');
      spans.forEach(function (span) {
        if (span.textContent.trim().length === 0) {
          span.remove();
        }
      });
    },
    renderDone (value) {
      if (value) {
        this.$refs.inputNode.dataset.done = 'value';
      } else {
        delete this.$refs.inputNode.dataset.done;
      }
    },
    renderTodoPart (cssClass, value, alwaysCreate = false) {
      if (!this.done) {
        let domElement = this.$refs.inputNode.querySelector(`span.${cssClass}`);
        let selection;
        let rangeEndOffset;

        if (domElement == null || alwaysCreate) {
          // Get node & position of caret
          selection = window.getSelection();
          domElement = selection.anchorNode;
          rangeEndOffset = selection.anchorOffset;

          // Create range from the current domElement
          const range = document.createRange();
          range.setStart(domElement, 0);
          range.setEnd(domElement, rangeEndOffset);

          // Create span around the content
          range.surroundContents(this.createTodoSpan(cssClass, value));

          // Move the selection where it should be
          //selection = window.getSelection();
          const lastTextNode = selection.anchorNode.parentNode.lastChild.previousSibling; // br is the last node
          selection.collapse(lastTextNode, lastTextNode.textContent.length);
        }
        // Cas when the dom element already exists
        else if (value !== domElement.textContent) {
          domElement.textContent = value + ' ';
          // const nextSibling = domElement.nextSibling;
          // if (nextSibling != null && nextSibling.nodeType === Node.TEXT_NODE) {
          //   nextSibling.textContent = ' ' + nextSibling.textContent;
          // }
        }
      }
    },
    renderStraightTodoPart (cssClass) {
      if (!this.done) {
        // Get node & position of caret
        let selection = window.getSelection();
        const domElement = selection.anchorNode;
        const rangeEndOffset = selection.anchorOffset;
        const rangeStarOffset = rangeEndOffset > 0 ? rangeEndOffset - 1 : 0;

        // Create range from the current domElement
        const range = document.createRange();
        range.setStart(domElement, rangeStarOffset);
        range.setEnd(domElement, rangeEndOffset);

        // Create span around the content
        const span = this.createTodoSpan(cssClass);
        range.surroundContents(span);

        // Move the selection where it should be
        //selection = window.getSelection();
        //debugger;
        selection.collapse(span, span.textContent.length);
      }
    },
    getOutOfSpan () {
      if (!this.done) {
        // Get node & position of caret
        let selection = window.getSelection();
        const domElement = selection.anchorNode;
        if (domElement.parentNode != null && domElement.parentNode.tagName === 'SPAN') {
          console.log('Caret in span, get him oooooooout !!!');
          //const lastTextNode = domElement.parentNode.parentNode.lastChild.previousSibling; // br is the last node
          const nextTextNode = domElement.parentNode.nextSibling;
          selection.collapse(nextTextNode, 0);
        }
      }
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

    & .todo-label__creationDate,
    & .todo-label__completionDate {
      color: $color-orange;
    }

    & .todo-label__title {
      color: $color-dark;
    }

    & .todo-label__project {
      color: $color-yellow;
    }

    & .todo-label__context {
      color: $color-red;
    }

    & .todo-label__special {
      color: $color-blue;
    }
  }
}
</style>
