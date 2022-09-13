
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
          <div class="hover-functions">
            <i class="bi bi-pencil-fill edit-button" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            <i class="bi bi-trash3-fill delete-button"></i>     
            <i class="bi bi-heart"></i>        
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
  collectDeleteButtons();
  collectEditButtons();
};

//-----add item function-----
// addBttn.onclick = () => {
//   addForm.classList.toggle('active');
//   console.log("clicked");
// };

// closeBttn.onclick = () => {
//   addForm.classList.toggle('active');
//   console.log("clicked");
// };

// submit.onclick = () => {
//   console.log("clicked submit");
//   $.ajax({
//     url: `http://localhost:3000/addProduct`,
//     type: "POST",
//     data: {
//       image_url: imageURLInput.value,
//       name: nameInput.value,
//       price: pricetInput.value,
//       description: descriptiontInput.value
//     },
//     success: () => {
//       console.log("A new product was added.");
//       showAllProducts();
//     },
//     error: () => {
//       console.log("Error: cannot reach the backend");
//     },
//   });
// };
// console.log('connected');

//------------------------
//Delete Product
//------------------------

let deleteProduct = (productId) => {
  $.ajax({
    url: `http://localhost:3000/deleteProduct/${productId}`,
    type: "DELETE",
    success: () => { },
    error: () => {
      console.log("Cannot call API");
    },
  });
};

let collectDeleteButtons = () => {
  let deleteButtonsArray = document.getElementsByClassName("delete-button");
  for (let i = 0; i < deleteButtonsArray.length; i++) {
    deleteButtonsArray[i].onclick = () => {
      let currentId = deleteButtonsArray[i].parentNode.parentNode.id;
      deleteProduct(currentId);
    };
  }
};

//------------------------
//Edit Product
//------------------------
let fillEditInputs = (product, id) => {
  let imageurl = document.getElementById("imageUrl");
  let productName = document.getElementById("productName");
  let productPrice = document.getElementById("productPrice");
  let productDescription = document.getElementById("productDescription");
  let imagePreview = document.getElementById("image-preview");
  imageurl.value = product.image_url;
  productName.value = product.name;
  productPrice.value = product.price;
  productDescription.value = product.description;
  imagePreview.innerHTML = `
  <img src="${product.image_url}" alt="${product.name}">
  `;

  //------------------------
  //Edit Listen
  //------------------------
  $("#updateProduct").click(function () {
    event.preventDefault();
    let productId = id;
    let imageurl = document.getElementById("imageUrl").value;
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productDescription = document.getElementById("productDescription").value;
    console.log(productId, imageurl, productName, productPrice, productDescription);
    $.ajax({
      url: `http://localhost:3000/updateProduct/${productId}`,
      type: "PATCH",
      data: {
        name: productName,
        price: productPrice,
        image_url: imageurl,
        description: productDescription
      },
      success: function (data) {
        console.log(data);
        showAllProducts();
        $('#editModal').modal('hide');
        $("#updateProduct").off('click');
      },
      error: function () {
        console.log("error: cannot update");
      },
    });
  });
}

populateEditModal = (productId) => {
  console.log(productId);
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/product/${productId}`,
    success: (productData) => {
      console.log(productData);
      fillEditInputs(productData, productId);
    },
    error: (error) => {
      console.log(error);
    }
  })
}

let collectEditButtons = () => {
  let editButtonsArray = document.getElementsByClassName("edit-button");
  for (let i = 0; i < editButtonsArray.length; i++) {
    editButtonsArray[i].onclick = () => {
      let currentId = editButtonsArray[i].parentNode.parentNode.id;
      populateEditModal(currentId);
    };
  }
};

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
    navContent = ` 
      <div id="user-details">
        <i class="bi bi-plus-circle small-add" id="new-product-bttn"></i>
        <button class="big-add" id="bignew-product-bttn">Add New Product <i class="bi bi-plus-circle"></i></button>     
        <i class="bi bi-bag-heart" id="likes"></i>       
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
    const userOverlay = document.getElementById("user-overlay");
    const topSignUpIn = document.getElementById("topSignUpIn");

    topSignUpIn.classList.toggle('hidden');


    profileBtn.onclick = () => {
      userOverlay.classList.toggle('active');
      userProfle.classList.toggle('active');
      

      userProfle.innerHTML = `
      <i class="bi bi-x" id="close-profile-bttn"></i>
        <span id="dp" style="background-image: url('${sessionStorage.profileImg}')"></span>
        <h3>Hi ${sessionStorage.userName}!</h3>
        <h4>Password   <i class="bi bi-pencil-fill edit-button"></i></h4>
        <div class="btn-wrapper">
          <button id="myProducts-Btn">My Products</button>    
          <button id="logout-Btn">Log Out</button>     
        </div>
   
      `
      //-----logout and close modal function-----
      const logoutBtn = document.getElementById("logout-Btn");

      let logOut = () => {
        console.log("you've logged out")
        sessionStorage.clear();
        topSignUpIn.classList.toggle('hidden');
        window.location.reload();
      }
      if (sessionStorage.userID) {
        const closePrfileBtn = document.getElementById("close-profile-bttn");
        closePrfileBtn.onclick = () => {
          userProfle.classList.toggle('active');
          userOverlay.classList.toggle('active');
          console.log("closed");
        };

        logoutBtn.onclick = () => logOut();
      };
    }

    const addBttn = document.getElementById("new-product-bttn");
    const bigAddBttn = document.getElementById("bignew-product-bttn");

    const addForm = document.getElementById("add-product-form");
    const submit = document.getElementById("submit-product-bttn");
    const closeBttn = document.getElementById("close-add-bttn");

    //-----add item function-----
      addBttn.onclick = () => {
        addForm.classList.toggle('active');
        console.log("clicked");
      };

      bigAddBttn.onclick = () => {
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

  };
};
checkLogin();

