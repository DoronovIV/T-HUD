export const ConfigFolder = `${Deno.env.get('HOME')}/.config/t-hud`;
export const TestFolder = `${ConfigFolder}/.test`;

export const TestEngine = {
  valid: true,
  'aileron, %': -0,

  /** prop engine 1 */
  'throttle 1, %': 110,
  'RPM throttle 1, %': 100,
  'mixture 1, %': 100,
  'radiator 1, %': 0,
  'compressor stage 1': 2,
  'magneto 1': 3,
  'power 1, hp': 209.7,
  'RPM 1': 1254,
  'manifold pressure 1, atm': 0.74,
  'oil temp 1, C': 46,
  'pitch 1, deg': 20.0,
  'thrust 1, kgs': 256,
  'efficiency 1, %': 1,

  /** prop engine 2 */
  'throttle 2, %': 110,
  'RPM throttle 2, %': 100,
  'mixture 2, %': 100,
  'radiator 2, %': 0,
  'compressor stage 2': 2,
  'magneto 2': 3,
  'power 2, hp': 209.7,
  'RPM 2': 1254,
  'manifold pressure 2, atm': 0.74,
  'oil temp 2, C': 46,
  'pitch 2, deg': 20.0,
  'thrust 2, kgs': 256,
  'efficiency 2, %': 1,
};
