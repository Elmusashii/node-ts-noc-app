import { CronService } from "./cron/cron.service";
import { CheckService } from "../domain/use-case/checks/check-service";
import { LogsRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { FyleSystemDatasource } from "../infrastructure/datasource/fyle-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-case/email/send-email-logs";

const fileSystemLogRepository = new LogsRepositoryImpl(
    new FyleSystemDatasource()
);
    const emailService = new EmailService();
export class Server {
    public static  start() {
        console.log('Server is running...');

        //todo: Mandar mail

        // 
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        //     ).execute(
        //         ['hredx708@gmail.com','dedsec8201@gmail.com']
        //     )

        // emailService.sendEmail({
        //     to: ['hredx708@gmail.com','dedsec8201@gmail.com'],
        //     subject: 'Prueba del envio de Logs',
        //     htmlBody: `
        //         <h3> Logs del sistema</h3>
        //         <p>lorem ipsum</p>
        //     `
        // });

       // emailService.sendEmailWithFileSystemLogs(['hredx708@gmail.com', 'dedsec8201@gmail.com']);
        
        //,'7enrique14arce@gmail.com'

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //         const url = 'https://www.google.com'; 
        //         new CheckService(
        //             fileSystemLogRepository,
        //             ()=>{console.log(`${url} is ok...`)},
        //             (error)=>{console.log(error)}
        //         ).execute(url)
        //         //new CheckService().execute('http://localhost:3000')
        //     }
        // );

    }
}

