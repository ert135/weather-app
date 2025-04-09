import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';

export interface WeatherState {
  weatherItems: any[];
  loading: boolean;
  error: any;
}

export const initialState: WeatherState = {
  weatherItems: [],
  loading: false,
  error: null
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadTodos, state => ({ ...state, loading: true })),
  on(WeatherActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),
  on(WeatherActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(WeatherActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.weatherItems.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
);