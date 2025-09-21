import type { Observable } from 'npm:rxjs';
import { Paths } from '../const.ts';
import type { Config } from '../model/config.type.ts';
import { fileContents$ } from './basic/file.service.ts';

export const config$: Observable<Config> = fileContents$(Paths.Config);
