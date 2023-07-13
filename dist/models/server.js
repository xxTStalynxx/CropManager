"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const router_1 = __importDefault(require("../routes/router"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("../database/connect"));
class Server {
    constructor() {
        var _a;
        this.apiRoutes = {
            route: '/',
        };
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8000';
        this.dbConnect();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('views', 'views');
        this.app.set('view engine', 'ejs');
    }
    middlewares() {
        //trabajar con el cross domain
        this.app.use((0, cors_1.default)());
        //lectura del body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //carpeta publica
        this.app.use(express_1.default.static('public'));
        //para las sesiones
        this.app.use((0, express_session_1.default)({
            secret: 'secret',
            resave: false,
            saveUninitialized: true
        }));
    }
    routes() {
        this.app.use(this.apiRoutes.route, router_1.default);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connect_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running in port: " + this.port);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map