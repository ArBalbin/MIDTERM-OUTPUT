import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PositionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Get all positions
  async findAll() {
    const query = 'SELECT * FROM positions';
    const [rows]: any = await this.databaseService.query(query);
    return rows;
  }

  // Get a single position by ID
  async findById(id: number) {
    const query = 'SELECT * FROM positions WHERE position_id = ?';
    const [rows]: any = await this.databaseService.query(query, [id]);

    if (!rows || rows.length === 0) {
      return { message: 'Position not found' };
    }
    return rows[0];
  }

  // Create a new position (user_id is set automatically)
  async create(positionData: any, userId: number) {
    const query = `
      INSERT INTO positions (position_code, title, description, user_id)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      positionData.position_code,
      positionData.title,
      positionData.description || null,
      userId,
    ];

    const [result]: any = await this.databaseService.query(query, values);

    return {
      message: 'Position created successfully',
      position_id: result.insertId,
      created_by: userId,
    };
  }

  // Update a position
  async update(id: number, positionData: any) {
    const fields = [];
    const values = [];

    if (positionData.position_code) {
      fields.push('position_code = ?');
      values.push(positionData.position_code);
    }
    if (positionData.title) {
      fields.push('title = ?');
      values.push(positionData.title);
    }
    if (positionData.description) {
      fields.push('description = ?');
      values.push(positionData.description);
    }

    if (fields.length === 0) {
      return { message: 'No fields to update' };
    }

    const query = `UPDATE positions SET ${fields.join(', ')} WHERE position_id = ?`;
    values.push(id);

    const [result]: any = await this.databaseService.query(query, values);

    return result.affectedRows > 0
      ? { message: 'Position updated successfully' }
      : { message: 'Position not found' };
  }

  // Delete a position
  async delete(id: number) {
    const query = 'DELETE FROM positions WHERE position_id = ?';
    const [result]: any = await this.databaseService.query(query, [id]);

    return result.affectedRows > 0
      ? { message: 'Position deleted successfully' }
      : { message: 'Position not found' };
  }

  // Search positions
  async search(body: { position_code?: string; title?: string }) {
    let query = 'SELECT * FROM positions WHERE 1=1';
    const values = [];

    if (body.position_code) {
      query += ' AND position_code LIKE ?';
      values.push(`%${body.position_code}%`);
    }
    if (body.title) {
      query += ' AND title LIKE ?';
      values.push(`%${body.title}%`);
    }

    const [rows]: any = await this.databaseService.query(query, values);
    return rows.length ? rows : { message: 'No positions found' };
  }
}
