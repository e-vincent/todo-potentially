import { Todo } from '../services/item';

export class TodoList {
  name: String;
  todos: Array<Todo>;

  constructor() {
    this.name = '';
  }

  // only save if list is named
  private updateStore() {
    if (this.name != '') {
      localStorage.setItem(this.name as string, JSON.stringify(this.todos));
    }
  }

  private getWithCompleted(completed: Boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }

  setName(name: String) {
    this.name = name;
  }

  setTodos() {
    if(typeof this.name !== 'undefined') {
      let foundTodos = JSON.parse(localStorage.getItem(this.name as string) || '[]');
      this.todos = foundTodos.map ( (todo: {_title: String, completed: Boolean}) => {
        let ret = new Todo(todo._title);
        ret.completed = todo.completed;
        return ret
      });
    } else {
      this.todos = new Array<Todo>();
    }
  }

  saveList(newName: String) {
    this.name = newName;
    this.updateStore();
  }

  allCompleted() {
    return this.todos.length === this.getCompleted().length;
  }

  setAllTo(completed: Boolean) {
    this.todos.forEach((item: Todo) => item.completed = completed);
    this.updateStore();
  }

  removeCompleted() {
    this.todos = this.getWithCompleted(false);
    this.updateStore();
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
  }

  add(title: String) {
    this.todos.push(new Todo(title));
    this.updateStore();
  }
}