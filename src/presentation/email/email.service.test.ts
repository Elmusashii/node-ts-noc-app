import nodemailer from 'nodemailer'
import { EmailService, SendMailOptions } from "./email.service";


describe('Testing email.service.ts', ()=>{

    const mockSendMail = jest.fn();
    let email = 'hredx708@gmail.com';
    
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });
    
    const emailService = new EmailService();

    test('should send email', async()=>{


        const options: SendMailOptions = {
            to: email,
            subject: 'Test',
            htmlBody: '<h1>Test EmailService</h1>'
        }

        const emailSent = await emailService.sendEmail(options);

        expect(emailSent).toBe(true);
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array), 
            html: "<h1>Test EmailService</h1>", 
            subject: "Test", 
            to: email
        })

    });

    
    test('should send email with attachments', async()=>{

        await emailService.sendEmailWithFileSystemLogs(email); 

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: expect.stringContaining('Logs del Servidor'),
            html: expect.stringContaining('<h3> Logs del sistema multiples</h3>'),
            attachments: expect.arrayContaining([
                {filename:'logs-low.logs', path:'./logs/logs-low.log'},
                {filename:'logs-medium.logs', path:'./logs/logs-medium.log'},
                {filename:'logs-high.logs', path:'./logs/logs-high.log'},
            ])
        });


    });

});