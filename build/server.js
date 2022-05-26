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
exports.makeServer = void 0;
const http_1 = __importDefault(require("http"));
const routes_1 = require("./routes");
const makeServer = (port) => {
    return http_1.default
        .createServer((request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const { url, method } = request;
        //@ts-ignore - valid accessing index
        if (routes_1.routes[url]) {
            //@ts-ignore - valid accessing index
            return yield routes_1.routes[url](request, response);
        }
        response.writeHead(404);
        response.end(http_1.default.STATUS_CODES[404]);
    }))
        .listen(parseInt(port), () => {
        console.log(`listening at port : ${port} `);
    });
};
exports.makeServer = makeServer;
