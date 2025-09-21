/** biome-ignore-all lint/correctness/noUndeclaredVariables: global Deno namespace */
/** biome-ignore-all lint/suspicious/noConsole: error logging */

import { Paths } from '../../const.ts';

const BytesInKilobyte = 1000;
const TenKilobytes = 10;

/** Log args into the terminal */
export function consoleLog(...args: unknown[]): void {
  console.log(...args);
}

/** Put whatever passed (likely error) into the log file */
export function fileLog(error: unknown): void {
  console.error('Error emerged. See log.txt');

  const logFilePath = `${Paths.ErrorLog}`;

  let append = true;

  try {
    const logFileSize = Deno.lstatSync(logFilePath).size;

    append = logFileSize / BytesInKilobyte < TenKilobytes;
  } catch (error: unknown) {
    append = error instanceof Deno.errors.NotFound;
  } finally {
    Deno.writeTextFileSync(logFilePath, `${String(error)}\n\n`, { append });
  }
}
