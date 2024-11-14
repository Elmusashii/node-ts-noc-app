import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogsRepositoryImpl } from "./log.repository.impl";

describe('Testing log.repository.impl.ts',()=>{
    
    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    });

    const mockLogDataSource = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }

    const LogsRepository = new LogsRepositoryImpl(mockLogDataSource);
    beforeEach(()=>{
        jest.clearAllMocks();
    });    

    test('saveLog should call the datasource with arguments', async ()=>{
        await LogsRepository.saveLogs(newLog);
        expect(mockLogDataSource.saveLogs).toHaveBeenCalledWith(newLog);
    });

    test('getLog should call the datasource with arguments', async ()=>{
        const lowSeverity = LogSeverityLevel.low
        await LogsRepository.getLogs(lowSeverity);
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(lowSeverity);
    });


});