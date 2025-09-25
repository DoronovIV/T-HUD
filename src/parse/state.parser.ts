import type { JetEngine } from '../core/model/api/jet-engine.type.ts';
import type { PropEngine } from '../core/model/api/prop-engine.type.ts';
import type { State } from '../core/model/api/state.type.ts';
import type { Stat } from '../core/model/stat.type.ts';
import { fileLog } from '../core/service/log.service.ts';
import { addProperties, addProperty } from './util.ts';

export function parseState(state: object): State | null {
  const result = {};
  const [jets, props]: [JetEngine[], PropEngine[]] = [[], []];

  let currentEngine = { index: 1 };

  try {
    Object.entries(state).forEach(([key, value], index, entries) => {
      const { stat, statName, engineIndex } = parseStat(key, value);

      /** not an engine stat */
      if (engineIndex === -1) {
        addProperty(result, statName, stat);

        return;
      }

      const isNextEngine = currentEngine.index !== engineIndex;
      const isLastEngine = index === entries.length - 1;

      /** complete engine mapping */
      if (isNextEngine || isLastEngine) {
        const listToPush = isPropEngine(currentEngine) ? props : jets;

        listToPush.push(currentEngine as PropEngine | JetEngine);

        if (isLastEngine) {
          addProperty(currentEngine, statName, stat);
        }

        currentEngine = { index: engineIndex };
      }

      addProperty(currentEngine, statName, stat);
    });

    addProperties(result, {
      propEngines: props,
      jetEngines: jets,
    });

    return result as State;
  } catch (err: unknown) {
    fileLog(err);

    return null;
  }
}

export function parseStat(
  stringStat: string,
  value: number | boolean,
): { stat: Stat; statName: string; engineIndex: number } {
  const result = { stat: {}, engineIndex: -1 };
  const pieces = stringStat.split(' ');

  if (stringStat.includes(',')) {
    addProperty(result.stat, 'units', pieces.pop());

    const index = pieces.findIndex((piece) => {
      return piece.endsWith(',');
    });

    pieces[index] = pieces[index]?.replace(',', '');
  }

  if (isEngineStat(stringStat)) {
    const engineIndex = pieces.pop() ?? -1;

    result.engineIndex = +engineIndex;
  }

  const statName = pieces
    .map((piece, index) => {
      if (index) {
        return piece.charAt(0).toUpperCase() + piece.slice(1);
      }

      return piece;
    })
    .join('');

  addProperty(result, 'statName', statName);
  addProperty(result.stat, 'value', value);

  return result as { stat: Stat; statName: string; engineIndex: number };
}

export function isPropEngine(engine: PropEngine | JetEngine | object): boolean {
  return !!Object.keys(engine).find((key) => {
    return key.startsWith('pitch');
  });
}

export function isEngineStat(fullStatName: string): boolean {
  const pattern = /(.+)\s(\d+)/;

  return !!fullStatName.match(pattern);
}
