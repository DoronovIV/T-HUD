/** a value that has it's units and may have multiple names */
export type Stat = {
  name: string;
  value: number | boolean;
  units?: string;
};
