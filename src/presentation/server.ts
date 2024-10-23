import { CronService } from "./cron/cron.service";
import { CheckService } from "../domain/use-case/checks/check-service";
import { LogsRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { FyleSystemDatasource } from "../infrastructure/datasource/fyle-system.datasource";

const fileSystemLogRepository = new LogsRepositoryImpl(
    new FyleSystemDatasource()
);

export class Server {
    public static start() {
        console.log('Server is running...');
        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const url = 'http://localhost:3000'; 
                new CheckService(
                    fileSystemLogRepository,
                    ()=>{console.log(`${url} is ok...`)},
                    (error)=>{console.log(error)}
                ).execute(url)
                //new CheckService().execute('http://localhost:3000')
            }
        );

    }
}

