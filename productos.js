// === Manejo de productos del menú principal ===
function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function agregarProducto(producto) {
  const productos = obtenerProductos();
  productos.push(producto);
  guardarProductos(productos);
}

function eliminarProducto(index) {
  const productos = obtenerProductos();
  productos.splice(index, 1);
  guardarProductos(productos);
  mostrarProductos(); // definida en scrip.js
}

// === Productos base para el menú predeterminado ===
function obtenerProductosBase() {
  return JSON.parse(localStorage.getItem("productosBase")) || [];
}

function guardarProductosBase(productos) {
  localStorage.setItem("productosBase", JSON.stringify(productos));
}

function inicializarProductosBase() {
  if (!localStorage.getItem("productosBase")) {
    const base = [
      { nombre: "Sancocho de gallina", precio: 8000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", fechaHora: "Base" },
      { nombre: "Sancocho de gallina (Pequeño)", precio: 4000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", fechaHora: "Base" },

      { nombre: "Chuleta de pollo y cerdo", precio: 37000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046762.png", fechaHora: "Base" },
      { nombre: "1/2 Chuleta", precio: 21000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046762.png", fechaHora: "Base" },

      { nombre: "Sancocho de espinazo", precio: 9000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", fechaHora: "Base" },
      { nombre: "Sancocho de espinazo (Pequeño)", precio: 5000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", fechaHora: "Base" },

      { nombre: "Trucha", precio: 30000, imagen: "https://cdn-icons-png.flaticon.com/512/3480/3480314.png", fechaHora: "Base" },
      { nombre: "Tilapia", precio: 34000, imagen: "https://cdn-icons-png.flaticon.com/512/3480/3480314.png", fechaHora: "Base" },

      { nombre: "Churrasco", precio: 37000, imagen: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png", fechaHora: "Base" },
      { nombre: "1/2 Churrasco", precio: 26000, imagen: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png", fechaHora: "Base" },

      { nombre: "Bandeja de costilla", precio: 19000, imagen: "https://cdn-icons-png.flaticon.com/512/2635/2635450.png", fechaHora: "Base" },
      { nombre: "Bandeja de carne frita", precio: 19000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png", fechaHora: "Base" },
      { nombre: "Bandeja de carne asada", precio: 19000, imagen: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png", fechaHora: "Base" },
      { nombre: "Bandeja de gallina", precio: 19000, imagen: "https://cdn-icons-png.flaticon.com/512/1998/1998611.png", fechaHora: "Base" },

      { nombre: "Adición de hueso", precio: 4000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046789.png", fechaHora: "Base" },
      { nombre: "Adición de frijol", precio: 2000, imagen: "https://cdn-icons-png.flaticon.com/512/2909/2909765.png", fechaHora: "Base" },
      { nombre: "Adición de carne", precio: 9000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png", fechaHora: "Base" },
      { nombre: "Adición de costilla", precio: 9000, imagen: "https://cdn-icons-png.flaticon.com/512/2635/2635450.png", fechaHora: "Base" },
      { nombre: "Adición de arroz", precio: 2000, imagen: "https://cdn-icons-png.flaticon.com/512/1998/1998613.png", fechaHora: "Base" },
      { nombre: "Adición de papas", precio: 4000, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046780.png", fechaHora: "Base" },
      { nombre: "Adición de patacón", precio: 4000, imagen: "https://cdn-icons-png.flaticon.com/512/135/135620.png", fechaHora: "Base" },

      { nombre: "Picadas", precio: 0, imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046767.png", fechaHora: "Base" }
    ];
    guardarProductosBase(base);
  }
}


// === Productos creados por el usuario ===
function obtenerPredeterminados() {
  return JSON.parse(localStorage.getItem("productosPredeterminados")) || [];
}

function guardarPredeterminados(productos) {
  localStorage.setItem("productosPredeterminados", JSON.stringify(productos));
}

function agregarPredeterminado(producto) {
  const productos = obtenerPredeterminados();
  productos.push(producto);
  guardarPredeterminados(productos);
}
