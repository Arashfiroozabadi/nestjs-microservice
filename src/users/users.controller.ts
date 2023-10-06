import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const MATH_SERVICE = 'MATH_SERVICE';

@Controller()
export class UsersController {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  execute(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const data = [1, 2];
    return this.client.send<number>(pattern, data);
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @Get('/add_user/:name')
  executeAddUser(@Param('name') name: string): Observable<string> {
    const pattern = { cmd: 'add_user' };
    return this.client.send<string>(pattern, name);
  }

  @MessagePattern({ cmd: 'add_user' })
  addUser(@Payload() data: string, @Ctx() context: NatsContext): string {
    return `data as ==> ${data} <== received successful`;
  }
}
