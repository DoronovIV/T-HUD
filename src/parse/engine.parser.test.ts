import { expect } from 'jsr:@std/expect';
import { TestEngine } from '../const.ts';
import { isPropEngine, parseEngineStat, parseEngines } from './engine.parser.ts';

Deno.test('Should parse engine', () => {
  const { props, jets } = parseEngines(TestEngine);

  expect(props[0].RPM.value).toEqual(1254);
  expect(jets.length).toEqual(0);
});

Deno.test('Parse engine stat', () => {
  const stats = Object.entries(TestEngine)
    .map(([key, value]) => {
      return parseEngineStat(key, value);
    })
    .filter(({ stat }) => {
      return stat?.value !== undefined;
    });

  expect(stats.length).toEqual(26);
});

/** @todo add test for a jet engine */
Deno.test('IsPropEngine should work as expected', () => {
  expect(isPropEngine(JSON.stringify(TestEngine), 1)).toEqual(true);
  expect(isPropEngine(JSON.stringify(TestEngine), 2)).toEqual(true);

  /** there's no engine 3 */
  expect(isPropEngine(JSON.stringify(TestEngine), 3)).toEqual(false);
});
