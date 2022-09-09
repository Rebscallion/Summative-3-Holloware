
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

//-----------------------------
      // LOGIN FUNCTION
//-----------------------------
// this function checks if the users logged in
// if they are, show the username, their profile image, add new product, 
let loggedin = false;
let checkLogin = () => {
  let navContent;
  const profileContainer = document.getElementById("profile-container");
  if (sessionStorage.userID) {
    console.log("you logged in");
    loggedin = true;
    navContent=` 
      <div id="user-details">
        <i class="bi bi-plus-circle" id="small-add"></i>
        <button id="big-add">Add New Product <i class="bi bi-plus-circle"></i></button>     
        <i class="bi bi-bag-heart"></i>       
        <span id="dp" style="background-image: url('${sessionStorage.profileImg}')"></span>
      </div>
    `

  } else {
    loggedin = false;
    console.log("you are a guest");
    navContent = `
      <ul>
        <li class="landing-h5 guest"><a href="register.html">Register</a></li>
        <li class="landing-h5 guest"><a href="login.html">Login</a></li>
      </ul>
    `
  }
  profileContainer.innerHTML = navContent;
  if (loggedin == true){
    const profileBtn = document.getElementById("dp");
    const userProfle = document.getElementById("user-profile");

    profileBtn.onclick = () => {
      userProfle.classList.toggle('active');
      userProfle.innerHTML = `
      <span id="dp" style="background-image: url('${sessionStorage.profileImg}')"></span>
      <button id="log-out">Log Out</button>     

      `
    }
  };
};
checkLogin();