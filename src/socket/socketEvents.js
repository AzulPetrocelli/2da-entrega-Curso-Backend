// Configurar eventos de Socket.io
export function configureSocketEvents(io, productManager) {
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        // Enviar todos los productos al conectarse
        socket.emit('loadProducts', productManager.getProducts());

        // Solicitar actualización de productos
        socket.on('getProducts', () => {
            socket.emit('loadProducts', productManager.getProducts());
        });

        // Crear producto via websocket
        socket.on('createProduct', (productData) => {
            const result = productManager.addProduct(productData);
            if (result.error) {
                socket.emit('error', result.error);
            } else {
                // El evento ya se emitió en el manager, aquí confirmamos
                socket.emit('productAdded', result.product);
            }
        });

        // Actualizar producto via websocket
        socket.on('updateProduct', (id, productData) => {
            const result = productManager.patchProduct(id, productData);
            if (result.error) {
                socket.emit('error', result.error);
            } else {
                // El evento ya se emitió en el manager, aquí confirmamos
                socket.emit('productUpdatedConfirm', result.product);
            }
        });

        // Eliminar producto via websocket
        socket.on('deleteProduct', (id) => {
            const result = productManager.deleteProduct(id);
            if (result.error) {
                socket.emit('error', result.error);
            } else {
                // El evento ya se emitió en el manager, aquí confirmamos
                socket.emit('productDeletedConfirm', id);
            }
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
}
