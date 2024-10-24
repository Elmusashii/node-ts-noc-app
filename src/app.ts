import "dotenv/config";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

(async()=>{
    main()
})();

function main(){
    Server.start();

//    console.log(envs.EMAIL);
   
//    console.log(envs.PASS);
   
//    console.log(envs.PORT);

//    console.log(envs.PROD);

}
