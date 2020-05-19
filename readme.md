# recurring-todo

Recurring todolist

## Spec

- Todo.txt syntax
- Auto compute due dates
- Task properties
  - Name
  - past occurrences
  - computed period
  - satisfactory
- Task instance properties
  - priority
  - creation date
  - completion date
  - completion flag
  - project tags
  - context tags
  - due date
  - auto flag (computed or manual)
  - recurrence flag

## UX

- mobile first design
- List all open tasks
- todo.txt syntax coloring (https://github.com/todotxt/todo.txt-cli/wiki/Tips-and-Tricks)
- Quick access to open projects
- Filter by project
- Filter by context
- Display completed tasks

- Main page

  - sub-tab: open tasks (default view)
  - sub-tab: projects view
  - sub-tab: filter
  - _menu:_
    - _completed tasks_
    - _tasks properties_

- Components

      	v TodoLabel: syntax-colored display of a todo label
      	x BaseButton: base button
      	v DoneButton
      	v TodoMenuButton: menu button on todo line (archive/delete/edit)
      	v AddTodoButton
      	- TodoInput: input for typing todo line
      	- TodoTemplate: helper displaying todo syntax for TodoInput
      	- Tab / sub tab component
      	v Search Button
      	- ProjectCard: Project container
      	- TodoCard: Todo container
      	- FilterView
      	- ProjectView
      	- AllView
