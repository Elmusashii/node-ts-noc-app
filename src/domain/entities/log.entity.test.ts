import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('Testing LogEntity', ()=>{
    
    const dataObj = {
        message: 'Hola mundo',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts',
    };

    test('should create a LogEntiy instance',()=>{

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('should create a instance from Json',()=>{

        const json = `{
        "message":"https://www.google.com se encuentra operativo",
        "level":"low",
        "origin":"check-service.ts",
        "createAt":"2024-10-30T11:45:55.169Z"
        }`

        const log = LogEntity.fromjson(json);
        expect(log).toBeInstanceOf(LogEntity);

        expect(log.message).toBe("https://www.google.com se encuentra operativo");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('should create a instance from Object', ()=>{

        const log = LogEntity.fromObject(dataObj);
        

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);

    });



});