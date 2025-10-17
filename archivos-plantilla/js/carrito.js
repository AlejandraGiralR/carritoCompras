//variables globales

let btnProducts = document.querySelectorAll(".btn-product");
let contadorCarrito = document.querySelector(".contar-pro");
let listadoCarrito = document.querySelector(".list-cart tbody");
let cont=0;
//console.log(btnProducts);
document.addEventListener("DOMContentLoaded", ()=>{
    cargarProdsLs();
});



btnProducts.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    //alert("Diste click en el producto " + (i + 1));
    cont++;
    contadorCarrito.textContent = cont;
    //Agregar producto al carrito
    infoProducto(i);

  });
});

//Funcion agregar producto al carrito
function agregarProducto(producto) {
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td> ${cont}</td>
        <td> <img src "${producto.imagen}" width="70px"></td>
        <td> ${producto.nombre}</td>
        <td> $${producto.precio}</td>
        <td> <span onclick="eliminarProducto(${cont})" class="btn btn-danger">X</span></td>
      
    `;
    listadoCarrito.appendChild(fila);


}

//funciona para agregar la informacion del producto al carrito

function infoProducto(pos) {

    let producto = btnProducts[pos].parentElement.parentElement.parentElement;
    let infoProd = {
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio:producto.querySelector("h5").textContent.split("$")[1],
        cantidad: 1
    }
    //console.log(infoProd);
    agregarProducto(infoProd);
    guardarProdLs(infoProd);
}

//funcion para eliminar producto del carrito
function eliminarProducto(pos) {
   let producto = event.target;
   //console.log(producto.parentElement.parentElement);
   producto.parentElement.parentElement.remove();
   //disminuir contador
   if (cont > 0) {
       cont--;
       contadorCarrito.textContent = cont;
   }
   eliminarProdLs(pos);
}

//guardar el localstorage

function guardarProdLs(producto) {
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
  /* let todosProductos = [];    
 let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if(productosPrevios !== null) {
        todosProductos = Object.values(productosPrevios);
}; */
todosProductos.push(producto);
localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}

//Borrar productos del localstorage
function eliminarProdLs(pos) {
let todosProductos = [];    
 let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if(productosPrevios !== null) {
        todosProductos = Object.values(productosPrevios);
    }
    todosProductos.splice((pos-1), 1);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
    };

    //Cargar productos del localstorage al carrito
    function cargarProdsLs() {
let todosProductos = [];    
 let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if(productosPrevios !== null) {
        todosProductos = Object.values(productosPrevios);
    }
    todosProductos.forEach((producto) => {
        agregarProducto(producto);
    });
  }

  contadorCarrito.parentElement.addEventListener("click", () => {
listadoCarrito.parentElement.classList.toggle("ocultar");
  });

/* 
  // sidebarCarrito.js
document.addEventListener("DOMContentLoaded", () => {
  const iconoCarrito = document.getElementById("icono-carrito");
  const sidebar = document.getElementById("sidebar-carrito");
  const cerrarSidebar = document.getElementById("cerrar-sidebar");
  const listaCarrito = document.getElementById("lista-carrito");
  const subtotalSidebar = document.getElementById("subtotal-sidebar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Mostrar / ocultar sidebar
  iconoCarrito.addEventListener("click", () => {
    sidebar.classList.add("abierto");
    renderSidebar();
  });

  cerrarSidebar.addEventListener("click", () => {
    sidebar.classList.remove("abierto");
  });

  // Renderizar productos del carrito
  function renderSidebar() {
    listaCarrito.innerHTML = "";
    let subtotal = 0;

    if (carrito.length === 0) {
      listaCarrito.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      subtotalSidebar.textContent = "$0";
      return;
    }

    carrito.forEach((producto, index) => {
      const li = document.createElement("li");

      const subtotalProd = producto.precio * producto.cantidad;
      subtotal += subtotalProd;

      li.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${producto.imagen || './images/logo.png'}" alt="${producto.nombre}">
          <div>
            <p class="mb-0"><strong>${producto.nombre}</strong></p>
            <small>$${producto.precio.toLocaleString()}</small>
          </div>
        </div>
        <div class="text-end">
          <input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="cantidad-sidebar form-control mb-1">
          <button class="btn btn-sm btn-danger eliminar-item" data-index="${index}">&times;</button>
        </div>
      `;
      listaCarrito.appendChild(li);
    });

    subtotalSidebar.textContent = `$${subtotal.toLocaleString()}`;
  }

  // Actualizar cantidad
  listaCarrito.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad-sidebar")) {
      const index = e.target.dataset.index;
      carrito[index].cantidad = parseInt(e.target.value);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderSidebar();
    }
  });

  // Eliminar producto
  listaCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar-item")) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderSidebar();
    }
  });
}); */