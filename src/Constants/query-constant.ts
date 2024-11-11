export enum CbtQueries {
	// Cek Nisn Query
	CekNisn = `SELECT 
    M.id_siswa, 
    M.nisn, 
    M.nis, 
    M.nama, 
    M.username, 
    M.password, 
    M.agama, 
    M.jenis_kelamin, 
    K.id_kelas, 
    MK.nama_kelas 
FROM 
    master_siswa AS M
LEFT JOIN 
    kelas_siswa AS K ON M.id_siswa = K.id_siswa
LEFT JOIN 
    master_kelas AS MK ON MK.id_kelas = K.id_kelas
WHERE 
    M.nisn = ? OR m.nis = ?`,

	// Cek Bank Soal Query
	CekBankSoal = `SELECT 
    C.bank_kode, 
    C.status, 
    C.status_soal, 
    MP.nama_mapel, 
    MG.nama_guru, 
    CJJ.nama_jenis
FROM 
    cbt_bank_soal AS C
LEFT JOIN 
    cbt_jadwal AS CJ ON CJ.id_bank = C.id_bank
LEFT JOIN 
    cbt_jenis AS CJJ ON CJ.id_jenis = CJJ.id_jenis
LEFT JOIN 
    master_mapel AS MP ON MP.id_mapel = C.bank_mapel_id
LEFT JOIN 
    master_guru AS MG ON MG.id_guru = C.bank_guru_id
WHERE 
    C.date >= CURDATE() - INTERVAL 1 MONTH
    AND C.date < CURDATE() + INTERVAL 1 DAY`,

	// Query Count Siswa
	CountSiswa = 'SELECT COUNT(*) as count FROM master_siswa AS MS LEFT JOIN master_kelas AS MK ON MK.siswa_id = MS.id_siswa;',

	// Query Count Mapel
	CountMapel = 'SELECT COUNT(*) as count FROM master_mapel',

	// Query Get ID Siswa
	QueryGetSiswaId = 'SELECT id_siswa as id FROM master_siswa WHERE nisn = ? OR nis = ?',

	// Query Reset Ujian
	QueryResetTest = 'UPDATE log_ujian as LU SET LU.reset = 1 WHERE LU.id_siswa = ? AND DATE(LU.log_time) >= CURRENT_DATE()',

	// Query Active Semester
	QueryActiveSemester = 'SELECT id_smt as active_semester FROM master_smt WHERE active = 1',

	// Query Get Room And Session
	QueryRoomAndSession = 'SELECT id_siswa, MS.nama, CR.nama_ruang, CS.nama_sesi, CS.waktu_mulai, CS.waktu_akhir FROM master_siswa as MS INNER JOIN cbt_sesi_siswa as CSS ON CSS.siswa_id = MS.id_siswa LEFT JOIN cbt_ruang as CR ON CR.id_ruang = CSS.ruang_id LEFT JOIN cbt_sesi as CS ON CS.id_sesi = CSS.sesi_id WHERE (MS.nisn = ? OR MS.nis = ?) AND CSS.smt_id = ?',
}
