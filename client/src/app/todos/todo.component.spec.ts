import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodoById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => Observable.of([
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
        },
      ].find(todo => todo._id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Travis by ID', () => {
    todoComponent.setId('Travis_id');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Travis');
    expect(todoComponent.todo.status).toBe(true);
    expect(todoComponent.todo.body).toBe('I wrote something.');
    expect(todoComponent.todo.category).toBe('software design');

  });

  it('can retrieve Kai by ID', () => {
    todoComponent.setId('Kai_id');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Kai');
    expect(todoComponent.todo.status).toBe(false);
    expect(todoComponent.todo.body).toBe('Am I alive?');
    expect(todoComponent.todo.category).toBe('existential crises');

  });

  it('can retrieve KKNic by ID', () => {
    todoComponent.setId('KKNic_id');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('KKNic');
    expect(todoComponent.todo.status).toBe(true);
    expect(todoComponent.todo.body).toBe('They are great.');
    expect(todoComponent.todo.category).toBe('homework');

    it('returns undefined for Santa', () => {
      todoComponent.setId('Santa');
      expect(todoComponent.todo).not.toBeDefined();
    });

  });
});
