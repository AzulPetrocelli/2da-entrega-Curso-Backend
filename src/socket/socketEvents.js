import * as ps from '../services/products.service.js';

// Configurar eventos de Socket.io
export const configureSocketEvents = (io) => {
    io.on('connection', async (socket) => {
        console.log('Cliente conectado:', socket.id);

        const emitProducts = async () => {
            try {
                const result = await ps.getProductsService({ query: { limit: 100 } });
                socket.emit('loadProducts', result.payload);
            } catch (error) {
                socket.emit('error', 'Error al cargar los productos');
            }
        };

        // Enviar todos los productos al conectarse
        await emitProducts();

        // Solicitud de actualización de productos
        socket.on('getProducts', async () => {
            await emitProducts();
        });

        // Crear producto via websocket
        socket.on('createProduct', async (productData) => {
            try {
                const product = await ps.postProductService(productData);
                io.emit('productAdded', product);
            } catch (error) {
                socket.emit('error', error.message);
            }
        });

        // Actualizar producto via websocket
        socket.on('updateProduct', async (id, productData) => {
            try {
                const product = await ps.putProductService(id, productData);
                io.emit('productUpdatedConfirm', product);
            } catch (error) {
                socket.emit('error', error.message);
            }
        });

        // Eliminar producto via websocket
        socket.on('deleteProduct', async (id) => {
            try {
                await ps.deleteProductService(id);
                io.emit('productDeletedConfirm', id);
            } catch (error) {
                socket.emit('error', error.message);
            }
        });

        // Desconexión del cliente
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
};
