"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async createUser(username, password, role = 'user') {
        const hashed = await bcrypt.hash(password, 10);
        const pool = this.db.getPool();
        const [result] = await pool.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashed, role]);
        return { id: result.insertId, username, role };
    }
    async findByUsername(username) {
        const pool = this.db.getPool();
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }
    async findById(id) {
        const pool = this.db.getPool();
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
    async findAll() {
        const pool = this.db.getPool();
        const [rows] = await pool.execute('SELECT * FROM users');
        return rows;
    }
    async setRefreshToken(userId, token) {
        const pool = this.db.getPool();
        await pool.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [token, userId]);
        return { userId, refreshToken: token };
    }
    async deleteUser(id) {
        const pool = this.db.getPool();
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        const user = rows[0];
        if (!user)
            return null;
        await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        return { message: 'User deleted successfully', user };
    }
    async updateUser(id, data) {
        const pool = this.db.getPool();
        let fields = [];
        let values = [];
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
        if (fields.length === 0)
            return { message: 'No updates provided' };
        values.push(id);
        await pool.execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
        return this.findById(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map