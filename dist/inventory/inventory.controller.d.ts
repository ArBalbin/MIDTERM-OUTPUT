import { InventoryService, InventoryItem } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAll(): Promise<InventoryItem[]>;
    findOne(id: string): Promise<InventoryItem>;
    create(item: InventoryItem): Promise<any>;
    update(id: string, updateData: Partial<InventoryItem>): Promise<any>;
    remove(id: string): Promise<any>;
}
