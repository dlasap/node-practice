import { ServerResponse, ClientRequest, IncomingMessage } from "http";
import fs from "fs";
const file_path = "../readme.txt";
export const routes = {
  "/": async (request: ClientRequest, response: ServerResponse) => {
    response.writeHead(200, {
      "Content-Type": "text/plain",
    });
    response.end("Hello, World!");
  },
  "/sample": async (request: ClientRequest, response: ServerResponse) => {
    try {
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });
      const data = fs.readFileSync(process.cwd() + "/src/readme.txt", "utf8");
      response.write(data);
      response.end();
    } catch (error: any) {
      response.statusCode = 500;
      response.write(
        JSON.stringify({
          ...error,
          message: error.message,
        })
      );
      response.end();
    }
  },
  "/landing": async (request: ClientRequest, response: ServerResponse) => {
    try {
      response.writeHead(200, { ContentType: "text/html" });
      fs.createReadStream(process.cwd() + "/html_pages/landing_page.html").pipe(
        response
      );
    } catch (error: any) {
      response.statusCode = 500;
      response.write(
        JSON.stringify({
          ...error,
          message: error.message,
        })
      );
      response.end();
    }
  },
  "/test": async (request: IncomingMessage, response: ServerResponse) => {
    try {
      let body = {};
      await request.on("data", async (data) => {
        body = JSON.parse(data);
      });

      if (request.method == "POST" && Object.keys(body).length) {
        response
          .writeHead(200, { ContentType: "text/plain" })
          .write(JSON.stringify(body));
        response.end();
      } else {
        response
          .writeHead(200, { ContentType: "text/plain" })
          .write("Hello World");
        response.end();
      }
    } catch (error: any) {
      response.statusCode = 500;
      response.write(
        JSON.stringify({
          ...error,
          message: error.message,
        })
      );
      response.end();
    }
  },
};
