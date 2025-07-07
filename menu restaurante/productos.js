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
      {
        nombre: "Hamburguesa Clásica",
        precio: 15000,
        imagen: "https://cdn-icons-png.flaticon.com/512/5787/5787198.png",
        fechaHora: "Base"
      },
      {
        nombre: "Pizza Personal",
        precio: 18000,
        imagen: "https://cdn-icons-png.flaticon.com/512/1404/1404945.png",
        fechaHora: "Base"
      },
      {
        nombre: "Ensalada Fresca",
        precio: 12000,
        imagen: "https://cdn-icons-png.flaticon.com/512/2917/2917242.png",
        fechaHora: "Base"
      },
      {
        nombre: "Taco Mexicano",
        precio: 16000,
        imagen: "https://cdn-icons-png.flaticon.com/512/5787/5787147.png",
        fechaHora: "Base"
      }
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
