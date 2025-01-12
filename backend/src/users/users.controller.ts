import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../common/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin) // Ensure this usage
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  async createUser(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
