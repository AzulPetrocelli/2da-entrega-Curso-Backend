import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Importar managers y socket configuration
import { ProductManager } from './manager/Product.manager.js';
import { configureSocketEvents } from './socket/socketEvents.js';
import productsRouter from './routes/products.routes.js';

// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear aplicación
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 3000;

// ==================== CARGAR DATOS ====================
const productsPath = path.join(__dirname, 'db/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Crear instancia del ProductManager y pasar io
const productManager = new ProductManager(products, io);

// ==================== MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// ==================== CONFIGURAR HANDLEBARS ====================
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false,
    helpers: {
        json: function(context) {
            return JSON.stringify(context).replace(/"/g, '&quot;');
        },
        gt: function(a, b) {
            return a > b;
        },
        lt: function(a, b) {
            return a < b;
        },
        eq: function(a, b) {
            return a === b;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ==================== PASAR DATOS GLOBALES A HANDLEBARS ====================
app.use((req, res, next) => {
    res.locals.products = productManager.getProducts();
    next();
});

// ==================== RUTAS ====================
app.use('/api/products', productsRouter);

// Ruta para obtener datos de productos (JSON API)
app.get('/api/data/products', (req, res) => {
    res.json(productManager.getProducts());
});

// Ruta para la vista home
app.get('/', (req, res) => {
    res.render('home', { products: productManager.getProducts() });
});

// Ruta para la vista de productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: productManager.getProducts() });
});

// ==================== CONFIGURAR SOCKET.IO ====================
configureSocketEvents(io, productManager);

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
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📱 Vista de productos: http://localhost:${PORT}/`);
    console.log(`🔄 Productos en tiempo real: http://localhost:${PORT}/realtimeproducts\n`);
});
