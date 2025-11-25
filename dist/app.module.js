"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const database_module_1 = require("./database/database.module");
const inventory_module_1 = require("./inventory/inventory.module");
const positions_module_1 = require("./positions/positions.module");
let AppModule = class AppModule {
    constructor() {
        console.log('Modules loaded:', {
            AuthModule: auth_module_1.AuthModule,
            UsersModule: users_module_1.UsersModule,
            DatabaseModule: database_module_1.DatabaseModule,
            InventoryModule: inventory_module_1.InventoryModule,
            PositionsModule: positions_module_1.PositionsModule,
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            inventory_module_1.InventoryModule,
            positions_module_1.PositionsModule,
        ],
        controllers: [],
        providers: [],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map