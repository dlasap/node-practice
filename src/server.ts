import http from "http";
import { routes } from "./routes";

export const makeServer = (port: string) => {
  return http
    .createServer(async (request, response) => {
      const { url, method } = request;

      //@ts-ignore - valid accessing index
      if (routes[url]) {
        //@ts-ignore - valid accessing index
        return await routes[url](request, response);
      }
      response.writeHead(404);
      response.end(http.STATUS_CODES[404]);
    })
    .listen(parseInt(port), () => {
      console.log(`listening at port : ${port} `);
    });
};
