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

  let total = 0;

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
      <input type="number" min="1" value="1" id="cantidad-${index}" class="input-cantidad" />
      <p class="fecha">🕓 ${producto.fechaHora}</p>
      <button onclick="eliminarProducto(${index})" class="eliminar">Eliminar</button>
    `;

    contenedor.appendChild(div);

    // Sumar precio base
    total += producto.precio;

    // Escuchar cambios para actualizar el total
    const inputCantidad = div.querySelector(`#cantidad-${index}`);
    inputCantidad.addEventListener("input", calcularTotal);
  });

  totalElemento.innerHTML = `<strong>Total: ${formatoCOP(total)}</strong>`;
}

function calcularTotal() {
  const productos = obtenerProductos();
  let total = 0;

  productos.forEach((producto, index) => {
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`)?.value || 1);
    total += producto.precio * cantidad;
  });

  document.getElementById("total").innerHTML = `<strong>Total: ${formatoCOP(total)}</strong>`;
}
function imprimirRecibo() {
  const productos = obtenerProductos();
  let recibo = "🧾 RECIBO DEL RESTAURANTE\n\n";
  let total = 0;

  productos.forEach((producto, index) => {
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`)?.value || 1);
    const subtotal = producto.precio * cantidad;
    recibo += `${producto.nombre} x${cantidad} - ${formatoCOP(subtotal)}\n`;
    total += subtotal;
  });

  recibo += `\nTOTAL: ${formatoCOP(total)}`;
  recibo += `\n\nFecha de impresión: ${new Date().toLocaleString("es-CO")}`;

  // Abrir ventana para imprimir
  const nuevaVentana = window.open("", "", "width=400,height=600");
  nuevaVentana.document.write(`<pre>${recibo}</pre>`);
  nuevaVentana.print();

  setTimeout(() => {
    nuevaVentana.close();
    // 🔥 LIMPIA EL CARRITO DESPUÉS DE IMPRIMIR
    localStorage.removeItem("productos");
    mostrarProductos();
    alert("✅ Recibo impreso. El carrito ha sido limpiado.");
  }, 5000);
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
