import {
  distinctUntilChanged,
  filter,
  from,
  map,
  Observable,
  shareReplay,
  startWith,
} from 'npm:rxjs';
import { equal } from '../../const.ts';
import { fileLog } from './log.service.ts';
export function parseJsonFileSync<T>(path: string): T {
  return JSON.parse(Deno.readTextFileSync(path)) as T;
}

export function fileContents$<T>(path: string): Observable<T> {
  return new Observable<T>((subscriber) => {
    const isFile = Deno.statSync(path).isFile;
    const dir = path.split('/').slice(0, -1).join('/');

    const watcher = Deno.watchFs(dir);

    if (!isFile) {
      fileLog('Error: fileContents$ - directory passed instead of file.');
    }

    const subscription = from(watcher)
      .pipe(
        filter((event) => {
          return event.paths.at(0) === path;
        }),
        filter((event) => {
          return event.kind === 'modify';
        }),
        map(() => {
          return parseJsonFileSync<T>(path);
        }),
        distinctUntilChanged((prev, current) => {
          return equal(prev, current);
        }),
        startWith(parseJsonFileSync<T>(path)),
        shareReplay(1),
      )
      .subscribe(subscriber);

    return () => {
      subscription.unsubscribe();
      watcher.close();
    };
  });
}
