import { tap } from 'npm:rxjs';
import { expect } from '@std/expect/expect';
import { Paths, TestEngine } from '../../const.ts';
import { fileContents$, parseJsonFileSync } from './file.service.ts';

const testDataPath = `${Paths.Test}/.data.jsonc`;

const timeoutIds: number[] = [];

function resetDataFile(): void {
  Deno.writeTextFile(testDataPath, JSON.stringify(TestEngine));
}

Deno.test('Should parse json file contents', () => {
  resetDataFile();

  // biome-ignore lint/suspicious/noExplicitAny: Testing file read
  const data: any = parseJsonFileSync(testDataPath);

  expect(data['magneto 2']).toEqual(3);
});

Deno.test('Should react to each file edit', async () => {
  const testFilePath = `${Paths.Test}/.data.jsonc`;

  resetDataFile();

  const events: unknown[] = [];
  let resolveTest: () => void;

  const testPromise = new Promise<void>((resolve) => {
    resolveTest = resolve;
  });

  const sub = fileContents$(testFilePath)
    .pipe(
      tap((data) => {
        events.push(data);

        timeoutIds.push(
          setTimeout(() => {
            resolveTest();
          }, 50),
        );
      }),
    )
    .subscribe();

  // These will trigger synchronous file system events
  const engine1 = { ...TestEngine };
  engine1['aileron, %'] = 1;

  const engine2 = { ...TestEngine };
  engine2['throttle 1, %'] = 2;

  const engine3 = { ...TestEngine };
  engine3['RPM throttle 1, %'] = 3;

  timeoutIds.push(
    setTimeout(() => {
      Deno.writeTextFileSync(testDataPath, JSON.stringify(engine1));
    }, 10),
  );

  timeoutIds.push(
    setTimeout(() => {
      Deno.writeTextFileSync(testDataPath, JSON.stringify(engine2));
    }, 20),
  );

  timeoutIds.push(
    setTimeout(() => {
      Deno.writeTextFileSync(testDataPath, `${JSON.stringify(engine3)}\n/* comment */`);
    }, 30),
  );

  // Wait for the events to be processed
  await testPromise;

  timeoutIds.forEach((timeout) => {
    clearTimeout(timeout);
  });

  expect(events.length).toEqual(4);

  sub.unsubscribe();
});

Deno.test.afterAll(() => {
  resetDataFile();
});
