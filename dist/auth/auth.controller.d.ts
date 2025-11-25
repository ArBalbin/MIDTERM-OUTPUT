import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        id: any;
        username: string;
        role: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    } | {
        error: string;
    }>;
    logout(body: {
        userId: number;
    }): Promise<{
        message: string;
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
