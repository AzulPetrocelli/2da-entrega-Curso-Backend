//Importar módulos
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';

// Importar managers y socket configuration
import { configureSocketEvents } from './socket/socketEvents.js';

// Importar rutas
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

// Importar manager de productos
import ProductManager from './controller/products.controller.js';

// Crear aplicación
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const PORT = process.env.PORT || 3000;

// ==================== CARGAR DATOS ====================
const productsPath = path.join(__dirname, 'db/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

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

// Ruta para la vista de productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: ProductManager.getProducts() });
});

// ==================== CONFIGURAR SOCKET.IO ====================
configureSocketEvents(io, ProductManager);

// ==================== GUARDAR DATOS CUANDO SE MODIFIQUEN ====================

// Escuchar eventos de cambios en productos
io.on('connection', (socket) => {
    // Guardar datos cuando se creen, actualicen o eliminen productos
    socket.on('disconnect', () => {
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
    });
});

// Escuchar eventos del IO para guardar datos
io.on('productCreated', () => {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
});

io.on('productUpdated', () => {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
});

io.on('productDeleted', () => {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));
});

// ==================== INICIAR SERVIDOR ====================
server.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en el puerto: ${PORT}`);
    console.log(`📱 Vista de productos: http://localhost:${PORT}/`);
    console.log(`🔄 Productos en tiempo real: http://localhost:${PORT}/realtimeproducts\n`);
});
