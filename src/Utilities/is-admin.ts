import { lowdb } from '@/Libraries/lowdb.js';

export const isAdmin = async (jid: string) => {
	await lowdb.read();

	return lowdb.data.developers.includes(jid) ?? lowdb.data.resetters.includes(jid);
};
