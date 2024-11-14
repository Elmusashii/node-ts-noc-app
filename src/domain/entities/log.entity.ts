
export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions{
     level: LogSeverityLevel;
     message: string;
     origin: string;
     createAt?: Date;

}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createAt?: Date;
    public origin: string;

    constructor(options:LogEntityOptions){
        const {message,level,origin, createAt = new Date()} = options;

        this.message = message;
        this.level   = level;
        this.origin = origin;
        this.createAt = createAt;

    }

    static fromjson = (json:string):LogEntity=>{
        json = (json === '') ? '{}':json;

        const {message, level, createAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            message:message,
            level:level,
            createAt: new Date(createAt),
            origin:origin,
        });

       log.createAt = new Date(createAt);

       return log;

    }

    static fromObject = (object:{[key:string]:any}):LogEntity=>{
        const {message, level,createAt, origin} = object;
        const log = new LogEntity({
            message:message,
            level:level,
            createAt:createAt,
            origin:origin,
            });
        return log;

    }
    
    


}
