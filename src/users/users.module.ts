import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';  // 👈 must import
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  providers: [UsersService],
  controllers: [UsersController], // 👈 include the controller here
  exports: [UsersService],
})
export class UsersModule {}
