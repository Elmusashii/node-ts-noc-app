import path from "path";
import { FyleSystemDatasource } from "./fyle-system.datasource";
import fs from 'fs'
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




describe('Testing fyle-system.datasource.ts',()=>{
    
    const logPath = path.join(__dirname,'../../../logs')
    //console.log({logPath})

    beforeEach(()=>{
        fs.rmSync(logPath, {recursive:true, force: true})
    });

    test('should create log files if they do not exist',()=>{

        new FyleSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual( [ 'logs-high.log', 'logs-low.log', 'logs-medium.log' ])
        //console.log(files);

    });

    test('should save a log in logs-low.log',()=>{

        const logDataSource = new FyleSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLogs(log);
        const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        expect(lowLogs).toContain(JSON.stringify(log) );
        //console.log(lowLogs);

    });

    test('should save a log in logs-low.log and logs-low.medium',()=>{

        const logDataSource = new FyleSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLogs(log);
        const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(lowLogs).toContain(JSON.stringify(log) );
        expect(mediumLogs).toContain(JSON.stringify(log) );
        //console.log(lowLogs);

    });

    test('should save a log in logs-low.log and logs-high.log',()=>{

        const logDataSource = new FyleSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLogs(log);
        const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(lowLogs).toContain(JSON.stringify(log) );
        expect(highLogs).toContain(JSON.stringify(log) );
        //console.log(lowLogs);

    });

    test('should return all logs', async()=>{
        const logDataSource = new FyleSystemDatasource()
        const logLow = new LogEntity({
            message: 'test logLow',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })

        const logMedium = new LogEntity({
            message: 'test logMedium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        const logHigh = new LogEntity({
            message: 'test logHigh',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        await logDataSource.saveLogs(logLow);
        await logDataSource.saveLogs(logMedium);
        await logDataSource.saveLogs(logHigh);

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))


    });

    test('should not throw an error if path exists', ()=>{

        new FyleSystemDatasource();
        new FyleSystemDatasource();

    });

    test('should throw an error if severity level  is not defined', async()=>{

        const logDataSource = new FyleSystemDatasource();
        const customSeverirtyLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

        try {
            await logDataSource.getLogs(customSeverirtyLevel)
            expect(true).toBeFalsy();
        } catch (error) {
            const errorString = `${error}`
            
            expect(errorString).toContain(`${customSeverirtyLevel} method not implemented`)
        }



    });


});