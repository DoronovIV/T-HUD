import type { Observable } from 'npm:rxjs';
import { TestFolder } from '../const.ts';
import type { Config } from '../model/config.type.ts';
import { fileContents$ } from './basic/file.service.ts';

const testConfigPath = `${TestFolder}/.config.jsonc`;

export const config$: Observable<Config> = fileContents$(testConfigPath);
