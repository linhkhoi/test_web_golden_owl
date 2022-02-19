const result = document.getElementById("result");
const cartItems = document.getElementsByClassName("cart-items")[0];
const listItems = [];
getData();

//read file from json
async function fetchShoeJSON() {
  const response = await fetch("app/data/shoes.json");
  const results = await response.json();
  return results.shoes;
}
async function getData() {
  let results = await fetchShoeJSON();

  result.innerHTML = "";
  results.forEach((shoe) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <div class="img-card">
                <img style="background-color: ${shoe.color}" src="${shoe.image}" alt="${shoe.image}">
                <h3 >${shoe.name}</h3>
                <p>${shoe.description}</p>
                <p class="title">$<span class="title">${shoe.price}</span></p>
                <button class="btn-add-to-card" type="button">ADD TO CART</button>
            </div>
        `;

    result.appendChild(li);
  });
  const btn = await document.querySelectorAll("button");
  btn.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
      {
        var btnItem = event.target;
        var product = btnItem.parentElement;
        var productImg = product.querySelector("img").src;
        var productColor = product.querySelector("img").style.backgroundColor;
        var productName = product.querySelector("h3").innerText;
        var productPrice = product.querySelector("span").innerText;
        product.querySelector("button").innerText = "Added";
        product.querySelector("button").style.pointerEvents = "none";
        addCart(productName, productPrice, productImg, productColor);
        
      }
    });
  });
}

//add to cart
function addCart(productName, productPrice, productImg, productColor) {
  listItems.push(productName);
  let div = document.createElement("div");
  div.classList.add("cart-item");

  div.innerHTML = `
        <div class="cart-item-left">
            <div class="cart-item-image" style="background-color: ${productColor};">
                <div class="cart-item-image-block">
                    <img src="${productImg}">
                </div>
            </div>
        </div>
        <div class="cart-item-right">
            <div class="cart-item-name">${productName}</div>
            <div class="cart-item-price">$${productPrice}</div>
            <div class="cart-item-actions">
                <div class="cart-item-count">
                    <div class="cart-item-count-button minus-cart">-</div>
                    <div class="cart-item-count-number">1</div>
                    <div class="cart-item-count-button plus-cart">+</div>
                </div>
                <div class="cart-item-remove">
                    <img src="app/assets/trash.png" class="cart-item-remove-icon">
                </div>
            </div>
        </div>
    `;
  cartItems.appendChild(div);
  cartTotal();
  deleteCart();
  plusCart(div);
  minusCart(div);
}

//get total price
function cartTotal() {
  var cartShoes = document.getElementsByClassName("cart-item");
  var total = 0;
  for (var i = 0; i < cartShoes.length; i++) {
    var countShoes = cartShoes[i].querySelector(
      ".cart-item-right .cart-item-actions .cart-item-count-number"
    ).innerText;
    var priceShoe = cartShoes[i]
      .querySelector(".cart-item-right .cart-item-price")
      .innerText.substring(1);
    total += parseFloat(countShoes) * parseFloat(priceShoe);
  }
  var totalAmount = document.querySelector(".total-amount");
  totalAmount.innerText = "$" + total.toFixed(2);
}

//delete cart
function deleteCart() {
  var cartShoes = document.getElementsByClassName("cart-item");
  for (var i = 0; i < cartShoes.length; i++) {
    var shoesTrash = document.querySelectorAll(".cart-item-remove-icon");
    shoesTrash[i].addEventListener("click", function (event) {
      var cartDelete = event.target;
      var cartItemR =
        cartDelete.parentElement.parentElement.parentElement.parentElement;
      var buttonFind = document.querySelectorAll(".btn-add-to-card");
      var searchText = cartItemR.querySelector(".cart-item-name").innerText;
      for (var i = 0; i < buttonFind.length; i++) {
        if (
          buttonFind[i].parentElement.querySelector("h3").textContent ==
          searchText
        ) {
          buttonFind[i].innerText = "ADD TO CART";
          buttonFind[i].style.pointerEvents = "auto";
          break;
        }
      }
      listItems.filter(function(e) { return e !== searchText })
      cartItemR.remove();
      cartTotal();
    });
  }
}

//add count of item in cart
function plusCart(div) {
  
    var shoesPlus = div.querySelector(".plus-cart");
    shoesPlus.addEventListener("click", function (event) {
      var cartCount = event.target;
      var cartItemR = cartCount.parentElement.querySelector(
        ".cart-item-count-number"
      );
      var count = parseInt(cartItemR.textContent);
      count += 1;
      cartItemR.innerText = count;
      cartTotal();
    });
}

//minus count of item in cart
function minusCart(div) {
    var shoesMinus = div.querySelector(".minus-cart");
    shoesMinus.addEventListener("click", function (event) {
      var cartCount = event.target;
      var cartItemCount = cartCount.parentElement.querySelector(
        ".cart-item-count-number"
      );
      var count = parseInt(cartItemCount.textContent);
      count -= 1;

      if (count == 0) {
        var cartDelete = event.target;
        var cartItemR =
          cartDelete.parentElement.parentElement.parentElement.parentElement;
        var buttonFind = document.querySelectorAll(".btn-add-to-card");
        var searchText = cartItemR.querySelector(".cart-item-name").innerText;
        for (var i = 0; i < buttonFind.length; i++) {
          if (
            buttonFind[i].parentElement.querySelector("h3").textContent ==
            searchText
          ) {
            buttonFind[i].innerText = "ADD TO CART";
            buttonFind[i].style.pointerEvents = "auto";
            break;
          }
        }
        listItems.filter(function(e) { return e != searchText })
        cartItemR.remove();
      }
      cartItemCount.innerText = count;
      cartTotal();
    });
}
