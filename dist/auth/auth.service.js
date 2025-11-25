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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findByUsername(username);
        if (!user)
            return null;
        const valid = await bcrypt.compare(pass, user.password);
        if (valid) {
            return { id: user.id, username: user.username, role: user.role };
        }
        return null;
    }
    async login(user) {
        const payload = { sub: user.id, username: user.username, role: user.role };
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_secret',
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
        });
        await this.usersService.setRefreshToken(user.id, refreshToken);
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'access_secret',
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '900s',
            }),
            refreshToken,
        };
    }
    async logout(userId) {
        await this.usersService.setRefreshToken(userId, null);
        return { message: 'Logged out' };
    }
    async refreshTokens(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_secret',
            });
            const user = await this.usersService.findById(decoded.sub);
            if (!user)
                throw new common_1.UnauthorizedException('Invalid refresh token');
            if (user.refresh_token !== refreshToken) {
                throw new common_1.UnauthorizedException('Refresh token mismatch');
            }
            const payload = { sub: user.id, username: user.username, role: user.role };
            const newAccessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'access_secret',
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '900s',
            });
            return { accessToken: newAccessToken, refreshToken };
        }
        catch (_a) {
            throw new common_1.UnauthorizedException('Could not refresh tokens');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map