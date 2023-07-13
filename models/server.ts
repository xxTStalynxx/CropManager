import express,{ Application} from 'express';
import session from 'express-session';
import router from '../routes/router';
import cors from 'cors';
import db from "../database/connect";

export class Server{
    private app:Application;
    private port:string;
    private apiRoutes = {
        route: '/',
    }

    constructor(){
        this.app=express();
        this.port=process.env.PORT ?? '8000';
        this.dbConnect();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('views', 'views');
        this.app.set('view engine', 'ejs');
    }

    middlewares(){
        //trabajar con el cross domain
        this.app.use(cors());
        //lectura del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        //carpeta publica
        this.app.use(express.static('public'));
        //para las sesiones
        this.app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true
        }));
    }
    routes(){
        this.app.use(this.apiRoutes.route, router)
    }

    async dbConnect(){
        try{
            await db.authenticate()
            console.log('Database online');  
        }catch(error:any)
        {
            throw new Error(error);          
        }
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("Server is running in port: "+ this.port);  
        })
    }
}