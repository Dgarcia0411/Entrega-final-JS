
const colorCarrito =() =>{
    modalContainer.innerHTML =""
    modalContainer.style.display ="flex"
   const modalHeader =document.createElement("div")
   modalHeader.className ="modal-header";
   modalHeader.innerHTML=`
   <h3 modal-header-title> Carrito </h3>
   `;
   modalContainer.append(modalHeader);

   const modalButton=document.createElement("h2");
   modalButton.innerText="Cerrar"
   modalButton.className="modal-header-button";

   modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
})
   modalHeader.append(modalButton)

// Contenido del carrito
   carrito.forEach((productos)=>{
    let contenidoCarrito =document.createElement("div")
    contenidoCarrito.className="modal-content"
    contenidoCarrito.innerHTML =`
    <img src="${productos.img}">
    <h3> ${productos.nombre} </h3>
    <p class="precio"> $${productos.precio}</p>
    <span class="restar"> - </span>
    <p> Cant: ${productos.cantidad}</p>
    <span class="sumar"> + </span>
    <p> Total: ${productos.cantidad * productos.precio}</p>

`;
modalContainer.append(contenidoCarrito)

let restar =contenidoCarrito.querySelector(".restar")
restar.addEventListener("click", () => {
    if (productos.cantidad !== 1) {
        productos.cantidad--;
    }
       guardar()
       colorCarrito()
})
let sumar =contenidoCarrito.querySelector(".sumar")
sumar.addEventListener("click", () => {
        productos.cantidad++  ;
        guardar()
        colorCarrito();
})



//variable  para agregar la opcón de eliminar un producto

let eliminar = document.createElement ("span")
eliminar.innerText ="✖";
eliminar.className ="borrar-Producto";
contenidoCarrito.append(eliminar)
eliminar.addEventListener("click", eliminarProducto)

})

// contenido total del carrito
const total = carrito.reduce((compilar, producto) => {
    return compilar + producto.precio * producto.cantidad
}, 0)
const montoTotal = document.createElement("div")
montoTotal.className = "total-content"
montoTotal.innerHTML =`Total a pagar es $${total}`
modalContainer.append(montoTotal)
}
verCarrito.addEventListener("click", colorCarrito)  

//función para eliminar el producto sin llamar el ID
function  eliminarProducto (){
    const buscarId = carrito.find((elemento) => elemento.id)

    carrito = carrito.filter((carritoId) =>{ 
        return carritoId !==buscarId;
        
    })
    Swal.fire({
        title: 'Estas seguro de eliminar el producto?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'eliminado !',
            'Producto eliminado con éxito.',
            'success'
          )
                 


          
        }
      })
    conteoCarrto()
    guardar()
    colorCarrito()

};
const conteoCarrto =() => {
    cantidadCarrito.style.display ="block";
    const carritolength = carrito.length;
    localStorage.setItem("carritolength" , JSON.stringify(carritolength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritolength"))
}
conteoCarrto()