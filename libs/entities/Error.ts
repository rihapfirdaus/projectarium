export interface Error {
  status: boolean | string;
  message: ErrorMessage;
}

export enum ErrorMessage {
  None = "",
  Empty = "Data belum tersedia",
  Upcoming = "Fitur masih dikembangkan",
  Offline = "Anda sedang offline",
  NotFound = "Data tidak ditemukan",
  System = "Terjadi kesalahan sistem",
  Formatting = "Format tidak sesuai",
}
