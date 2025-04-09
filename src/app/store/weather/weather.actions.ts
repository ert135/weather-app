import { createAction, props } from '@ngrx/store';
import { Weather } from '../../models/weather.model';

export const loadTodos = createAction('[Todo] Load Weather Items');
export const loadTodosSuccess = createAction(
  '[Weather] Load weather items success',
  props<{ todos: Weather[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load weeather items failure',
  props<{ error: any }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: number }>()
);