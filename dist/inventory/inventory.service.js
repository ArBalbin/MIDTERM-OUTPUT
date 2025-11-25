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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let InventoryService = class InventoryService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        const [rows] = await this.db.query('SELECT * FROM inventory');
        return rows;
    }
    async findOne(id) {
        const [rows] = await this.db.query('SELECT * FROM inventory WHERE id = ?', [id]);
        return rows[0] || null;
    }
    async create(item) {
        const { item_name, quantity, unit, price } = item;
        const [result] = await this.db.query('INSERT INTO inventory (item_name, quantity, unit, price) VALUES (?, ?, ?, ?)', [item_name, quantity, unit !== null && unit !== void 0 ? unit : null, price !== null && price !== void 0 ? price : 0]);
        return Object.assign({ id: result.insertId }, item);
    }
    async update(id, updateData) {
        const fields = Object.keys(updateData)
            .map(field => `${field} = ?`)
            .join(', ');
        const values = Object.values(updateData);
        values.push(id);
        await this.db.query(`UPDATE inventory SET ${fields} WHERE id = ?`, values);
        return this.findOne(id);
    }
    async remove(id) {
        const item = await this.findOne(id);
        if (!item)
            return null;
        await this.db.query('DELETE FROM inventory WHERE id = ?', [id]);
        return item;
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map