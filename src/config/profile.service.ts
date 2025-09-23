import type { Observable } from 'npm:rxjs';
import { Paths } from '../const.ts';
import type { Profile } from '../core/model/profile.type.ts';
import { fileContents$ } from '../core/service/file.service.ts';

export const profile$: Observable<Profile> = fileContents$(`${Paths.Test}/.profile.jsonc`);
