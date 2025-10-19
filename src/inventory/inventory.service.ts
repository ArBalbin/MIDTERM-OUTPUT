import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface InventoryItem {
  id?: number;
  item_name: string;  
  quantity: number;
  unit?: string;
  price?: number;
}

@Injectable()
export class InventoryService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<InventoryItem[]> {
    const [rows] = await this.db.query('SELECT * FROM inventory');
    return rows as InventoryItem[];
  }

  async findOne(id: number): Promise<InventoryItem | null> {
    const [rows] = await this.db.query('SELECT * FROM inventory WHERE id = ?', [id]);
    return (rows as InventoryItem[])[0] || null;
  }

  async create(item: InventoryItem): Promise<any> {
    const { item_name, quantity, unit, price } = item;
    const [result]: any = await this.db.query(
      'INSERT INTO inventory (item_name, quantity, unit, price) VALUES (?, ?, ?, ?)',
      [item_name, quantity, unit ?? null, price ?? 0],
    );
    return { id: result.insertId, ...item };
  }

  async update(id: number, updateData: Partial<InventoryItem>): Promise<any> {
    const fields = Object.keys(updateData)
      .map(field => `${field} = ?`)
      .join(', ');

    const values = Object.values(updateData);
    values.push(id);

    await this.db.query(`UPDATE inventory SET ${fields} WHERE id = ?`, values);
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const item = await this.findOne(id);
    if (!item) return null;

    await this.db.query('DELETE FROM inventory WHERE id = ?', [id]);
    return item;
  }
}
