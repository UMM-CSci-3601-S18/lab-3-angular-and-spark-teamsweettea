import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          "_id": "Travis_id",
          "owner": "Travis",
          "status": true,
          "body": "I wrote something.",
          "category": "software design"
        },
        {
          "_id": "Kai_id",
          "owner": "Kai",
          "status": false,
          "body": "Am I alive?",
          "category": "existential crises"
        },
        {
          "_id": "KKNic_id",
          "owner": "KKNic",
          "status": true,
          "body": "They are great.",
          "category": "homework"
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ UserListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains an owner \'Travis\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Travis')).toBe(true);
  });

  it('contains an owner \'Kai\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Kai')).toBe(true);
  });

  it('contains an owner \'KKNic\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'KKNic')).toBe(true);
  });

  it('doesn\'t contain a user named \'He who shall not be named\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'He who shall not be named')).toBe(false);
  });

  it('todo list filters by owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = "Travis";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "true";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = "I wrote something.";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoCategory = "software design";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });


  it('todo list filters by owner and status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = "Travis";
    todoList.todoStatus = "true";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner and body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = "Travis";
    todoList.todoBody = "I wrote something.";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner and category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = "Travis";
    todoList.todoCategory = "software design";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });



  it('todo list filters by status and body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "true";
    todoList.todoBody = "I wrote something.";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by status and category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "true";
    todoList.todoCategory = "homework";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by body and category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = "I wrote something.";
    todoList.todoCategory = "software design";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });



  it('todo list filters by status, body and category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "true";
    todoList.todoBody = "I wrote something.";
    todoList.todoCategory = "software design";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner, status and body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = "Travis";
    todoList.todoStatus = "true";
    todoList.todoBody = "I wrote something.";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by status, body and category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "true";
    todoList.todoBody = "I wrote something.";
    todoList.todoCategory = "software design";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner, status, body and category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = "Travis";
    todoList.todoStatus = "true";
    todoList.todoBody = "I wrote something.";
    todoList.todoCategory = "software design";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });


});

describe('Misbehaving User List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a UserListService', () => {
    // Since the observer throws an error, we don't expect users to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
