import { tap } from 'npm:rxjs';
import { state$ } from './service/api/state.service.ts';
import { consoleLog } from './service/basic/log.service.ts';

export function start(): void {
  state$
    .pipe(
      tap((state) => {
        consoleLog('state:', state);
      }),
    )
    .subscribe();
}
