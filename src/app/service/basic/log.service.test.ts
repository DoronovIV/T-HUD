import { Buffer } from 'node:buffer';
import { expect } from '@std/expect/expect';
import { Paths } from '../../const.ts';
import { fileLog } from './log.service.ts';

Deno.test('Should create error file if it does not exist', () => {
  try {
    Deno.remove(Paths.ErrorLog);
  } finally {
    fileLog('test 1');

    const text = Deno.readTextFileSync(Paths.ErrorLog);
    const includes = text.includes('test 1');

    expect(includes).toEqual(true);
  }
});

/** post couple of different errors to the file */
Deno.test('Should put error into the log file', () => {
  const testErrorMessage = 'Test error message';
  const firstErrorObj = new Error(`${testErrorMessage}1`);
  const thirdErrorObj = new Error(`${testErrorMessage}2`);

  fileLog(firstErrorObj);

  try {
    Deno.readTextFileSync('test 2');
  } catch (err: unknown) {
    fileLog(err);
  } finally {
    fileLog(thirdErrorObj);

    const fileContents = Deno.readTextFileSync(Paths.ErrorLog);

    const firstErrorWritten = fileContents.includes(testErrorMessage);
    const secondErrorWritten = fileContents.includes('test 2');
    const thirdErrorWritten = fileContents.includes(testErrorMessage);

    expect(firstErrorWritten).toEqual(true);
    expect(secondErrorWritten).toEqual(true);
    expect(thirdErrorWritten).toEqual(true);
  }
});

Deno.test('Should clear file with more than 10 KB size', () => {
  try {
    Deno.remove(Paths.ErrorLog);
  } finally {
    const buffer = Buffer.alloc(10260);

    Deno.writeFileSync(Paths.ErrorLog, buffer);

    fileLog('test 3');

    const { size } = Deno.lstatSync(Paths.ErrorLog);

    expect(size).toEqual(8);
  }
});
