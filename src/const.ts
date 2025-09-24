import { deepStrictEqual } from 'node:assert';

const SystemHome: string | undefined = Deno.env.get('HOME');
const ConfigRoot = `${SystemHome}/.config/t-hud`;

// biome-ignore lint/nursery/useExplicitType: Biome cannot infer type for some reason
export const Paths = {
  ConfigRoot,
  ConfigFile: `${ConfigRoot}/config.jsonc`,
  Test: `${ConfigRoot}/.test`,
  FileLog: `${ConfigRoot}/error-log.txt`,
};

export function equal(first: unknown, second: unknown): boolean {
  try {
    deepStrictEqual(first, second);

    return true;
  } catch {
    return false;
  }
}
