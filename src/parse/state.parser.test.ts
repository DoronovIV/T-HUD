import { expect } from '@std/expect';
import { MockState } from '../mock.ts';
import { isEngineStat, parseStat, parseState } from './state.parser.ts';

/** Adjustment for engine `index` property */
const Index = 1;

Deno.test('Should detect an engine stat', () => {
  const engineStat = 'water temp 2, C';
  const nonEngineStat = 'AoA, deg';

  expect(isEngineStat(engineStat)).toEqual(true);
  expect(isEngineStat(nonEngineStat)).toEqual(false);
});

Deno.test('Should tell if a plane is a jet or a prop', () => {
  const { BV238 } = MockState.Props;
  const { F15E } = MockState.Jets;

  const parsedBV238 = parseState(BV238);
  const parsedF15E = parseState(F15E);

  expect(parsedBV238?.propEngines.length).toEqual(6);
  expect(parsedF15E?.jetEngines.length).toEqual(2);
});

Deno.test('Should map stat', () => {
  const MockStat = MockState.Props.BV238['AoA, deg'];
  const parsedStat = parseStat('AoA, deg', MockStat);

  const MockEngineStat = MockState.Props.BV238['water temp 2, C'];
  const parsedEngineStat = parseStat('water temp 2, C', MockEngineStat);

  expect(parsedStat.engineIndex).toEqual(-1);

  expect(parsedEngineStat.engineIndex).toEqual(2);
  expect(parsedEngineStat.stat.value).toEqual(61);
});

Deno.test('Should map state', () => {
  const mockObject = MockState.Props.BV238;
  const parsedState = parseState(mockObject);

  expect(parsedState?.AoA.value).toEqual(MockState.Props.BV238['AoA, deg']);
  expect(parsedState?.propEngines.length).toEqual(6);
});

Deno.test('Should map all engines', () => {
  const { BV238, B29A } = MockState.Props;
  const { F117, F15E, F14A } = MockState.Jets;

  let allEnginesParsed = true;

  const BV238EngineStatCount = Index + 12;
  const B29AEngineStatCount = Index + 13;

  allEnginesParsed &&= _checkEnginesStats(BV238, BV238EngineStatCount);
  allEnginesParsed &&= _checkEnginesStats(B29A, B29AEngineStatCount);

  const F117EngineStateCount = Index + 7;
  const F15EEngineStateCount = Index + 7;
  const F14AEngineStateCount = Index + 7;

  allEnginesParsed &&= _checkEnginesStats(F117, F117EngineStateCount);
  allEnginesParsed &&= _checkEnginesStats(F15E, F15EEngineStateCount);
  allEnginesParsed &&= _checkEnginesStats(F14A, F14AEngineStateCount);

  const parsedF117 = parseState(F117);

  expect(allEnginesParsed).toEqual(true);
  expect(parsedF117?.jetEngines.length).toEqual(2);
});

Deno.test('Should map units correctly', () => {
  const { BV238 } = MockState.Props;
  const { F117 } = MockState.Jets;

  const parsedBV238 = parseState(BV238);
  const parsedF117 = parseState(F117);

  expect(parsedBV238?.propEngines.at(0)?.throttle.units).toEqual('%');
  expect(parsedBV238?.propEngines.at(0)?.power.units).toEqual('hp');
  expect(parsedBV238?.propEngines.at(5)?.throttle.units).toEqual('%');
  expect(parsedBV238?.propEngines.at(5)?.efficiency.units).toEqual('%');

  expect(parsedF117?.jetEngines.at(0)?.manifoldPressure.units).toEqual('atm');
  expect(parsedF117?.jetEngines.at(1)?.oilTemp.units).toEqual('C');
  expect(parsedF117?.jetEngines.at(0)?.throttle.units).toEqual('%');
  expect(parsedF117?.jetEngines.at(1)?.efficiency.units).toEqual('%');
});

Deno.test('Should map values correctly', () => {
  const { BV238 } = MockState.Props;
  const { F117 } = MockState.Jets;

  const parsedBV238 = parseState(BV238);
  const parsedF117 = parseState(F117);

  expect(parsedBV238?.propEngines.at(0)?.throttle.value).toEqual(100);
  expect(parsedBV238?.propEngines.at(0)?.power.value).toEqual(1533);
  expect(parsedBV238?.propEngines.at(5)?.throttle.value).toEqual(100);
  expect(parsedBV238?.propEngines.at(5)?.efficiency.value).toEqual(71);

  expect(parsedF117?.jetEngines.at(0)?.manifoldPressure.value).toEqual(1);
  expect(parsedF117?.jetEngines.at(1)?.oilTemp.value).toEqual(8);
  expect(parsedF117?.jetEngines.at(0)?.throttle.value).toEqual(0);
  expect(parsedF117?.jetEngines.at(1)?.efficiency.value).toEqual(0);
});

function _checkEnginesStats(state: object, propertiesCount: number): boolean {
  const parsedState = parseState(state);

  if (!parsedState) {
    return false;
  }

  const { propEngines, jetEngines } = parsedState;
  const engines = propEngines.length ? propEngines : jetEngines;

  return engines.every((engine) => {
    return Object.values(engine).length === propertiesCount;
  });
}
