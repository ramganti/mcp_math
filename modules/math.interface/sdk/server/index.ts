import http from "http";

export function createDevServer(module: any, port = 3001) {
  const server = http.createServer((_, res) => {
    res.writeHead(200);
    res.end("MCP module server running...");
  });
  server.listen(port, () => {
    console.log(`✅ Listening on http://localhost:${port}`);
  });
}
