let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cp(productos);
    })


const m = document.querySelector("#contenedorProducts");
const s = document.querySelectorAll(".buttonCategoria");
const t = document.querySelector("#tituloPrincipal");
let h = document.querySelectorAll(".botonProducto");
const k = document.querySelector("#contador");


s.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


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
    })

    aba();
}


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

    })
});

function aba() {
    h = document.querySelectorAll(".botonProducto");

    h.forEach(boton => {
        boton.addEventListener("click", ac);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    an();
} else {
    productosEnCarrito = [];
}

function ac(e) {

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
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const s = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const x = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[x].cantidad++;
    } else {
        s.cantidad = 1;
        productosEnCarrito.push(s);
    }

    an();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function an() {
    let w = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    k.innerText = w;
}