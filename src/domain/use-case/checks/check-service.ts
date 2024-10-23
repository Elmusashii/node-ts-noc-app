import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = ()=>void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository:LogRepository,
        private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallback
    ){}

   public async execute(url:string):Promise<boolean> {
        
        try {
            const req = (await fetch(url)).ok
            if (!req) {throw new Error(`Hubo un problema al verificar el servicio ${url}`);}
           
            const log = new LogEntity(`${url} se encuentra operativo`,LogSeverityLevel.low)

            this.logRepository.saveLogs(log);
            this.successCallback();

            return true;
        } catch (error) {
            
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity(`${errorMessage}`, LogSeverityLevel.high)

            this.logRepository.saveLogs(log);
            this.errorCallback(`${error}`);
            return false;
        }

    }
}

