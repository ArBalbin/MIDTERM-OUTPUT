import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { username: string; password: string; role?: string }) {
    return this.usersService.createUser(body.username, body.password, body.role);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  
  @Put(':id')
async updateUser(
  @Param('id') id: number,
  @Body() body: { username?: string; password?: string; role?: string },
) {
  return this.usersService.updateUser(id, body);
}
}
