"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const server = (0, server_1.makeServer)("9999");
console.log(__dirname, "X", process.cwd());
