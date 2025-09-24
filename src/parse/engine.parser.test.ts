import { expect } from 'jsr:@std/expect';
import { State } from '../mock.ts';
import { isPropEngine, parseEngineStat, parseEngines } from './engine.parser.ts';

// biome-ignore lint/suspicious/noExplicitAny: Unit testing
const MockState: any = State.Props.BV238;

Deno.test('Should parse engine', () => {
  const { props, jets } = parseEngines(MockState);

  expect(props[0].RPM.value).toEqual(1254);
  expect(jets.length).toEqual(0);
});

Deno.test('Parse engine stat', () => {
  const stats = Object.entries(MockState)
    .map(([key, value]) => {
      return parseEngineStat(key, value as number | boolean);
    })
    .filter(({ stat }) => {
      return stat?.value !== undefined;
    });

  expect(stats.length).toEqual(17);
});

/** @todo add test for a jet engine */
Deno.test('IsPropEngine should work as expected', () => {
  expect(isPropEngine(JSON.stringify(MockState), 1)).toEqual(true);
  expect(isPropEngine(JSON.stringify(MockState), 2)).toEqual(true);

  /** there's no engine 7 */
  expect(isPropEngine(JSON.stringify(MockState), 7)).toEqual(false);
});
