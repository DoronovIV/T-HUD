import type { Observable } from 'npm:rxjs';
import { fileContents$ } from './basic/file.service.ts';

const testConfigPath = './src/assets/profile.json';

export const profile$: Observable<object> = fileContents$(testConfigPath);
