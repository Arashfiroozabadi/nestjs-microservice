import { Module } from '@nestjs/common';
import { MATH_SERVICE, UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsStrategy } from '../common/strategies/nats.strategy';

@Module({
  imports: [
    ClientsModule.register([{ name: MATH_SERVICE, transport: Transport.TCP }]),
    NatsStrategy,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
