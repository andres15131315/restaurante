function formatoCOP(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
}

function mostrarProductos() {
  const productos = obtenerProductos();
  const contenedor = document.getElementById("menu");
  const totalElemento = document.getElementById("total");
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "tarjeta";

    const imagenHTML = producto.imagen
      ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-plato">`
      : `<div class="sin-imagen">Sin imagen</div>`;

    div.innerHTML = `
      ${imagenHTML}
      <h3>${producto.nombre}</h3>
      <p>Precio unitario: ${formatoCOP(producto.precio)}</p>
      <input type="number" min="0" value="0" id="cantidad-${index}" class="input-cantidad" />
      <p class="fecha">🕓 ${producto.fechaHora}</p>
      <button onclick="eliminarProducto(${index})" class="eliminar">Eliminar</button>
    `;

    contenedor.appendChild(div);

    const inputCantidad = div.querySelector(`#cantidad-${index}`);
    inputCantidad.addEventListener("input", calcularTotal);
  });

  calcularTotal();
}

function calcularTotal() {
  const productos = obtenerProductos();
  let total = 0;

  productos.forEach((producto, index) => {
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`)?.value || 0);
    if (cantidad > 0) {
      total += producto.precio * cantidad;
    }
  });

  document.getElementById("total").innerHTML = `<strong>Total: ${formatoCOP(total)}</strong>`;
}

function reiniciarCantidades() {
  const productos = obtenerProductos();
  mostrarProductos(); // Redibuja las tarjetas

  productos.forEach((_, index) => {
    const input = document.getElementById(`cantidad-${index}`);
    if (input) {
      input.value = 0;
    }
  });

  calcularTotal();
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
