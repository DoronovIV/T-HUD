import { from, interval, map, type Observable, switchMap } from 'npm:rxjs';
import type { State } from '../../model/api/state/state.type.ts';
import { config$ } from '../config.service.ts';

import { parseState } from '../parsing/state.parser.ts';

export const state$: Observable<State | null> = config$.pipe(
  switchMap((config) => {
    return interval(config.updateInterval);
  }),
  switchMap(() => {
    return from(fetch('http://127.0.0.1:8111/state'));
  }),
  switchMap((response) => {
    return from(response.json());
  }),
  map((rawState) => {
    return parseState(rawState);
  }),
);
