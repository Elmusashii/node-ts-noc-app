import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class LogsRepositoryImpl implements LogDataSource{

    constructor(
        private logDataSource:LogDataSource
    ){}

    async saveLogs(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLogs(log);
    }

    async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(level);
    }


}