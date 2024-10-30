import "dotenv/config";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(async()=>{
    main()
})();

async function main(){
    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    //Crear una collecion = tables, documento = registro

    // const newLog = await LogModel.create({
    //     message:'Test message desde Mongo',
    //     origin:'App.ts',
    //     level:'low'
    // });

    // await newLog.save();
    // console.log(newLog);
    Server.start();


    // const prisma = new PrismaClient();
    // // const newLog = await prisma.logModel.create({
    // //     data: {
    // //         level: 'HIGH',
    // //         message: 'Test message from prisma',
    // //         origin:'App.ts',
    // //     }
    // // });

    // const newLog = await prisma.logModel.findMany({
    //     where:{
    //         level:'LOW'
    //     }
    // });
    // console.log(newLog);
    // const Logs = await LogModel.find();
    // console.log(Logs);

}
