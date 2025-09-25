// server.js
// Servidor HTTP básico en Node.js escuchando en el puerto 3000 (o process.env.PORT)

const http = require("http");

const PORT = Number(process.env.PORT) || 3000;

const requestListener = (req, res) => {
    // Rutas simples
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ ok: true, message: "Servidor Node.js activo" }));
        return;
    }

    // Salud
    if (req.url === "/health" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ status: "healthy" }));
        return;
    }

    // 404 por defecto
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Not Found" }));
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});