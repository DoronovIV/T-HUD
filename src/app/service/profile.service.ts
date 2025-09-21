import type { Observable } from 'npm:rxjs';
import { Paths } from '../const.ts';
import type { Profile } from '../model/profile.type.ts';
import { fileContents$ } from './basic/file.service.ts';

export const profile$: Observable<Profile> = fileContents$(`${Paths.Test}/.profile.jsonc`);
