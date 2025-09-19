import type { State } from '../../model/api/state/state.type.ts';
import type { Stat } from '../../model/stat.type.ts';
import { log } from '../basic/log.service.ts';

import { parseEngines } from './engine.ts';

export function parseState(input: object): State | null {
  const container = {};

  try {
    const { props, jets } = parseEngines(input);

    Object.defineProperty(container, 'propEngines', {
      value: props,
      writable: true,
      enumerable: true,
    });

    Object.defineProperty(container, 'jetEngines', {
      value: jets,
      writable: true,
      enumerable: true,
    });

    Object.entries(input).forEach(([key, value]) => {
      const stat = parseStat(key, value);

      if (!stat) {
        return;
      }

      Object.defineProperty(container, stat.name, {
        value: stat,
        writable: true,
        enumerable: true,
      });
    });

    return container as State;
  } catch (error: unknown) {
    log('error:', error);

    return null;
  }
}

function parseStat(name: string, value: number | boolean): Stat | null {
  const pieces = name.split(', ');

  if (name.match(/(.+)\s(\d+)$/)) {
    return null;
  }

  if (!pieces[1]) {
    return {
      name: pieces[0],
      value,
    };
  }

  return {
    name: pieces[0],
    units: pieces[1],
    value,
  };
}
