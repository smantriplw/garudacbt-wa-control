import { CbtQueries } from '@/Constants/query-constant.js';
import { mysqlPool } from '@/Libraries/mysql.js';
import type { PoolConnection } from 'mysql2/promise';

export const resetSesiByIdSiswa = async (
	id: number,
	connection?: PoolConnection,
	withTransaction = false,
) => {
	try {
		if (connection) {
			if (withTransaction) {
				await connection.beginTransaction();
			}
			await connection.query(CbtQueries.QueryResetTest, [id]);
			if (withTransaction) {
				await connection.commit();
				connection.release();
			}
		} else {
			await mysqlPool.query(CbtQueries.QueryResetTest, [id]);
		}
		return true;
	} catch {
		return false;
	}
};

export const resetSesiByNisnOrNis = async (nisnOrNis: string) => {
	const connection = await mysqlPool.getConnection();
	await connection.beginTransaction();

	const [resultSiswa] = await connection.query(CbtQueries.QueryGetSiswaId, [
		nisnOrNis,
		nisnOrNis,
	]);
	const result = resultSiswa as Array<{ id_siswa: number }>;

	if (!result.length) {
		await connection.rollback();
		connection.release();

		return false;
	}

	const successReset = await resetSesiByIdSiswa(result[0].id_siswa, connection);
	if (!successReset) {
		await connection.rollback();
		connection.release();

		return false;
	}

	await connection.commit();
	connection.release();

	return successReset;
};
