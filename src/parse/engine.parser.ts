import type { JetEngine } from '../core/model/api/jet-engine.type.ts';
import type { PropEngine } from '../core/model/api/prop-engine.type.ts';
import type { Stat } from '../core/model/stat.type.ts';

export function parseEngines(input: object): { props: PropEngine[]; jets: JetEngine[] } {
  const stringInput = JSON.stringify(input);
  const result: { props: PropEngine[]; jets: JetEngine[] } = { props: [], jets: [] };

  let currentEngine = { index: 1 };

  Object.entries(input).forEach(([key, value]) => {
    const { stat, engineIndex } = parseEngineStat(key, value);

    if (engineIndex === -1 || !stat) {
      return;
    }

    if (engineIndex !== currentEngine.index) {
      const isProp = isPropEngine(stringInput, currentEngine.index);
      const arrayToPush = isProp ? result.props : result.jets;

      arrayToPush.push(currentEngine as JetEngine | PropEngine);
      currentEngine = { index: engineIndex };
    }

    Object.defineProperty(currentEngine, stat.name, {
      value: stat,
      writable: true,
      enumerable: true,
    });
  });

  const isProp = isPropEngine(stringInput, currentEngine.index);
  const arrayToPush = isProp ? result.props : result.jets;

  arrayToPush.push(currentEngine as JetEngine | PropEngine);

  return result;
}

/** @todo make a return type */
export function parseEngineStat(
  name: string,
  value: number | boolean,
): { stat: Stat | null; engineIndex: number } {
  if (!name.match(/(.*\s)*\d+.*/)) {
    return { stat: null, engineIndex: -1 };
  }

  const noCommaName = name.replace(',', '');

  let units: string | undefined;

  const spaceCharacter = ' ';
  const pieces = noCommaName.split(spaceCharacter);
  const index = Number(
    pieces.find((piece) => {
      return !Number.isNaN(Number(piece));
    }),
  );

  /** one for the units */
  if (name.includes(',')) {
    units = pieces.pop();
  }

  pieces.pop();

  const statName = pieces.join(spaceCharacter);

  if (!units) {
    return {
      stat: {
        name: statName,
        value,
      },
      engineIndex: index,
    };
  }

  return {
    stat: {
      name: statName,
      units,
      value,
    },
    engineIndex: index,
  };
}

export function isPropEngine(jsonString: string, engineIndex: number): boolean {
  // Look for "pitch" followed by the specific engine index with proper boundaries
  const pitchRegex = new RegExp(`"pitch\\s*${engineIndex}[^"]*"`, 'i');

  return pitchRegex.test(jsonString);
}
