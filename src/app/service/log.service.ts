/** @todo implement log file */
export function log(...args: unknown[]): void {
  // biome-ignore lint/suspicious/noConsole: Error logging
  console.log(...args);
}
