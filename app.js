
const examenes = [
    { titulo: "COVID", id: "XM001",precio: 95},
    { titulo: "Tuberculosis", id: "XM002",precio: 50},
    { titulo: "Influenza", id: "XM003",precio: 85},
    { titulo: "Faringitis Bacteriana", id: "XM004", precio: 75}
];

//STORAGE Y JSON
const aJson = JSON.stringify (examenes)
localStorage.setItem("Examenes",aJson)

const examenesArray = JSON.parse(localStorage.getItem("Examenes"))
examenesArray.push({titulo: "Tifoidea", id: "XM005",precio:55})
localStorage.setItem("Examenes",JSON.stringify(examenesArray))

//VALIDACION FACTBILIDAD PRUEBA

let optionSelected = document.querySelector(".form-select");
let btnreservar = document.querySelector(".btn-reservar");

btnreservar.addEventListener("click", function () {
  let sintoma = document.querySelector("#sintoma").value;
  let selector = document.querySelector(".selector");
  selector.innerHTML = `
  <div class="alert alert-success" role="alert">
  <h5>${texto}</h5>
  </div>`;
});

var texto;
switch(sintoma){
    case 0: 
    case 1:
    case 2:
        texto = "No puede realizar la prueba aún";
        break;

    case 3:
    case 4: 
    case 5:
    case 6: 
    case 7:  
        texto = "Puede realizar la prueba";
        break;
    default:
        texto =  "Requiere orden médica";
        break;

}

//CARRITO

const cards = document.querySelectorAll(".card");
cards.forEach((card)=>{
    card.addEventListener("click",(e)=>{
        leerDatosProductos(e.target.parentElement)
    })
})

let articulosCarrito=[]

function leerDatosProductos(producto){
    const infoProducto ={
        titulo: producto.querySelector(".card-title").textContent,
        precio: producto.querySelector (".card-price").textContent,
    };

    articulosCarrito=[...articulosCarrito, infoProducto];

    carritoHTML();
}

//MOSTRAR PRODUCTOS DEL CARRITO SIN REPETICION
const carrito = document.querySelector("#carrito");

function carritoHTML(){
limpiarHTML();

    articulosCarrito.forEach((producto)=>{
        const row = document.createElement("p")
        row.innerHTML=`
        <div class="container">
        <h5>${producto.titulo}</h5>
        <p>${producto.precio}</p>
        </div>`;

        carrito.appendChild(row);
    });
}

function limpiarHTML(){
    carrito.innerHTML = "";
}

