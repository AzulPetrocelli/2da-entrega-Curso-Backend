# Sistema de Gestión de Productos con MongoDB - Entrega Final

Sistema profesional de gestión de productos y carritos en tiempo real usando Node.js, Express, Handlebars, Socket.io, MongoDB y Tailwind CSS.

## 🚀 Características

- ✅ **Gestor de Productos** con CRUD completo
- 🔍 **Búsqueda avanzada** con filtros, paginación y ordenamientos
- 📊 **Paginación profesional** con información completa de navegación
- ⚡ **Actualizaciones en tiempo real** mediante WebSockets (Socket.io)
- 🛒 **Gestión avanzada de carritos** con referencias a productos
- 🏠 **Vista de Productos** - Catálogo con paginación y filtros
- 📄 **Vista de Detalle** - Información completa del producto
- 🛍️ **Vista de Carrito** - Gestión detallada de compras
- 💾 **MongoDB** como base de datos principal
- 🎨 **Interfaz moderna** con Tailwind CSS
- 📱 **Diseño responsive**
- 🏗️ **Arquitectura escalable** con controladores, modelos y servicios organizados

## 📋 Requisitos

- Node.js (v14 o superior)
- npm o yarn
- MongoDB (local o Atlas)
- Conexión a internet para MongoDB Atlas (opcional)

## 🛠️ Instalación

1. **Descargar o clonar el proyecto**

2. **Instalar dependencias**

```bash
npm install
```

3. **Verificar la conexión a MongoDB** antes de iniciar el servidor

## 📁 Estructura del Proyecto

```
proyecto/
│
├── src/
│   ├── server.js                      # Servidor Express + Socket.io
│   ├── seed.js                        # Script para poblar BD inicial
│   │
│   ├── config/
│   │   └── db.js                      # Configuración de MongoDB
│   │
│   ├── models/
│   │   ├── products.model.js          # Schema de Productos
│   │   └── carts.model.js             # Schema de Carritos
│   │
│   ├── controller/
│   │   ├── products.controller.js     # Lógica de controladores de productos
│   │   ├── carts.controller.js        # Lógica de controladores de carritos
│   │   └── views.controller.js        # Renderización de vistas
│   │
│   ├── services/
│   │   ├── products.service.js        # Lógica de negocio de productos
│   │   └── carts.service.js           # Lógica de negocio de carritos
│   │
│   ├── routes/
│   │   ├── products.routes.js         # Rutas API de productos
│   │   ├── carts.routes.js            # Rutas API de carritos
│   │   └── views.routes.js            # Rutas de vistas
│   │
│   ├── socket/
│   │   └── socketEvents.js            # Eventos de Socket.io
│   │
│   ├── utils/
│   │   └── validation.js              # Funciones de validación
│   │
│   └── views/
│       ├── index.hbs                  # Catálogo de productos con paginación
│       ├── productDetail.hbs           # Detalle completo del producto
│       ├── cart.hbs                   # Vista del carrito
│       ├── error.hbs                  # Página de error
│       └── partials/
│           ├── card.hbs               # Componente tarjeta de producto
│           ├── sidebar.hbs            # Barra lateral de filtros
│           ├── addProductModal.hbs    # Modal para agregar producto
│           ├── confirmModal.hbs       # Modal de confirmación
│           └── toast.hbs              # Notificaciones toast
│
├── public/
│   ├── css/
│   │   └── animations.css             # Animaciones CSS
│   └── js/
│       ├── cart.js                    # Lógica del carrito
│       ├── filter.js                  # Lógica de filtros y paginación
│       └── confirmModal.js            # Modal de confirmación

├── package.json                       # Dependencias
├── .env.example                       # Variables de entorno de ejemplo
├── .gitignore                         # Archivos ignorados por git
├── .prettierrc                        # Configuración de formato de código
├── api_postman_collection.json        # Colleccion de postman con los enpoints
└── README.md                          # Este archivo
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

### Poblar la base de datos (opcional)

Si deseas cargar datos iniciales:

```bash
npm run seed
```

### Acceder a las vistas

Una vez que el servidor esté corriendo en http://localhost:3000:

1. **Catálogo de Productos** - http://localhost:3000/products
    - Lista completa de productos con paginación
    - Búsqueda por categoría y disponibilidad
    - Ordenamiento por precio
    - Agregar productos al carrito

2. **Detalle del Producto** - http://localhost:3000/products/:pid
    - Información completa del producto
    - Descripción, precio, stock, categoría
    - Botón para agregar al carrito

3. **Carrito** - http://localhost:3000/carts/:cid
    - Visualizar detalle del carrito
    - Gestionar cantidades de productos
    - Eliminar productos

## 🏗️ Arquitectura

### Modelos (MongoDB)

**ProductModel**

- `name` (String): Nombre del producto
- `description` (String): Descripción detallada
- `price` (Number): Precio
- `stock` (Number): Cantidad disponible
- `code` (String, unique): Código identificador
- `category` (String): Categoría del producto
- `thumbnails` (String): URL de imagen
- `status` (Boolean): Disponibilidad

**CartModel**

- `products` (Array de referencias a Products)
    - `product` (ObjectId ref ProductModel)
    - `quantity` (Number)

### Servicios

**ProductsService**

- Búsqueda con filtros avanzados
- Paginación profesional
- Ordenamiento por precio
- Validación de datos
- Persistencia en MongoDB

**CartsService**

- Gestión de carritos con populate
- Actualización de cantidades
- Eliminación de productos
- Vaciado de carrito
- Referencias a ProductModel

### Controladores

**ProductsController**

- GET: Listar productos con filtros y paginación
- GET by ID: Obtener detalle del producto
- POST: Crear producto
- PATCH: Actualizar producto
- DELETE: Eliminar producto

**CartsController**

- POST: Crear carrito
- GET: Obtener carrito con productos completos
- POST /products/:pid: Agregar producto
- PUT /products/:pid: Actualizar cantidad
- DELETE /products/:pid: Eliminar producto
- PUT: Actualizar todos los productos
- DELETE: Vaciar carrito

### Routes

- API REST bien definida y escalable
- Persistencia en MongoDB
- Integración con servicios y controladores
- Manejo de errores HTTP apropiado

## 📚 Tecnologías Utilizadas

- **Express.js** - Framework web HTTP
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Handlebars** - Motor de plantillas
- **Tailwind CSS** - Framework de estilos CSS
- **Node.js** - Runtime de JavaScript
