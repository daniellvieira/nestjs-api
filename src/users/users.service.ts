import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: string) {
    return this.userModel.findByPk(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    return user.update(updateUserDto);
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id);
    user.destroy();
  }
}
