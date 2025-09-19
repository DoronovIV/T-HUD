import { tap } from 'npm:rxjs';

import { state$ } from './service/api/state.service.ts';
import { log } from './service/basic/log.service.ts';

export function start(): void {
  state$
    .pipe(
      tap((state) => {
        log(state);
      }),
    )
    .subscribe();
}
