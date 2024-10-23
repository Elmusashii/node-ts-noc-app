import fs, { mkdirSync } from "fs";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FyleSystemDatasource implements LogDataSource{

    private readonly LogsPath = `logs`;
    private readonly AllLogsPath = 'logs/logs-low.logs';
    private readonly mediumLogsPath = 'logs/logs-medium.logs';
    private readonly highLogsPath = 'logs/logs-high.logs';

    constructor(){this.createLogsFile}
    

    private createLogsFile = ()=> {

            if (!fs.existsSync( this.LogsPath)) {
                fs.mkdirSync(this.LogsPath, { recursive: true });  
            }

        [   
            this.AllLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(
               (path)=>{
                    if(fs.existsSync(path)) return;

                    fs.writeFileSync(path, '')
               });
    }


    async saveLogs(newLog: LogEntity): Promise<void> {

        const LogToJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.AllLogsPath, LogToJson)

        if (newLog.level === LogSeverityLevel.low) return;

        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, LogToJson)
        }else{
            fs.appendFileSync(this.highLogsPath, LogToJson)
        }
        

    }


    private getLogsFromFiles = (path:string):LogEntity[] =>{
        const content = fs.readFileSync(path, 'utf-8');
        const LogsContent = content.split('\n').map(
            log => LogEntity.fromjson(log)
        );

        return LogsContent;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
            return this.getLogsFromFiles(this.AllLogsPath);
            //  break;
            case LogSeverityLevel.medium:
            return this.getLogsFromFiles(this.mediumLogsPath);
            //   break;
            case LogSeverityLevel.high:
            return this.getLogsFromFiles(this.highLogsPath);
            //   break;
    
            default:
            throw new Error(`${severityLevel} method not implemented.`);
            //    break;
        }


        
    }
    

}