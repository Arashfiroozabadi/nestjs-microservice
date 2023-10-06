import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  @MessagePattern({ cmd: 'add_user' })
  addUser(data: any): Observable<any> {
    console.log('message get form add_user', data);
    return data;
  }
}
