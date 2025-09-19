import type { JetEngine } from '../../model/api/state/jet-engine.type.ts';
import type { PropEngine } from '../../model/api/state/prop-engine.type.ts';
import type { Stat } from '../../model/stat.type.ts';

export function parseEngines(input: object): { props: PropEngine[]; jets: JetEngine[] } {
  const stringInput = JSON.stringify(input);
  const result: { props: PropEngine[]; jets: JetEngine[] } = { props: [], jets: [] };

  let currentEngine = { index: 1 };

  Object.entries(input).forEach(([key, value]) => {
    const match = key.match(/(.+)\s(\d+)$/);

    if (match) {
      const [, propertyName, engineIndex] = match;
      const index = parseInt(engineIndex, 10);
      const stat = parseEngineStat(propertyName, value);

      if (!stat) {
        return;
      }

      if (index !== currentEngine.index) {
        if (isPropEngine(stringInput, currentEngine.index)) {
          result.props.push(currentEngine as PropEngine);
        } else {
          result.jets.push(currentEngine as JetEngine);
        }

        currentEngine = { index };
      }

      Object.defineProperty(currentEngine, propertyName, { value: stat });
    }
  });

  return result;
}

export function parseEngineStat(name: string, value: number | boolean): Stat | null {
  // the problem is here
  if (!name.match(/(.*\s)*\d+.*/)) {
    return null;
  }

  let units: string | undefined;

  const spaceCharacter = ' ';
  const pieces = name.split(spaceCharacter);

  /** one for the units */
  if (name.includes(',')) {
    units = pieces.pop();
  }

  pieces.pop();

  const statName = pieces.join(spaceCharacter);

  if (!units) {
    return {
      name: statName,
      value,
    };
  }

  return {
    name: statName,
    units,
    value,
  };
}

function isPropEngine(jsonString: string, engineIndex: number): boolean {
  // Look for "pitch" followed by the specific engine index with proper boundaries
  const pitchRegex = new RegExp(`"pitch\\s${engineIndex}(?:",|,"|\\s)`, 'i');

  return pitchRegex.test(jsonString);
}
