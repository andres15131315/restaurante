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

function imprimirRecibo() {
  const productos = obtenerProductos();
  const mesa = document.getElementById("mesa").value;

  if (!mesa) {
    alert("⚠️ Debes seleccionar una mesa antes de imprimir.");
    return;
  }

  if (productos.length === 0) {
    alert("⚠️ No hay productos en el carrito.");
    return;
  }

  let recibo = "🧾 RECIBO DEL RESTAURANTE\n\n";
  recibo += `Mesa: ${mesa}\n\n`;
  let total = 0;
  const resumenProductos = [];

  productos.forEach((producto, index) => {
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`)?.value || 0);

    if (cantidad > 0) {
      const subtotal = producto.precio * cantidad;
      recibo += `${producto.nombre} x${cantidad} - ${formatoCOP(subtotal)}\n`;
      total += subtotal;

      resumenProductos.push({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
      });
    }
  });

  if (resumenProductos.length === 0) {
    alert("⚠️ No se seleccionaron productos con cantidad mayor a 0.");
    return;
  }

  recibo += `\nTOTAL: ${formatoCOP(total)}`;
  recibo += `\nFecha: ${new Date().toLocaleString("es-CO")}`;

  // Guardar en el registro de actividad
  const venta = {
    mesa,
    productos: resumenProductos,
    total,
    fecha: new Date().toLocaleString("es-CO"),
  };

  const registro = JSON.parse(localStorage.getItem("registroVentas")) || [];
  registro.push(venta);
  localStorage.setItem("registroVentas", JSON.stringify(registro));

  // Imprimir
  const ventana = window.open("", "", "width=400,height=600");
  ventana.document.write(`<pre>${recibo}</pre>`);
  ventana.print();

  setTimeout(() => {
    ventana.close();
    reiniciarCantidades(); // Reinicia cantidades a 0 pero NO borra productos
    alert("✅ Recibo impreso. Pedido registrado.");
  }, 500);
}

function reiniciarCantidades() {
  const productos = obtenerProductos();
  mostrarProductos(); // Redibuja las tarjetas

  // Reiniciar los inputs a 0 después de dibujar
  productos.forEach((_, index) => {
    const input = document.getElementById(`cantidad-${index}`);
    if (input) {
      input.value = 0;
    }
  });

  calcularTotal(); // El total vuelve a 0
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
