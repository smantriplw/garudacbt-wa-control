import type { LowDataType } from '@/Types/lowdb.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export const lowdb = new Low<LowDataType>(new JSONFile('config.json'), {
	resetters: [],
	developers: [],
});
