import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const valid = await bcrypt.compare(pass, user.password);
    if (valid) {
      return { id: user.id, username: user.username, role: user.role };
    }
    return null;
  }

  async login(user: { id: number; username: string; role: string }) {
    const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };

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

  async logout(userId: number) {
    await this.usersService.setRefreshToken(userId, null);
    return { message: 'Logged out' };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_secret',
      });

      const user = await this.usersService.findById(decoded.sub);
      if (!user) throw new UnauthorizedException('Invalid refresh token');
      if (user.refresh_token !== refreshToken) {
        throw new UnauthorizedException('Refresh token mismatch');
      }

      const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };

      const newAccessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'access_secret',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '900s',
      });

      return { accessToken: newAccessToken, refreshToken };
    } catch {
      throw new UnauthorizedException('Could not refresh tokens');
    }
  }
}
