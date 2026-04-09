import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KategoriModule } from './kategori/kategori.module';
import { WisataModule } from './wisata/wisata.module';

@Module({
  imports: [KategoriModule, WisataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
