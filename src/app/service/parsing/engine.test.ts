import { expect } from 'jsr:@std/expect';
import { TestEngine } from '../../const.ts';
import { parseEngineStat } from './engine.ts';

// Deno.test('Parse engine', () => {
//   const { props } = parseEngines(TestEngine);

//   expect(props[0].RPM.value).toBe(1254);
// });

Deno.test('Parse engine stat', () => {
  const stats = Object.entries(TestEngine)
    .map(([key, value]) => {
      return parseEngineStat(key, value);
    })
    .filter((stat) => {
      return stat?.value !== undefined;
    });

  expect(stats.length).toEqual(26);
});
