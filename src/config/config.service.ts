import type { Observable } from 'npm:rxjs';
import { Paths } from '../const.ts';
import type { Config } from '../core/model/config.type.ts';
import { fileContents$ } from '../core/service/file.service.ts';

export const config$: Observable<Config> = fileContents$(Paths.Config);
