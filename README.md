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

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:contrasena@cluster.mongodb.net/nombreBD
# O para desarrollo local:
# MONGODB_URI=mongodb://localhost:27017/nombreBD

# Servidor
PORT=3000
NODE_ENV=development
```

4. **Verificar la conexión a MongoDB** antes de iniciar el servidor

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

## 📡 API REST Endpoints

### Productos

| Método | Endpoint                          | Descripción                             |
| ------ | --------------------------------- | --------------------------------------- |
| GET    | `/api/products`                   | Obtener todos los productos con filtros |
| GET    | `/api/products?limit=10`          | Productos con límite de resultados      |
| GET    | `/api/products?page=1`            | Obtener página específica (default: 1)  |
| GET    | `/api/products?query=Electronics` | Filtrar por categoría                   |
| GET    | `/api/products?sort=asc\|desc`    | Ordenar por precio (asc/desc)           |
| GET    | `/api/products/:pid`              | Obtener producto por ID                 |
| POST   | `/api/products`                   | Crear nuevo producto                    |
| PATCH  | `/api/products/:pid`              | Actualizar producto                     |
| DELETE | `/api/products/:pid`              | Eliminar producto                       |

**Parámetros de consulta (Query Params):**

```
GET /api/products?limit=10&page=2&query=Electronics&sort=asc
```

- `limit` (opcional): Número de productos por página (default: 10)
- `page` (opcional): Número de página (default: 1)
- `query` (opcional): Filtrar por categoría o disponibilidad
- `sort` (opcional): Ordenamiento por precio (asc/desc)

**Ejemplo POST/PATCH:**

```json
{
    "title": "Laptop",
    "description": "Laptop gaming de alta gama",
    "price": 1500.0,
    "stock": 5,
    "code": "LAP001",
    "category": "Electrónica",
    "thumbnails": "https://...",
    "status": true
}
```

**Respuesta GET /api/products:**

```json
{
    "status": "success",
    "payload": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "title": "Producto 1",
            "description": "Descripción",
            "price": 100,
            "stock": 10,
            "code": "CODE001",
            "category": "Electrónica",
            "thumbnails": "url",
            "status": true
        }
    ],
    "totalPages": 5,
    "prevPage": 1,
    "nextPage": 3,
    "page": 2,
    "hasPrevPage": true,
    "hasNextPage": true,
    "prevLink": "/api/products?page=1&limit=10&query=&sort=",
    "nextLink": "/api/products?page=3&limit=10&query=&sort="
}
```

### Carritos

| Método | Endpoint                        | Descripción                     |
| ------ | ------------------------------- | ------------------------------- |
| POST   | `/api/carts`                    | Crear carrito                   |
| GET    | `/api/carts/:cid`               | Obtener carrito (con populate)  |
| POST   | `/api/carts/:cid/products/:pid` | Agregar producto a carrito      |
| PUT    | `/api/carts/:cid/products/:pid` | Actualizar cantidad de producto |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar producto del carrito   |
| PUT    | `/api/carts/:cid`               | Actualizar todos los productos  |
| DELETE | `/api/carts/:cid`               | Vaciar el carrito               |

**Ejemplo POST agregar producto:**

```json
{
    "quantity": 2
}
```

**Ejemplo PUT actualizar cantidad:**

```json
{
    "quantity": 5
}
```

**Ejemplo PUT actualizar todos los productos:**

```json
{
    "products": [
        {
            "product": "507f1f77bcf86cd799439011",
            "quantity": 2
        },
        {
            "product": "507f1f77bcf86cd799439012",
            "quantity": 1
        }
    ]
}
```

## 🌐 Rutas de Vistas

### Productos

| Ruta                 | Descripción                       |
| -------------------- | --------------------------------- |
| `GET /products`      | Catálogo con paginación y filtros |
| `GET /products/:pid` | Detalle completo del producto     |

### Carritos

| Ruta              | Descripción                   |
| ----------------- | ----------------------------- |
| `GET /carts/:cid` | Visualizar carrito específico |

## 🔄 Flujo de Búsqueda y Paginación

### Búsqueda de Productos

1. **Usuario accede a /products**
    - Se carga la página 1 con 10 productos por defecto
    - Se muestran controles de filtrado y paginación

2. **Usuario aplica filtros** (query, sort, limite)
    - Se envía solicitud GET a `/api/products?query=...&sort=...&limit=...&page=...`
    - Server procesa los parámetros en ProductsService
    - Retorna objeto con formato de paginación

3. **Resultado se renderiza**
    - Productos se muestran en grid
    - Botones de navegación se actualizan
    - Enlaces prev/next apuntan a URLs correctas

### Gestión de Carritos

1. **Usuario agrega producto**
    - Click en "Agregar al carrito"
    - POST a `/api/carts/:cid/products/:pid`
    - Carrito actualizado en MongoDB con populate

2. **Usuario visualiza carrito**
    - Accede a `/carts/:cid`
    - Se cargan productos completos mediante populate
    - Puede modificar cantidades o eliminar productos

## 🏗️ Arquitectura

### Modelos (MongoDB)

**ProductModel**

- `title` (String): Nombre del producto
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
- `createdAt` (Date): Fecha de creación

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

## 💡 Características Adicionales

- ✨ Filtrado por categoría y disponibilidad
- 🔢 Paginación profesional con navegación directa
- 📊 Ordenamiento ascendente/descendente por precio
- 🗄️ MongoDB para persistencia escalable
- 📱 Interfaz responsive
- ♿ Accesibilidad mejorada
- 🎨 Tema oscuro y moderno
- ⚡ Carga rápida y eficiente
- 🔗 Referencias entre modelos con populate
- 💬 Validación de entrada en servidor y cliente

## 📝 Notas Importantes

1. **Base de datos**: MongoDB es el sistema de persistencia principal
2. **Referencias**: Los carritos almacenan ObjectIds de productos, se cargan completamente con populate
3. **Validación**: Los servicios validan todos los campos requeridos
4. **Paginación**: Limit por defecto es 10, page por defecto es 1
5. **ES6 Modules**: El proyecto usa módulos ES6 (`import/export`)
6. **Variables de entorno**: Necesaria la configuración de MONGODB_URI en `.env`
7. **Filtros**: Se pueden combinar múltiples query params para búsquedas avanzadas

## 📚 Tecnologías Utilizadas

- **Express.js** - Framework web HTTP
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Handlebars** - Motor de plantillas
- **Tailwind CSS** - Framework de estilos CSS
- **Socket.io** - WebSockets en tiempo real
- **Node.js** - Runtime de JavaScript
