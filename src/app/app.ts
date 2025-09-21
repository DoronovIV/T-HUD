import { tap } from 'npm:rxjs';
import { Paths } from './const.ts';
import type { Stat } from './model/stat.type.ts';
import { fileContents$ } from './service/basic/file.service.ts';
import { consoleLog } from './service/basic/log.service.ts';

export function start(): void {
  fileContents$<Stat[]>(`${Paths.Test}/.data.jsonc`)
    .pipe(
      tap((contents) => {
        consoleLog('contents:', contents);
      }),
    )
    .subscribe();
}
