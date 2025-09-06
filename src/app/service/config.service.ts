import type { Observable } from 'npm:rxjs';
import type { Config } from '../model/config.type.ts';
import { fileContents$ } from './basic/file.service.ts';

const testConfigPath = './src/config.json';

export const profile$: Observable<Config> = fileContents$(testConfigPath);
