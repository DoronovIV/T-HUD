import { deepStrictEqual } from 'node:assert';

const Home: string | undefined = Deno.env.get('HOME');
const Root = `${Home}/.config/t-hud`;

// biome-ignore lint/nursery/useExplicitType: Biome cannot infer type for some reason
export const Paths = {
  Root,
  Config: `${Root}/config.jsonc`,
  Test: `${Root}/.test`,
  ErrorLog: `${Root}/error-log.txt`,
};

export const TestEngine = {
  valid: true,
  'aileron, %': -0,

  /** prop engine 1 */
  'throttle 1, %': 110,
  'RPM throttle 1, %': 100,
  'mixture 1, %': 100,
  'radiator 1, %': 0,
  'compressor stage 1': 2,
  'magneto 1': 3,
  'power 1, hp': 209.7,
  'RPM 1': 1254,
  'manifold pressure 1, atm': 0.74,
  'oil temp 1, C': 46,
  'pitch 1, deg': 20.0,
  'thrust 1, kgs': 256,
  'efficiency 1, %': 1,

  /** prop engine 2 */
  'throttle 2, %': 110,
  'RPM throttle 2, %': 100,
  'mixture 2, %': 100,
  'radiator 2, %': 0,
  'compressor stage 2': 2,
  'magneto 2': 3,
  'power 2, hp': 209.7,
  'RPM 2': 1254,
  'manifold pressure 2, atm': 0.74,
  'oil temp 2, C': 46,
  'pitch 2, deg': 20.0,
  'thrust 2, kgs': 256,
  'efficiency 2, %': 1,
};

export function equal(first: unknown, second: unknown): boolean {
  try {
    deepStrictEqual(first, second);

    return true;
  } catch {
    return false;
  }
}
