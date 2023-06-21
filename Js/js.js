const contenidoTienda = document.getElementById("contenidoTienda")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const cantidadCarrito =document.getElementById("cantidadCarrito")
const urlProductos ="https://648dd2792de8d0ea11e8415e.mockapi.io/entregafinal/productos";


// aplicación del getItem y json para obtener lo que guardamos en el setItem
let carrito = JSON.parse(localStorage.getItem("guardarCompra")) || [];

async function getProductos (){
   const respuesta = await fetch (urlProductos);
   const data = await respuesta.json();
   
     //agregar productos al js
data.forEach((productos)=>{
   let contenido = document.createElement("div")
   contenido.className = "card";
   contenido.innerHTML = `
    <img src="${productos.img}">
   <h3> ${productos.nombre} </h3>
   <p class="precio"> $${productos.precio}</p>
   `;
   contenidoTienda.append(contenido)
      
   let comprar =document.createElement("button")
   comprar.innerText = "Comprar";
   comprar.className = "comprar";
   
    contenido.append(comprar);
   
    //evento para comprar un producto al carrito
    comprar.addEventListener("click", () => {
   
      const repetir = carrito.some((repetirProducto)=> repetirProducto.id === productos.id)
      if (repetir  === true) {
         carrito.map((prod) => {
            if(prod.id === productos.id){
               prod.cantidad++
            }
         } )
      } else{
        carrito.push({
       id: productos.id,
       img: productos.img,
       nombre: productos.nombre,
       precio: productos.precio,
       cantidad: productos.cantidad,
    })
   }
    console.log(carrito);
    conteoCarrto () 
    guardar()
   
    });
   });
}
getProductos()






// aplicación del setItem y json para guardar informaciòn local

function guardar() {
   localStorage.setItem("guardarCompra" , JSON.stringify(carrito))
}

