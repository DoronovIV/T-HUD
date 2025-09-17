import { tap } from 'npm:rxjs';

import { state$ } from './service/api/state.service.ts';

export function start(): void {
  state$
    .pipe(
      tap((state) => {
        console.log('state:', state);
      }),
    )
    .subscribe();
}
