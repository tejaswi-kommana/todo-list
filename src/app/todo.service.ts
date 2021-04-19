import { Todo } from './todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private nextId: number;

  constructor() {
    let todos: Todo[] = this.getTodos();
  }

  public getTodos(): Todo[]{
    let localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem;
  }

  public addTodo(text: string): void {
    let todos: Todo[] = this.getTodos();
    // if no todos, nextId is 0,
    // otherwise set to 1 more than last todo id
    if (todos.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = todos[todos.length - 1].id;
      this.nextId = maxId + 1;
    }
    let todo = new Todo(this.nextId, text);
    todos.push(todo);
    this.setLocalStorageTodos(todos);
  }

  public toggleComplete(id: number) {
    let todos: Todo[] = this.getTodos();
    let i: number;
    let item: Todo;
    for( item of todos ){
      if( item.id == id ){
        item.isChecked = !item.isChecked;
        break;
      }
    }
    this.setLocalStorageTodos(todos);
  }

  public removeTodo(id: number): void {
    let todos: Todo[] = this.getTodos();
    todos = todos.filter((todo) => todo.id != id);
    this.setLocalStorageTodos(todos);
  }

  private setLocalStorageTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
