import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const envModule = ConfigModule.forRoot({
  isGlobal: true,
});

import { UsersModule } from './users/users.module';

@Module({
  imports: [envModule, UsersModule],
})
export class AppModule {}
