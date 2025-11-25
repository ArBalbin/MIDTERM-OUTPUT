import { DatabaseService } from '../database/database.service';
export interface InventoryItem {
    id?: number;
    item_name: string;
    quantity: number;
    unit?: string;
    price?: number;
}
export declare class InventoryService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<InventoryItem[]>;
    findOne(id: number): Promise<InventoryItem | null>;
    create(item: InventoryItem): Promise<any>;
    update(id: number, updateData: Partial<InventoryItem>): Promise<any>;
    remove(id: number): Promise<any>;
}
