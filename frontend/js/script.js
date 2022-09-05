const gridContainer = document.getElementById("grid-container");


let showAllProducts = () => {
    $.ajax({
        type: 'GET', 
        url: "http://localhost:3000/allProducts",
        //the success function contains an object which can be named anything 
        success: (products) => {
            console.log(products);
            renderProducts(products);
        },
        error: (error) => {
            console.log(error);
        }
    })
}

let renderProducts = (products) => {
    console.log("the render projects function is working");
    gridContainer.innerHTML = "";
    products.forEach((item) => {
        gridContainer.innerHTML += `
        <div class="product-wrapper" id="${item._id}">
            <i class="bi bi-heart"></i>
            <img src="${item.image_url}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
        </div>
        `
    });
}


showAllProducts();