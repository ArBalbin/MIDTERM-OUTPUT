import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  // Get all positions
  @Get()
  async findAll() {
    return this.positionsService.findAll();
  }

  // Get position by ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.positionsService.findById(id);
  }

  // Create position (auto adds user_id)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    positionData: {
      position_code: string;
      title: string;
      description?: string;
    },
    @Req() req: Request,
  ) {
    const userId = (req.user as any).id; // ✅ Fixed field
    return this.positionsService.create(positionData, userId);
  }

  // Update position
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    positionData: {
      position_code?: string;
      title?: string;
      description?: string;
    },
  ) {
    return this.positionsService.update(id, positionData);
  }

  // Delete position
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.positionsService.delete(id);
  }

  // Search positions
  @Post('search')
  async search(@Body() body: { position_code?: string; title?: string }) {
    return this.positionsService.search(body);
  }
}
