import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('Testing check-service-multiple.ts', ()=>{

    const mockRepo1 = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo2 = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo3 = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }
    
 

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepo1,mockRepo2,mockRepo3],
        successCallback,
        errorCallback
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('should call succescallback when fetch return true', async()=>{

        const wasOk = await checkServiceMultiple.execute('https://google.com');
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepo1.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepo2.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepo3.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );

    });
    
    test('should call succescallback when fetch return false', async()=>{

        const wasOk = await checkServiceMultiple.execute('https://goshttrsjtogle.com');
        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepo1.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepo2.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepo3.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );

    });

});