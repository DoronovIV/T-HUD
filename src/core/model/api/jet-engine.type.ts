import type { Stat } from '../stat.type.ts';

export type JetEngine = {
  index: number;

  throttle: Stat;
  power: Stat;
  RPM: Stat;
  manifoldPressure: Stat;
  oilTemp: Stat;
  thrust: Stat;
  efficiency: Stat;
};
