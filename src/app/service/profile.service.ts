import type { Observable } from 'npm:rxjs';
import { TestFolder } from '../const.ts';
import type { Profile } from '../model/profile.type.ts';
import { fileContents$ } from './basic/file.service.ts';

const testProfilePath = `${TestFolder}/.profile.jsonc`;

export const profile$: Observable<Profile> = fileContents$(testProfilePath);
