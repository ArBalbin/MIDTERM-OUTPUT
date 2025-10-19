import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { InventoryModule } from './inventory/inventory.module';
import { PositionsModule } from './positions/positions.module'; 

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UsersModule,
    DatabaseModule,
    InventoryModule,
    PositionsModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('Modules loaded:', {
      AuthModule,
      UsersModule,
      DatabaseModule,
      InventoryModule,
      PositionsModule, 
    });
  }
}
