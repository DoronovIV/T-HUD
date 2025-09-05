import type { Stat } from '../../stat.type.ts';
import type { JetEngine } from './jet-engine.type.ts';
import type { PropEngine } from './prop-engine.type.ts';

/** 127.0.0.1:8111/state */
export type State = {
  valid: boolean;

  aileron: Stat;
  elevator: Stat;
  rudder: Stat;
  flaps?: Stat;
  gear: Stat;
  airbrake?: Stat;

  /** altitude, absolute */
  H: Stat;
  TAS: Stat;
  IAS: Stat;
  M: Stat;
  AoA: Stat;
  AoS: Stat;
  Ny: Stat;
  Vy: Stat;
  Wx: Stat;

  /** min fuel? */
  Mfuel1: Stat;
  /** max fuel? */
  Mfuel10: Stat;

  engines: PropEngine[] | JetEngine[];
};
