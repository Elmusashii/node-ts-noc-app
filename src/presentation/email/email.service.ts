import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';





interface SendMailOptions{
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]
}

//todo: attachment

interface Attachment {
    filename: string;
    path:  string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.EMAIL,
            pass: envs.PASS,
        }
    });
    
    constructor(){}

    async sendEmail(options: SendMailOptions):Promise<boolean>{
        const {to, subject, htmlBody, attachments = []} = options;


        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            console.log(sentInformation);
            
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email logs sent',
                origin: 'email.service.ts',
           });
        
            return true
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email logs not sent',
                origin: 'email.service.ts',
           });

            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){

            const subject = 'Logs del Servidor';
            const htmlBody = `
                       <h3> Logs del sistema multiples</h3>
                       <p>lorem ipsum</p>
            `;
            const attachments: Attachment[] = [
                {filename:'logs-low.logs', path:'./logs/logs-low.log'},
                {filename:'logs-medium.logs', path:'./logs/logs-medium.log'},
                {filename:'logs-high.logs', path:'./logs/logs-high.log'},
            ];


            return this.sendEmail({to:to,subject:subject,htmlBody:htmlBody,attachments:attachments});

    }


}