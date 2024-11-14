import { FyleSystemDatasource } from "../../../infrastructure/datasource/fyle-system.datasource";
import { LogsRepositoryImpl } from "../../../infrastructure/respositories/log.repository.impl";
import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";


describe('Testing send-email-logs.ts', ()=>{
    
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockLogRepository: LogRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository,
    );
/*
    const emailService =  new EmailService();
    const fileSystemLogRepository = new FyleSystemDatasource();

    const sendEmail = new SendEmailLogs(
        emailService,
        fileSystemLogRepository
    );
    
        test('should return true when send a email', async()=>{
            const wasOk = await sendEmail.execute( ['dedsec8201@gmail.com']);
            expect(wasOk).toBe(true);
    
        });
    
        test('should return false when send a email', async()=>{
            const wasOk = await sendEmail.execute( ['akljfhbadlfjn']);
            expect(wasOk).toBe(false);
       
        });
*/
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    

    test('should call sendEmail and saveLog',async()=>{
        const result = await sendEmailLogs.execute('hredx708@gmail.com');
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith( {
            createAt: expect.any(Date), 
            level: "low", 
            message: "Email log sent.",
            origin: "send-email-logs.ts"
        })
    });

    test('should log in case of error',async()=>{
        mockEmailService.sendEmailWithFileSystemLogs.mockRejectedValue(false)
        const result = await sendEmailLogs.execute('hredx708@gmail.com');
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith( {
            createAt: expect.any(Date), 
            level: "high", 
            message: "Email log not sent: false",
            origin: "send-email-logs.ts"
        })
    });


});