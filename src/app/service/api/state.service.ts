import { from, interval, type Observable, switchMap } from 'npm:rxjs';

export const state$: Observable<object> = interval(200).pipe(
  switchMap(() => {
    return from(fetch('http://127.0.0.1:8111/state'));
  }),
  switchMap((response) => {
    return from(response.json());
  }),
);
