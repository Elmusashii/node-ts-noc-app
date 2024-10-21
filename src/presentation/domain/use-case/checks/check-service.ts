
interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = ()=>void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallback
    ){}

   public async execute(url:string):Promise<boolean> {
        
        try {
            const req = (await fetch(url)).ok
            if (!req) {throw new Error(`Hubo un problema al verificar el servicio ${url}`);}
            //console.log((`El servicio ${url} se encuentra operativo`))
            this.successCallback();

            return true;
        } catch (error) {
            //console.log(`${error}`)
            this.errorCallback(`${error}`);
            return false;
        }

    }
}

