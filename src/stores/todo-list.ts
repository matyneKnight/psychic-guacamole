import { observable, action, computed } from "mobx";
import TodoItem from "./todo-item";

export class TodoList {
  @observable.shallow list: TodoItem[] = [];

  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @action
  addTodo = (text: string) => {
    this.list.push(new TodoItem(text));
  };

  @action
  removeTodo = (todo: TodoItem) => {
    this.list.splice(this.list.indexOf(todo), 1);
  };

  @computed
  get finishedTodos(): TodoItem[] {
    return this.list.filter(todo => todo.isDone);
  }

  @computed
  get openTodos(): TodoItem[] {
    return this.list.filter(todo => !todo.isDone);
  }

  @computed
  get finishedCount(): number {
    if (this.list !== null && this.list.length > 0) {
      let finished = this.list.filter(todo => todo.isDone);
      return finished.length;
    }
    return 0;
  }
}
