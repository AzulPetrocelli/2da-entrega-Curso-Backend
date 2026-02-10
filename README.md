# Sistema de Gestión de Productos con WebSockets - Entrega N° 2

Sistema completo de gestión de productos en tiempo real usando Node.js, Express, Handlebars, Socket.io y Tailwind CSS.

## 🚀 Características

- ✅ **Gestor de Productos** con CRUD completo
- ⚡ **Actualizaciones en tiempo real** mediante WebSockets (Socket.io)
- 🏠 **Vista Home** - Catálogo estático de productos
- 🔄 **Vista Real-Time Products** - Gestión dinámica con websockets
- 🎨 **Interfaz moderna** con Tailwind CSS
- 📱 **Diseño responsive**
- 🏗️ **Arquitectura escalable** con managers y rutas organizadas

## 📋 Requisitos

- Node.js (v14 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Descargar o clonar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

## 📁 Estructura del Proyecto

```
proyecto/
│
├── src/
│   ├── server.js                 # Servidor Express + Socket.io
│   ├── db/
│   │   ├── products.json         # Base de datos de productos
│   │   └── carts.json            # Base de datos de carritos
│   ├── manager/
│   │   ├── Product.manager.js    # Lógica de productos
│   │   └── Cart.manager.js       # Lógica de carritos
│   ├── routes/
│   │   ├── products.routes.js    # Rutas API de productos
│   │   └── carts.routes.js       # Rutas API de carritos
│   ├── socket/
│   │   └── socketEvents.js       # Eventos de Socket.io
│   └── views/
│       ├── home.hbs              # Vista principal (catálogo)
│       ├── realTimeProducts.hbs  # Vista con actualizaciones en tiempo real
│       └── products.hbs          # Vista antigua (opcional)
│
├── public/
│   └── js/
│       └── realtimeProducts.js   # Lógica cliente para realTimeProducts
│
├── package.json                  # Dependencias
├── .gitignore                    # Archivos ignorados por git
└── README.md                     # Este archivo
```

## 🚀 Uso

### Iniciar el servidor

**Modo producción:**
```bash
npm start
```

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

### Acceder a las vistas

Una vez que el servidor esté corriendo en http://localhost:3000:

1. **Vista Home** - http://localhost:3000/
   - Catálogo estático de todos los productos
   - Solo lectura
   - Perfecta para ver todos los productos disponibles

2. **Vista Real-Time Products** - http://localhost:3000/realtimeproducts
   - Gestión completa de productos con WebSockets
   - Crear nuevos productos
   - Eliminar productos existentes
   - Actualizaciones automáticas en tiempo real
   - Múltiples usuarios ven cambios simultáneamente

## 📡 API REST Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products?limit=10` | Obtener productos con límite |
| GET | `/api/products/:pid` | Obtener producto por ID |
| POST | `/api/products` | Crear nuevo producto |
| PATCH | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |

**Ejemplo POST/PATCH:**
```json
{
  "title": "Laptop",
  "description": "Laptop gaming de alta gama",
  "price": 1500.00,
  "stock": 5,
  "code": "LAP001",
  "category": "Electrónica",
  "thumbnails": "https://...",
  "status": true
}
```

### Carritos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/carts` | Crear carrito |
| GET | `/api/carts/:cid` | Obtener carrito |
| POST | `/api/carts/:cid/product/:pid` | Agregar producto a carrito |

## WebSocket Events

### Cliente → Servidor

```javascript
// Solicitar todos los productos
socket.emit('getProducts');

// Crear nuevo producto
socket.emit('createProduct', {
    title: "Producto",
    description: "Descripción",
    price: 100,
    stock: 10,
    code: "CODE123",
    category: "Categoría",
    thumbnails: "url",
    status: true
});

// Eliminar producto
socket.emit('deleteProduct', productId);

// Actualizar producto
socket.emit('updateProduct', productId, updatedData);
```

### Servidor → Cliente

```javascript
// Cargar productos iniciales
socket.on('loadProducts', (products) => {});

// Usuario crea producto
socket.on('productCreated', (product) => {});

// Usuario elimina producto
socket.on('productDeleted', (productId) => {});

// Usuario actualiza producto
socket.on('productUpdated', (product) => {});

// Errores
socket.on('error', (message) => {});
```

## 🏗️ Cómo funciona el flujo en tiempo real

1. **Usuario abre realTimeProducts** 
   - Socket se conecta automáticamente

2. **Cliente solicita productos** 
   - Servidor envía listado inicial

3. **Usuario crea/elimina producto**:
   - Emite evento por WebSocket
   - Servidor procesa en ProductManager
   - ProductManager emite a TODOS los clientes
   - DOM se actualiza automáticamente en cada cliente
   - Cambios se persisten en JSON

4. **Persistencia**
   - Los cambios se guardan automáticamente en db/products.json

## 🏗️ Arquitectura

### ProductManager
Clase responsable de la gestión de productos:
- ✅ Validar datos de entrada
- ✅ Crear, leer, actualizar, eliminar productos
- ✅ Emitir eventos Socket.io cuando ocurren cambios
- ✅ Persistencia en JSON

### SocketEvents
Configuración centralizada de eventos Socket.io:
- Maneja conexiones y desconexiones
- Delega operaciones al ProductManager
- Emite eventos a todos los clientes conectados
- Manejo de errores

### Rutas
- API REST bien definidas
- Persistencia en archivo JSON
- Integración con managers
- Manejo de errores HTTP apropiado

## 💡 Características Adicionales

- ✨ Animaciones suaves en tarjetas de productos
- 🎯 Indicators de conexión en tiempo real
- 📱 Interfaz completamente responsive
- ♿ Accesibilidad mejorada
- 🎨 Tema oscuro moderno
- ⚡ Carga rápida y eficiente

## 📝 Notas Importantes

1. **Base de datos**: Los datos se persisten en archivos JSON (`db/products.json` y `db/carts.json`)
2. **WebSockets**: Socket.io gestiona automáticamente reconexiones
3. **ES6 Modules**: El proyecto usa módulos ES6 (`import/export`)
4. **Validación**: El ProductManager valida todos los campos requeridos

## 🐛 Troubleshooting

**Problema**: El servidor no inicia
- Verifica que el puerto 3000 esté disponible
- Ejecuta `npm install` para instalar dependencias

**Problema**: Los cambios no aparecen en tiempo real
- Verifica la conexión WebSocket en la consola del navegador
- Recarga la página

**Problema**: Los datos no se persisten
- Verifica que `/src/db/` existe y tiene permisos de escritura
- Comprueba que los archivos JSON tienen formato válido

## 📚 Tecnologías Utilizadas

- **Express.js** - Framework web
- **Socket.io** - WebSockets
- **Handlebars** - Motor de plantillas
- **Tailwind CSS** - Estilos
- **Node.js** - Runtime
- **Font Awesome** - Iconos

---

**Desarrollado con ❤️ para la gestión en tiempo real de productos - Entrega N° 2**
