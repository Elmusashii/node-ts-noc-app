import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH

}

export class PostgresLogDatasource implements LogDataSource{

    async saveLogs(log: LogEntity): Promise<void> {
        
        const { message, origin, createdAt } = log;
        const level = severityEnum[log.level]


        const newLog = await prismaClient.logModel.create({
           data:{
            ...log,
            level: level, 
            createdAt: createdAt ?? new Date(),
           } 
        });


    }
   async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: {level}
        })

        return dbLogs.map(dblog => LogEntity.fromObject(dblog)); 
    }



}