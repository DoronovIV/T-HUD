import { map, tap } from 'npm:rxjs';
import { state$ } from './api/state.service.ts';
import { consoleLog } from './core/service/log.service.ts';
import { parseState } from './parse/state.parser.ts';

export function start(): void {
  state$
    .pipe(
      map((rawState) => {
        return parseState(rawState);
      }),
      tap((state) => {
        consoleLog('state:', state);
      }),
    )
    .subscribe();
}
