import { debounceTime, filter, from, map, type Observable, startWith } from 'npm:rxjs';

export function parseJsonFileSync<T>(path: string): T {
  // biome-ignore lint/correctness/noUndeclaredVariables: Deno - static deno namespace
  return JSON.parse(Deno.readTextFileSync(path)) as T;
}

export function fileContents$<T>(path: string): Observable<T> {
  // biome-ignore lint/correctness/noUndeclaredVariables: Deno - static deno namespace
  return from(Deno.watchFs(path)).pipe(
    filter((event) => {
      return event.kind === 'modify';
    }),
    // most editors emit several events when saving file
    debounceTime(100),
    map(() => {
      return parseJsonFileSync<T>(path);
    }),
    startWith(parseJsonFileSync<T>(path)),
  );
}
