import { EmailService } from "../../../presentation/email/email.service";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";


interface SendLogEmailUseCase {
    execute: (to: string| string[])=> Promise<boolean>;
}


export class SendEmailLogs implements SendLogEmailUseCase{

    constructor(
        private readonly emailService:EmailService,
        private readonly logRepository: LogRepository,

    ){}

   async execute (to: string | string[]) {

    try {
        const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
        if(!sent){
            throw new Error('Email log not sent');
        }

        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: `Email log sent.` ,
            origin: 'send-email-logs.ts',
        });

        this.logRepository.saveLogs(log);

        return true;
    } catch (error) {

        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: `Email log not sent: ${error}` ,
            origin: 'send-email-logs.ts',
        });
        
        this.logRepository.saveLogs(log);

        return false;        
    }


    }


}