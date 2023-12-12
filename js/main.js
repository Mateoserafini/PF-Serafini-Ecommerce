// Arreglo que contendrá la lista de productos obtenidos del archivo JSON
let productos = [];

// Obtener datos del archivo JSON y llamar a la función cp para cargar los productos en la página
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cp(productos);
    });

// Declaración de variables para elementos del DOM
const m = document.querySelector("#contenedorProducts");
const s = document.querySelectorAll(".buttonCategoria");
const t = document.querySelector("#tituloPrincipal");
let h = document.querySelectorAll(".botonProducto");
const k = document.querySelector("#contador");
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// Evento para cerrar el aside al hacer clic en una categoría
s.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));

// Función para cargar productos en el contenedor principal
function cp(z) {
    m.innerHTML = "";

    z.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="imgProducto" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="infoProducto">
                <h3 class="tituloProducto">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="botonProducto" id="${producto.id}">Agregar</button>
            </div>
        `;

        m.append(div);
    });

    aba();
}

// Asignar eventos a los botones de categoría para filtrar productos
s.forEach(boton => {
    boton.addEventListener("click", (e) => {
        s.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const f = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            t.innerText = f.categoria.nombre;
            const g = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cp(g);
        } else {
            t.innerText = "Todos los productos";
            cp(productos);
        }
    });
});

// Asignar eventos a los botones de producto para agregar al carrito
function aba() {
    h = document.querySelectorAll(".botonProducto");

    h.forEach(boton => {
        boton.addEventListener("click", ac);
    });
}

// Verificar si hay productos en el carrito almacenados localmente y cargar la función an para actualizar el contador
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    an();
} else {
    productosEnCarrito = [];
}

// Función para agregar productos al carrito y mostrar una notificación
function ac(e) {
    // Mostrar notificación de producto agregado
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #eebbbb, #e98080)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function () { }
    }).showToast();

    const y = e.currentTarget.id;
    const s = productos.find(producto => producto.id === y);

    if (productosEnCarrito.some(producto => producto.id === y)) {
        const x = productosEnCarrito.findIndex(producto => producto.id === y);
        productosEnCarrito[x].cantidad++;
    } else {
        s.cantidad = 1;
        productosEnCarrito.push(s);
    }

    // Actualizar contador de productos en el carrito
    an();

    // Actualizar productos en el carrito almacenados localmente
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Función para actualizar el contador de productos en el carrito
function an() {
    let w = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    k.innerText = w;
}
