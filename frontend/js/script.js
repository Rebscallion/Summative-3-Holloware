

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
    const gridContainer = document.getElementById("grid-container");
    console.log("the render projects function is working");
    gridContainer.innerHTML = "";
    products.forEach((item) => {
        gridContainer.innerHTML += `
        <div class="product-wrapper" id="${item._id}">
            <i class="bi bi-heart"></i>
            <div class="hover-functions">
               <i class="bi bi-pencil-fill edit-button"></i>
               <i class="bi bi-trash3-fill delete-button"></i>             
            </div>
            <img src="${item.image_url}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <i class="bi bi-chat-dots"></i>

        </div>
        `
    });
}

//-----------------------------
    // LIST ALL PRODUCTS
//-----------------------------
showAllProducts();


