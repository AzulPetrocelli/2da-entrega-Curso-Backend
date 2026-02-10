// Inicializar conexión con Socket.io
const socket = io();

// Elementos del DOM
const productsContainer = document.getElementById('productsContainer');
const createModal = document.getElementById('createModal');
const createProductForm = document.getElementById('createProductForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const connectionStatus = document.getElementById('connectionStatus');

// ==================== EVENTOS DE CONEXIÓN ====================

socket.on('connect', () => {
    console.log('✓ Conectado al servidor');
    updateConnectionStatus(true);
    socket.emit('getProducts');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    updateConnectionStatus(false);
});

// ==================== EVENTOS DE PRODUCTOS ====================

// Cargar productos iniciales
socket.on('loadProducts', (products) => {
    renderProducts(products);
});

// Escuchar cuando se crea un producto
socket.on('productCreated', (product) => {
    addProductToDOM(product);
    showAlert('success', `Producto "${product.title}" agregado`);
});

// Escuchar cuando se actualiza un producto
socket.on('productUpdated', (product) => {
    updateProductInDOM(product);
    showAlert('success', `Producto "${product.title}" actualizado`);
});

// Escuchar cuando se elimina un producto
socket.on('productDeleted', (productId) => {
    removeProductFromDOM(productId);
    showAlert('success', 'Producto eliminado');
});

// Confirmaciones del servidor
socket.on('productAdded', (product) => {
    if (!document.querySelector(`[data-product-id="${product.id}"]`)) {
        addProductToDOM(product);
    }
});

socket.on('productUpdatedConfirm', (product) => {
    updateProductInDOM(product);
});

socket.on('productDeletedConfirm', (productId) => {
    removeProductFromDOM(productId);
});

// Manejo de errores
socket.on('error', (errorMsg) => {
    showAlert('error', errorMsg);
});

// ==================== FUNCIONES DE PRODUCTOS ====================

function renderProducts(products) {
    if (!products || products.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-box-open text-gray-600 text-6xl mb-4"></i>
                <p class="text-gray-400 text-xl">No hay productos disponibles</p>
            </div>
        `;
        return;
    }

    productsContainer.innerHTML = '';
    products.forEach((product) => {
        addProductToDOM(product);
    });
}

function addProductToDOM(product) {
    // No agregar si ya existe
    if (document.querySelector(`[data-product-id="${product.id}"]`)) {
        return;
    }

    const productCard = createProductCard(product);
    productsContainer.innerHTML = productCard + productsContainer.innerHTML;

    // Animar la tarjeta nueva
    const card = document.querySelector(`[data-product-id="${product.id}"]`);
    card.style.animation = 'fadeIn 0.3s ease-in';
}

function updateProductInDOM(product) {
    const card = document.querySelector(`[data-product-id="${product.id}"]`);
    if (card) {
        const newCard = createProductCard(product);
        card.outerHTML = newCard;
    }
}

function removeProductFromDOM(productId) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (card) {
        card.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            card.remove();
            // Si no hay más productos, mostrar mensaje
            if (productsContainer.children.length === 0) {
                productsContainer.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-box-open text-gray-600 text-6xl mb-4"></i>
                        <p class="text-gray-400 text-xl">No hay productos disponibles</p>
                    </div>
                `;
            }
        }, 300);
    }
}

function createProductCard(product) {
    const stockColor = product.stock > 10 ? 'text-green-400' : 'text-red-400';
    const statusColor = product.status ? 'bg-green-500' : 'bg-red-500';
    const statusText = product.status ? 'Activo' : 'Inactivo';

    return `
        <div class="product-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105" data-product-id="${product.id}">
            <!-- Product Image -->
            <div class="relative h-48 bg-gray-700 overflow-hidden">
                ${
                    product.thumbnails
                        ? `<img src="${product.thumbnails}" alt="${product.title}" class="w-full h-full object-cover">`
                        : `<div class="w-full h-full flex items-center justify-center bg-gray-700">
                        <i class="fas fa-image text-gray-600 text-3xl"></i>
                    </div>`
                }
                <!-- Status Badge -->
                <div class="absolute top-2 right-2 ${statusColor} text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${statusText}
                </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
                <h3 class="text-lg font-bold text-white mb-2 truncate">${product.title}</h3>
                
                <p class="text-gray-400 text-sm mb-3 line-clamp-2">${product.description}</p>

                <!-- Category and Code -->
                <div class="flex gap-2 mb-3">
                    <span class="bg-blue-700 text-blue-100 px-2 py-1 rounded text-xs font-semibold">
                        ${product.category}
                    </span>
                    <span class="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                        Cod: ${product.code}
                    </span>
                </div>

                <!-- Price and Stock -->
                <div class="flex justify-between items-center mb-3 border-t border-gray-700 pt-3">
                    <div>
                        <p class="text-gray-500 text-xs">Precio</p>
                        <p class="text-xl font-bold text-green-400">$${product.price}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-gray-500 text-xs">Stock</p>
                        <p class="text-xl font-bold ${stockColor}">
                            ${product.stock}
                        </p>
                    </div>
                </div>

                <!-- Delete Button -->
                <button onclick="deleteProduct(${product.id})" class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 font-semibold">
                    <i class="fas fa-trash mr-2"></i>Eliminar
                </button>
            </div>
        </div>
    `;
}

// ==================== FUNCIONES MODALES ====================

function openCreateModal() {
    createModal.classList.remove('hidden');
    createModal.classList.add('flex');
}

function closeCreateModal() {
    createModal.classList.add('hidden');
    createModal.classList.remove('flex');
    createProductForm.reset();
}

// Cerrar modal al hacer click fuera
createModal.addEventListener('click', (e) => {
    if (e.target === createModal) {
        closeCreateModal();
    }
});

// ==================== CREACIÓN Y ELIMINACIÓN DE PRODUCTOS ====================

createProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(createProductForm);
    const productData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        code: formData.get('code'),
        category: formData.get('category'),
        thumbnails: formData.get('thumbnails') || null,
        status: formData.get('status') ? true : false,
    };

    // Enviar producto a través de websocket
    socket.emit('createProduct', productData);

    closeCreateModal();
});

function deleteProduct(productId) {
    if (confirm('¿Eliminar este producto?')) {
        socket.emit('deleteProduct', productId);
    }
}

// ==================== FUNCIONES DE MENSAJES ====================
function showAlert(type, text) {
    const alert = document.getElementById('alertMessage');
    alert.querySelector('#alertText').textContent = text;
    alert.classList.remove('hidden');

    //Manejo los estilos según el tipo de mensaje
    alert.classList.add('flex', type === 'success' ? 'bg-green-500' : 'bg-red-500');
    alert.querySelector('#alertMessage > i').className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';

    setTimeout(() => {
        alert.classList.add('hidden');
        alert.classList.remove('flex');
    }, 3000);
}

function updateConnectionStatus(connected) {
    if (connected) {
        connectionStatus.className = 'inline-flex items-center gap-2 px-4 py-2 bg-green-900 text-green-200 rounded-lg';
        connectionStatus.innerHTML = `
            <span class="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            Conectado al servidor
        `;
    } else {
        connectionStatus.className = 'inline-flex items-center gap-2 px-4 py-2 bg-red-900 text-red-200 rounded-lg';
        connectionStatus.innerHTML = `
            <span class="inline-block w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
            Desconectado del servidor
        `;
    }
}

// ==================== ANIMACIONES CSS ====================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
