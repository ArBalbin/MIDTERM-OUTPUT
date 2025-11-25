import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(body: {
        username: string;
        password: string;
        role?: string;
    }): Promise<{
        id: any;
        username: string;
        role: string;
    }>;
    getAllUsers(): Promise<any[]>;
    getUser(id: number): Promise<any>;
    deleteUser(id: number): Promise<{
        message: string;
        user: any;
    }>;
    updateUser(id: number, body: {
        username?: string;
        password?: string;
        role?: string;
    }): Promise<any>;
}
