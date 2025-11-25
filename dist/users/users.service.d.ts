import { DatabaseService } from '../database/database.service';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    createUser(username: string, password: string, role?: string): Promise<{
        id: any;
        username: string;
        role: string;
    }>;
    findByUsername(username: string): Promise<any>;
    findById(id: number): Promise<any>;
    findAll(): Promise<any[]>;
    setRefreshToken(userId: number, token: string | null): Promise<{
        userId: number;
        refreshToken: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
        user: any;
    }>;
    updateUser(id: number, data: {
        username?: string;
        password?: string;
        role?: string;
    }): Promise<any>;
}
