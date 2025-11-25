import { PositionsService } from './positions.service';
import { Request } from 'express';
export declare class PositionsController {
    private readonly positionsService;
    constructor(positionsService: PositionsService);
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    create(positionData: {
        position_code: string;
        title: string;
        description?: string;
    }, req: Request): Promise<{
        message: string;
        position_id: any;
        created_by: number;
    }>;
    update(id: number, positionData: {
        position_code?: string;
        title?: string;
        description?: string;
    }): Promise<{
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
