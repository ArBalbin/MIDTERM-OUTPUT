import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(username: string, password: string, role = 'user') {
    const hashed = await bcrypt.hash(password, 10);
    const pool = this.db.getPool();
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashed, role]
    );
    return { id: (result as any).insertId, username, role };
  }

  async findByUsername(username: string) {
    const pool = this.db.getPool();
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    return (rows as any[])[0];
  }

  async findById(id: number) {
    const pool = this.db.getPool();
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as any[])[0];
  }

async findAll() {
  const pool = this.db.getPool();
  const [rows] = await pool.execute('SELECT * FROM users');
  return rows as any[];
}

  async setRefreshToken(userId: number, token: string | null) {
    const pool = this.db.getPool();
    await pool.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [token, userId]);
    return { userId, refreshToken: token };
  }

  
  async deleteUser(id: number) {
    const pool = this.db.getPool();

    
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    const user = (rows as any[])[0];
    if (!user) return null;

  
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    return { message: 'User deleted successfully', user };
  }

async updateUser(id: number, data: { username?: string; password?: string; role?: string }) {
  const pool = this.db.getPool();

  let fields: string[] = [];
  let values: any[] = [];

  if (data.username) {
    fields.push('username = ?');
    values.push(data.username);
  }
  if (data.password) {
    const hashed = await bcrypt.hash(data.password, 10);
    fields.push('password = ?');
    values.push(hashed);
  }
  if (data.role) {
    fields.push('role = ?');
    values.push(data.role);
  }

  if (fields.length === 0) return { message: 'No updates provided' };

  values.push(id);
  await pool.execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);

  return this.findById(id);
}
}