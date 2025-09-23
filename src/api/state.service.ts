import { from, interval, type Observable, switchMap } from 'npm:rxjs';
import { config$ } from '../config/config.service.ts';

export const state$: Observable<object> = config$.pipe(
  switchMap((config) => {
    return interval(config.updateInterval);
  }),
  switchMap(() => {
    return from(fetch('http://127.0.0.1:8111/state'));
  }),
  switchMap((response) => {
    return from(response.json());
  }),
);
