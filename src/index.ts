import { makeServer } from "./server";

const server = makeServer("9999");

console.log(__dirname, "X", process.cwd());
