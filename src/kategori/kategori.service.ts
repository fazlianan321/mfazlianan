import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from '../prisma.service';
import { metadata } from 'reflect-metadata/no-conflict';

@Injectable()
export class KategoriService {
  // buat constructor untuk inject prisma service
  constructor(private readonly prisma: PrismaService) {}

  async create(createKategoriDto: CreateKategoriDto) {
    // return 'This action adds a new kategori';

    // buat variable untuk filter nama
    const nama_filter = createKategoriDto.nama
      .replace(/\s/g, '')
      .toLowerCase()
      .trim();

    // return {
    //   nama: nama_filter,
    // };

    // apakha nama katagori sudah ada
    const exist = await this.prisma.kategori.findFirst({
      where: {
        nama_filter: nama_filter,
        email: createKategoriDto.email,
      },
    });

    //jika nama kategori sudah ada
    if (exist) {
      throw new ConflictException({
        success: false,
        message: 'Data Kategori gagal disimpan ! (nama kategori sudah ada)',
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }

    //jika nama kategori beum ada
    // simpan data kategori
    await this.prisma.kategori.create({
      data: {
        email: createKategoriDto.email,
        nama: createKategoriDto.nama,
        nama_filter: nama_filter,
      },
    });

    return {
      success: true,
      message: 'Data Kategori berhasil disimpan',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // buat fungsi untuk tampil data kategori
  async findAll() {
    // return `This action returns all kategori`;
    // tampilkan data kategori
    const data = await this.prisma.kategori.findMany();

    //jika data tidak ditemukan
    if (data.length === 0) {
      // throw new HttpException(
      //   {
      //   success: false,
      //   message: 'Data kategori tidak ditemukan',
      //   metadata: {
      //     status: HttpStatus.NOT_FOUND,
      //     total_data: data.length,
      //   },
      //  },
      //  HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException({
        success: false,
        message: 'Data kategori tidak ditemukan',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    return {
      success: true,
      message: '',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  //Detail data
  async findOne(id: number) {
    // return `This action returns a #${id} kategori`;

    try {
      //tampilkan data berrdasarkan id
      const data = await this.prisma.kategori.findUnique({
        where: { id: id },
      });

      //jika data tidak ditemukan
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Data kategori tidak ditemukan',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      //jika data ditemukan
      return {
        success: true,
        message: '',
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Parameter / slug ID harus angka',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  //buat fungsi update data kategori
  async update(id: number, updateKategoriDto: UpdateKategoriDto) {
    // return `This action updates a #${id} kategori`;

    try {
      //tampilkan data berrdasarkan id
      const data = await this.prisma.kategori.findUnique({
        where: { id: id },
      });

      //jika data tidak ditemukan
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Data kategori tidak ditemukan',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      //jika data ditemukan
      // buat variable untuk filter nama
      const nama_filter = (updateKategoriDto.nama ?? '')
        .replace(/\s/g, '')
        .toLowerCase()
        .trim();
      //ubah data kategori berdasarkan id
      await this.prisma.kategori.update({
        where: { id: id },
        data: {
          email: updateKategoriDto.email,
          nama: updateKategoriDto.nama,
          nama_filter: nama_filter,
        },
      });
      return {
        success: true,
        message: 'Data kategori berhasil diupdate',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Parameter / slug ID harus angka',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  //buat fungsi hapus data kategori
  async remove(id: number) {
    // return `This action removes a #${id} kategori`;

    try {
      //tampilkan data berrdasarkan id
      const data = await this.prisma.kategori.findUnique({
        where: { id: id },
      });

      //jika data tidak ditemukan
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Data kategori tidak ditemukan',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      //jika data ditemukan
      //hapus data kategori berdasarkan id

      await this.prisma.kategori.delete({
        where: { id: id },
      });
      return {
        success: true,
        message: 'Data kategori berhasil dihapus',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Parameter / slug ID harus angka',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
