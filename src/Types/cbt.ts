export type CbtSiswa = {
	id_siswa: number;
	nisn: number;
	nis: string;
	nama: string;
	username: string;
	password: string;
	agama: string;
	jenis_kelamin: string;
	nama_kelas: string;
	id_kelas: number;
};

export enum BankSoalStatus {
	Aktif = 1,
	Nonaktif = 0,
}

export enum BankSoalStatusSoal {
	Selesai = 1,
	BelumSelesai = 0,
}

export type CbtBankSoal = {
	bank_kode: string;
	status: BankSoalStatus;
	status_soal: BankSoalStatusSoal;
	nama_mapel: string;
	nama_guru: string;
	nama_jenis?: string;
};

export type CbtRuangDanSesi = {
	id_siswa: number;
	nama: string;
	nama_ruang: string;
	nama_sesi: string;
	waktu_mulai: string;
	waktu_akhir: string;
};
