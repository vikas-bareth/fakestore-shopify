function loadCateogries(){
    let select = document.getElementById('lstCategory')
    fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json())
    .then(function(products){
        products.map(function(product){
           let option = document.createElement('option');
           option.innerText = product.toUpperCase();
           option.value = product;
           select.appendChild(option);
           

        })
    })
}

function loadProducts(url){
    let cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML = "";
    fetch(url)
    .then((res) => res.json())
    .then(function(products){
        products.map(function(product){
            let card = document.createElement('div');
            card.className = "card p-2 m-2";
            card.style.width = "300px";

            card.innerHTML = `
            <img src=${product.image} height="160px" class="card-img-top">
            <div class="card-header">
            <h6 class="card-title">${product.title}</h6>
            </div>
            <div class="card-body">
            
                
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><h6>$${product.price}</h6></li>
                    <li class="list-group-item">${product.category}</li>
                    <li class="list-group-item"><b>Rating:${product.rating.rate}</b></li>
                    <li class="list-group-item">Rated by:${product.rating.count} users</li>
                </ul>
                 <!-- <p class="card-text overflow-auto" height="10px">${product.description}</p> -->

            </div> 
            <div class="card-body">
            <button onclick="addClick(${product.id})" class="btn btn-outline-warning" id="addtoCart">Add to Cart</button>
            </div>
            `;
            cardContainer.appendChild(card);
        })
    })
}

function categoryChange(){
    let categoryName = document.getElementById('lstCategory').value;
    if(categoryName == 'all'){
        loadProducts('https://fakestoreapi.com/products');
    } else{
        loadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}

function displayCategory(categoryName){
    if(categoryName==="all"){
        loadProducts("https://fakestoreapi.com/products&quot;");
    } else {
        loadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}


let cartItems = [];

function getCartCount(){
    document.getElementById("lblCount").innerHTML = cartItems.length;
}

function addClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then(function(product){
        cartItems.push(product);
        alert(`${product.title} \nAdded to the Cart`);
        getCartCount();
    })
}

function showCartItems(){
    document.querySelector("tbody").innerHTML = "";
    cartItems.map(function(item){
        let tr = document.createElement("tr");
        let tdTitle = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdPreview = document.createElement("td"); 

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;
        tdPreview.innerHTML = `<img width="50" height="50" src=${item.image}>`;

        tr.appendChild(tdTitle);
        tr.appendChild(tdPreview);
        tr.appendChild(tdPrice);

        document.querySelector("tbody").appendChild(tr);
    })
}


function bodyLoad(){
    loadCateogries();
    loadProducts('https://fakestoreapi.com/products');
}