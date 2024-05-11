const app = require('./app');

async function main() {

    const PORT = process.env.PORT || 3000;

    const server = app.listen(PORT, () => {
        console.log(`Server trabajando en http://localhost:${PORT}`);
    })

    server.on('error', (error) => {
        console.log(`Error en servidor ${error}`);
    })
}

main();