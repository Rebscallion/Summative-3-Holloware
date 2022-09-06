
// -----Inputs-----
const imageURLInput = document.getElementById("image-url-input");
const nameInput = document.getElementById("name-input");
const pricetInput = document.getElementById("price-input");
const descriptiontInput = document.getElementById("description-input");

//-----buttons-----
const addBttn = document.getElementById("new-product-bttn");
const addForm = document.getElementById("add-product-form");
const submit = document.getElementById("submit-product-bttn");
const closeBttn = document.getElementById("close-add-bttn");

//-----show all products function-----
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
};

//-----render products function-----
let renderProducts = (products) => {
    const gridContainer = document.getElementById("grid-container");
    console.log("the render projects function is working");
    console.log("the render products function is working");
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
            <div class="product-bio">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <i class="bi bi-chat-dots"></i>
            </div>
        </div>
        `
    });
};

//-----add item function-----
addBttn.onclick = () => {
    addForm.classList.toggle('active');
    console.log("clicked");
  };

  closeBttn.onclick = () => {
    addForm.classList.toggle('active');
    console.log("clicked");
  };
  
  submit.onclick = () => {
    console.log("clicked submit");
    $.ajax({
      url: `http://localhost:3000/addProduct`,
      type: "POST",
      data: {
        image_url: imageURLInput.value,
        name: nameInput.value,
        price: pricetInput.value,
        description: descriptiontInput.value
      },
      success: () => {
        console.log("A new product was added.");
        showAllProducts();
      },
      error: () => {
        console.log("Error: cannot reach the backend");
      },
    });
  };
  console.log('connected');

//-----------------------------
    // LIST ALL PRODUCTS
//-----------------------------
showAllProducts();


