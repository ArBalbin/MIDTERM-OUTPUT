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
exports.PositionsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let PositionsService = class PositionsService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        const query = 'SELECT * FROM positions';
        const [rows] = await this.databaseService.query(query);
        return rows;
    }
    async findById(id) {
        const query = 'SELECT * FROM positions WHERE position_id = ?';
        const [rows] = await this.databaseService.query(query, [id]);
        if (!rows || rows.length === 0) {
            return { message: 'Position not found' };
        }
        return rows[0];
    }
    async create(positionData, userId) {
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
        const [result] = await this.databaseService.query(query, values);
        return {
            message: 'Position created successfully',
            position_id: result.insertId,
            created_by: userId,
        };
    }
    async update(id, positionData) {
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
        const [result] = await this.databaseService.query(query, values);
        return result.affectedRows > 0
            ? { message: 'Position updated successfully' }
            : { message: 'Position not found' };
    }
    async delete(id) {
        const query = 'DELETE FROM positions WHERE position_id = ?';
        const [result] = await this.databaseService.query(query, [id]);
        return result.affectedRows > 0
            ? { message: 'Position deleted successfully' }
            : { message: 'Position not found' };
    }
    async search(body) {
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
        const [rows] = await this.databaseService.query(query, values);
        return rows.length ? rows : { message: 'No positions found' };
    }
};
exports.PositionsService = PositionsService;
exports.PositionsService = PositionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PositionsService);
//# sourceMappingURL=positions.service.js.map