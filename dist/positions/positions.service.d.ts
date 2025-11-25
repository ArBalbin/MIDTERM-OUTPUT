import { DatabaseService } from '../database/database.service';
export declare class PositionsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    create(positionData: any, userId: number): Promise<{
        message: string;
        position_id: any;
        created_by: number;
    }>;
    update(id: number, positionData: any): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
    search(body: {
        position_code?: string;
        title?: string;
    }): Promise<any>;
}
