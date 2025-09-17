import { from, interval, map, type Observable, switchMap } from 'npm:rxjs';
import type { State } from '../../model/api/state/state.type.ts';
import type { Stat } from '../../model/stat.type.ts';
import { config$ } from '../config.service.ts';
import { log } from '../log.service.ts';

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

function parseState(input: object): State | null {
  let result: State | null = null;
  const container = {};

  try {
    Object.entries(input).forEach(([key, value]) => {
      const stat = parseStat(key, value);

      Object.defineProperty(container, stat.name, {
        value: stat,
        writable: true,
        enumerable: true,
      });
    });

    result = container as State;
  } catch (e: unknown) {
    log('error:', e);

    return null;
  }

  return result;
}

function parseStat(name: string, value: number | boolean): Stat {
  const pieces = name.split(', ');

  if (!pieces[1]) {
    return {
      name: pieces[0],
      value,
    };
  }

  return {
    name: pieces[0],
    units: pieces[1],
    value,
  };
}

function parseEngine(name: string, value: number | boolean): void /** PropEngine | JetEngine */ {
  /** @todo */
}
