import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

@Injectable()
export class KategoriService {
  constructor(private prisma: PrismaService) {}

  // Fungsi untuk menambah kategori baru
  async create(createKategoriDto: CreateKategoriDto) {
    return await this.prisma.kategori.create({
      data: createKategoriDto,
    });
  }