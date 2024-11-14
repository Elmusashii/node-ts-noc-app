import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource',()=>{

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    });

    class MockLogDataSource implements LogDataSource{
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
            return[newLog]
        }
        
    }

    test('should test the abstract class', async()=>{

        const mockLogDataSource = new MockLogDataSource();

        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
        expect(typeof mockLogDataSource.saveLogs).toBe('function');
        expect(typeof mockLogDataSource.getLogs).toBe('function');

        await mockLogDataSource.saveLogs(newLog);
        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        
    });
});