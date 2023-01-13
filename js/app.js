// ARRAY DE TODOS LOS EXAMENES 
let allProducts = []

// EXAMENES EN EL CARRITO
let cartProducts = []

// SELECTORES
const productListContainer = document.querySelector('#productListContainer')

const cardName = document.querySelector('.cardName')
const cardPrice = document.querySelector('.cardPrice')
const cardDesc = document.querySelector('.cardDesc')
const cardCTA = document.querySelector('.cardCTA')

const cartContainer = document.querySelector('.cartContainer')
const cartReset = document.querySelector('.cartCTA')

const searchBar = document.querySelector('#searchBar')
const searchButton = document.querySelector('#searchButton')


// FUNCIONES
const guardarEnStorage = (nombre, valor) => {
    localStorage.setItem(nombre, JSON.stringify(valor))
}

const renderizarListProducts = (array) => {
    productListContainer.innerHTML = ''
    array.forEach((examen) => {
        const examenButton = document.createElement('button')
        examenButton.classList.add('menuTab')
        examenButton.setAttribute('data-id', examen.id)
        examenButton.innerHTML = `

        <span class="menuTabText"> ${examen.name} </span>

        `
        productListContainer.append(examenButton)
    })

    document.querySelectorAll('.menuTab').forEach((button) => {
        button.addEventListener('click', renderizarProductInfo)
    })
}

const renderizarProductInfo = (e) => {
    const productIdSelected = e.target.closest('.menuTab').getAttribute('data-id')
    const productSelected = allProducts.find((examen) => examen.id == productIdSelected)

    cardName.textContent = productSelected.name
    cardPrice.textContent = productSelected.price
    cardDesc.textContent = productSelected.desc
    cardCTA.setAttribute('data-id', productSelected.id)
}


const agregarProductCart = (e) => {
    const productIdSelected = e.target.getAttribute('data-id')
    const productSelected = allProducts.find((examen) => examen.id == productIdSelected)
    
    cartProducts.length < 5 ? (cartProducts.push(productSelected), guardarEnStorage('cartProducts', cartProducts)) : Swal.fire('Max products in cart: 5')
   
    renderizarTotalCart()
}

const renderizarTotalCart = () => {
    cartContainer.innerHTML = ''
    cartProducts.forEach((examen) => {
        const productInCart = document.createElement('div')
        productInCart.classList.add('productInCart')
        productInCart.setAttribute('data-id', examen.id)
        productInCart.innerHTML = `
            <h5>${examen.name}</h5>
        `
        cartContainer.append(productInCart)
    })

    document.querySelectorAll('.productInCart').forEach((button) => {
        button.addEventListener('click', clearProductsCart)
    })
}

const clearProductsCart = (e) => {
    const productIdSelected = e.target.closest('.productInCart').getAttribute('data-id')
    cartProducts = cartProducts.filter((examen) => examen.id != productIdSelected)
    guardarEnStorage('cartProducts', cartProducts)
    renderizarTotalCart()
}

const vaciarCart = () => {
    cartProducts = []
    guardarEnStorage('cartProducts', cartProducts)
    cartContainer.innerHTML = ''
}

const searchProduct = () => {
    const query = searchBar.value.toLowerCase()
    const arrayResultados = allProducts.filter((examen) => examen.name.toLowerCase().includes(query))
    renderizarListProducts(arrayResultados)
}

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

// FETCH
const getAllProducts = async () => {
    const response = await fetch('../json/examen.json')
    const data = await response.json()
    allProducts = data
    renderizarListProducts(allProducts)
}


// EventListeners

cardCTA.addEventListener('click', agregarProductCart)
cartReset.addEventListener('click', vaciarCart)
searchButton.addEventListener('click', searchProduct)
searchBar.addEventListener('input', searchProduct)


// Ejecuciones

getAllProducts()

if (localStorage.getItem('cartProducts')) {
    cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    renderizarTotalCart()
}
