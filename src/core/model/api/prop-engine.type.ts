import type { Stat } from '../stat.type.ts';

export type PropEngine = {
  index: number;

  throttle: Stat;
  RPMThrottle: Stat;
  mixture: Stat;
  radiator?: Stat;
  compressorStage?: Stat;
  magneto?: Stat;
  power: Stat;
  RPM: Stat;
  manifoldPressure: Stat;
  oilTemp: Stat;
  pitch: Stat;
  thrust: Stat;
  efficiency: Stat;
};
