import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InventoryService, InventoryItem } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Get all items
  @Get()
  async findAll() {
    return this.inventoryService.findAll();
  }

  // Get one item by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(Number(id));
  }

  // Add a new item
  @Post()
  async create(@Body() item: InventoryItem) {
    return this.inventoryService.create(item);
  }

  // Update an item by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<InventoryItem>) {
    return this.inventoryService.update(Number(id), updateData);
  }

  // Delete an item by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.inventoryService.remove(Number(id));
  }
}
