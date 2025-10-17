let tablaCarrito = document.querySelector(".cart-table tbody");

//agregar evento al navegador
document.addEventListener("DOMContentLoaded", ()=>{
    cargarProductos();
});


//funcion cargar productos del local storage al detalle del carrito
function cargarProductos() {
 let todosProductos = [];    
 let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if(productosPrevios !== null) {
        todosProductos = Object.values(productosPrevios);
}
todosProductos.forEach((producto) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td> 
        <span onclick="eliminarProducto()" class="btn btn-danger">X</span>
        <img src "${producto.imagen}" width="70px">
        ${producto.nombre}
        </td>
        <td> $${producto.precio}</td>
        <td> cantidad </td>
        <td> $${producto.precio}</td>

    
      
    `;
    tablaCarrito.appendChild(fila);
});
}