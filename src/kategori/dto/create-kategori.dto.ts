import { IsString, IsInt, Min, Max, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateKategoriDto {
  @IsString({ message: 'Nama kategori harus berupa teks' })
  @IsNotEmpty({ message: 'Nama kategori tidak boleh kosong' })
  nama_kategori: string;

  @IsInt({ message: 'Durasi panen harus berupa angka bulat (hari)' })
  @Min(1, { message: 'Durasi panen minimal adalah 1 hari' })
  durasi_panen: number;

  @IsOptional()
  @IsString({ message: 'Deskripsi harus berupa teks' })
  deskripsi?: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Suhu minimal tidak boleh di bawah 0' })
  suhu_minimal?: number;

  @IsOptional()
  @IsInt()
  @Max(50, { message: 'Suhu maksimal tidak boleh di atas 50' })
  suhu_maksimal?: number;
}