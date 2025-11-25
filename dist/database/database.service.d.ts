import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    pool: mysql.Pool;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    query<T extends mysql.RowDataPacket[] | mysql.OkPacket | mysql.ResultSetHeader>(sql: string, params?: any[]): Promise<[T, mysql.FieldPacket[]]>;
    getPool(): mysql.Pool;
}
