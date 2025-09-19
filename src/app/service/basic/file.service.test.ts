import { expect } from '@std/expect/expect';
import { TestEngine, TestFolder } from '../../const.ts';
import { parseJsonFileSync } from './file.service.ts';

const testDataPath = `${TestFolder}/.data.jsonc`;

function produceJsonData(): void {
  Deno.writeTextFile(testDataPath, JSON.stringify(TestEngine));
}

Deno.test('Should read json file contents', () => {
  produceJsonData();

  // biome-ignore lint/suspicious/noExplicitAny: Testing file read
  const data: any = parseJsonFileSync(testDataPath);

  expect(data['magneto 2']).toEqual(3);
});
