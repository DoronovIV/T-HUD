import type { JetEngine } from '../core/model/api/jet-engine.type.ts';
import type { PropEngine } from '../core/model/api/prop-engine.type.ts';
import type { State } from '../core/model/api/state.type.ts';
import type { Stat } from '../core/model/stat.type.ts';
import { fileLog } from '../core/service/log.service.ts';

export function parseState(state: object): State | null {
  const result = {};
  const [jets, props]: [JetEngine[], PropEngine[]] = [[], []];

  let currentEngine = { index: 1 };

  try {
    Object.entries(state).forEach(([key, value], index, entries) => {
      const { stat, engineIndex } = parseStat(key, value);

      /** not an engine stat */
      if (engineIndex === -1) {
        Object.defineProperty(result, stat.name, { value: stat, writable: true, enumerable: true });

        return;
      }

      const isNextEngine = currentEngine.index !== engineIndex;
      const isLastEngine = index === entries.length - 1;

      /** complete engine mapping */
      if (isNextEngine || isLastEngine) {
        const listToPush = isPropEngine(currentEngine) ? props : jets;

        listToPush.push(currentEngine as PropEngine | JetEngine);

        if (isLastEngine) {
          Object.defineProperty(currentEngine, stat.name, {
            value: stat,
            writable: true,
            enumerable: true,
          });
        }

        currentEngine = { index: engineIndex };
      }

      /** add next engine stat */
      Object.defineProperty(currentEngine, stat.name, {
        value: stat,
        writable: true,
        enumerable: true,
      });
    });

    Object.defineProperties(result, {
      propEngines: {
        value: props,
        writable: true,
        enumerable: true,
      },
      jetEngines: {
        value: jets,
        writable: true,
        enumerable: true,
      },
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
): { stat: Stat; engineIndex: number } {
  const result = { stat: {}, engineIndex: -1 };
  const pieces = stringStat.split(' ');

  if (stringStat.includes(',')) {
    Object.defineProperty(result.stat, 'units', {
      value: pieces.pop(),
      writable: true,
      enumerable: true,
    });

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

  Object.defineProperties(result.stat, {
    name: {
      value: statName,
      writable: true,
      enumerable: true,
    },
    value: {
      value,
      writable: true,
      enumerable: true,
    },
  });

  return result as { stat: Stat; engineIndex: number };
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
