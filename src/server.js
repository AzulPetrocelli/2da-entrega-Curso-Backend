//Importar módulos
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import dbConnect from './config/db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importar managers y socket configuration
import { configureSocketEvents } from './socket/socketEvents.js';

// Importar rutas
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';

// Crear aplicación
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// ==================== MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// ==================== CONFIGURACION DE HANDLEBARS ====================
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: false,
        partialsDir: __dirname + '/views/partials', // carpeta donde están los partials
        helpers: {
            json: (context) => JSON.stringify(context).replace(/"/g, '&quot;'),
            gt: (a, b) => a > b,
            lt: (a, b) => a < b,
            eq: (a, b) => a === b,
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ==================== RUTAS ====================
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// ==================== CONFIGURAR SOCKET.IO ====================
configureSocketEvents(io);

// ==================== CONEXIÓN A MONGODB ====================
dbConnect()

// ==================== INICIAR SERVIDOR ====================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en el puerto: ${PORT}`);
    console.log(`📱 Vista de productos: http://localhost:${PORT}/`);
    console.log(`🔄 Productos en tiempo real: http://localhost:${PORT}/realtimeproducts\n`);
});
