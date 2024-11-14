import { envs } from "./envs.plugin";


describe('envs.plugin.ts',()=>{

    test('should return envs',()=>{
        //console.log(envs)

        expect(envs).toEqual( {
            PORT: 3000,
            EMAIL: 'xmusashi76@gmail.com',
            PASS: 'fligphatrewujwas',
            PROD: false,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://cgimenez:123456@localhost:27018',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'cgimenez',
            MONGO_PASS: '123456'
          })
    });

    test('should return error if not found env', async ()=>{

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin')
            expect(true).toBe(false)

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }


    });


});