import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('Testing check-service.ts',()=>{
    
    const mockRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('should call succescallback when fetch return true', async()=>{

        const wasOk = await checkService.execute('https://google.com');
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );

    });
    
    test('should call succescallback when fetch return false', async()=>{

        const wasOk = await checkService.execute('https://goshttrsjtogle.com');
        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLogs).toBeCalledWith(
            expect.any(LogEntity)
        );

    });



});