import type { Observable } from 'npm:rxjs';
import type { Profile } from '../model/profile.type.ts';
import { fileContents$ } from './basic/file.service.ts';

const testProfilePath = './src/assets/profile.json';

export const profile$: Observable<Profile> = fileContents$(testProfilePath);
