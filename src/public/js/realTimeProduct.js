/* import ProductManager from "../../ProductManager.js";

const pm = new ProductManager() */

const socket = io()

socket.emit('message', 'Conectado desde el cliente');

const formulario = document.getElementById("form")

//Obtiene los valores del formulario y los emite al servidor
formulario.addEventListener("submit", function (event) {

    event.preventDefault()

    const newProducto = {
        "title": document.getElementById("product").value,
        "description": document.getElementById("description").value,
        "code": document.getElementById("code").value,
        "price": document.getElementById("price").value,
        "status": document.getElementById("product").value,
        "stock": document.getElementById("stock").value,
        "thumbnails": document.getElementById("thumbnail").value
    }

    socket.emit('newProduct', newProducto);

    return newProducto
})

//Imprime producto agregado al listado. (Solo vista DOM)
socket.on("newProduct", (p) => {
    const productList = document.getElementById("productlist")
    productList.innerHTML +=
        `        <tr>
    <td>${p.title}</td>
    <td>${p.description}</td>
    <td>${p.price}</td>
    <td>${p.code}</td>
    <td>${p.stock}</td>
    <td>##</td>
</tr>`
})

