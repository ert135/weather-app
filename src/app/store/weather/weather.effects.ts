import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as WeatherActions from './weather.actions';
import { WeatherService } from '../../services/weather.service';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private todoService: WeatherService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map(todos => WeatherActions.loadTodosSuccess({ todos })),
          catchError(error => of(WeatherActions.loadTodosFailure({ error })))
        )
      )
    )
  );
}