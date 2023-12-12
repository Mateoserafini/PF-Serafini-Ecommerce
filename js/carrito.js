// Obtener productos en el carrito desde el almacenamiento local
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

// Declaración de variables para elementos del DOM
const a = document.querySelector("#carritoVacio");
const b = document.querySelector("#carritoProductos");
const c = document.querySelector("#carritoAcciones");
const d = document.querySelector("#carritoComprado");
let e = document.querySelectorAll(".carritoProductoBorrar");
const f = document.querySelector("#botonVaciar");
const h = document.querySelector("#total");
const g = document.querySelector("#botonComprar");

// Función para inicializar el carrito y eventos relacionados
cpc();

// Función para actualizar la lista de botones de eliminar producto
function ab() {
    e = document.querySelectorAll(".carritoProductoBorrar");

    e.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    const i = e.currentTarget.id;
    const j = productosEnCarrito.findIndex(producto => producto.id === i);
    
    productosEnCarrito.splice(j, 1);
    cpc();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Evento para vaciar el carrito al hacer clic en el botón correspondiente
f.addEventListener("click", vc);

// Función para calcular y actualizar el total del carrito
function at() {
    const k = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${k}`;
}

// Evento para realizar la compra
g.addEventListener("click", cc);

// Función para realizar la compra (vaciar el carrito y mostrar mensaje)
function cc() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    a.classList.add("disabled");
    b.classList.add("disabled");
    c.classList.add("disabled");
    d.classList.remove("disabled");
}

// Función para actualizar la visualización del carrito
function cpc() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        a.classList.add("disabled");
        b.classList.remove("disabled");
        c.classList.remove("disabled");
        d.classList.add("disabled");
    
        b.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
                <img class="carritoProductoImg" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carritoProductoNombre">
                <p class="letraChica">Titulo</p>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carritoPoductoCantidad">
                <p class="letraChica">Titulo</p>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carritoProductoPrecio">
                <p class="letraChica">Precio</p>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carritoProductoSubtotal">
                <p class="letraChica">Subtotal</p>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carritoProductoBorrar" id="${producto.id}"><i class="bi bi-backspace"></i></button>
            `;
    
            b.append(div);
        })
    
    ab();
    at();
	
    } else {
        a.classList.remove("disabled");
        b.classList.add("disabled");
        c.classList.add("disabled");
        d.classList.add("disabled");
    }
}

// Función para confirmar vaciado del carrito mediante un modal
function vc() {
    Swal.fire({
        title: '¿Estás seguro de que quieres vaciar el carrito?',
        icon: 'question',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cpc();
        }
    })
}
