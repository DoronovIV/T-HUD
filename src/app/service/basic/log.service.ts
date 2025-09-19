/** biome-ignore-all lint/correctness/noUndeclaredVariables: global Deno namespace */
/** biome-ignore-all lint/suspicious/noConsole: error logging */

const root = '$HOME/.config/t-hud';
const BytesInKilobyte = 1000;
const TenKilobytes = 10;

/** Log args into the terminal */
export function log(...args: unknown[]): void {
  console.log(...args);
}

/** Put  */
export function error(arg: unknown): void {
  const logFilePath = `${root}/log.txt`;

  let append = true;

  try {
    const logFile = Deno.lstatSync(logFilePath);

    append = logFile.size / BytesInKilobyte > TenKilobytes;
  } catch (error: unknown) {
    append = error instanceof Deno.errors.NotFound;
  } finally {
    Deno.writeTextFileSync(logFilePath, String(arg), { append });
  }
}
