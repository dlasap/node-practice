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
exports.routes = void 0;
const fs_1 = __importDefault(require("fs"));
const file_path = "../readme.txt";
exports.routes = {
    "/": (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        response.writeHead(200, {
            "Content-Type": "text/plain",
        });
        response.end("Hello, World!");
    }),
    "/sample": (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            response.writeHead(200, {
                "Content-Type": "text/plain",
            });
            const data = fs_1.default.readFileSync(process.cwd() + "/src/readme.txt", "utf8");
            response.write(data);
            response.end();
        }
        catch (error) {
            response.statusCode = 500;
            response.write(JSON.stringify(Object.assign(Object.assign({}, error), { message: error.message })));
            response.end();
        }
    }),
    "/landing": (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            response.writeHead(200, { ContentType: "text/html" });
            fs_1.default.createReadStream(process.cwd() + "/html_pages/landing_page.html").pipe(response);
        }
        catch (error) {
            response.statusCode = 500;
            response.write(JSON.stringify(Object.assign(Object.assign({}, error), { message: error.message })));
            response.end();
        }
    }),
    "/test": (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let body = {};
            yield request.on("data", (data) => __awaiter(void 0, void 0, void 0, function* () {
                body = JSON.parse(data);
            }));
            if (request.method == "POST" && Object.keys(body).length) {
                response
                    .writeHead(200, { ContentType: "text/plain" })
                    .write(JSON.stringify(body));
                response.end();
            }
            else {
                response
                    .writeHead(200, { ContentType: "text/plain" })
                    .write("Hello World");
                response.end();
            }
        }
        catch (error) {
            response.statusCode = 500;
            response.write(JSON.stringify(Object.assign(Object.assign({}, error), { message: error.message })));
            response.end();
        }
    }),
};
