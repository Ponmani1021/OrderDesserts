
let addToCartBtn = document.querySelectorAll(".addtocartbtn");
let quantityControls = document.querySelectorAll(".quantitycontrol");
let newOrder = document.getElementById("new-order");
let cardItemContainer = document.getElementById("card-item");
let newCardImg = document.getElementById("newCardImg");
let newCardP = document.getElementById("newCardp");
let totalVal = document.getElementById("totalVal");
let orderCount = document.querySelector(".order-count");
let confirmbox= document.getElementById("confirmbox");

let cartItems = [];

function updateTotalAndCount() {
  let total = 0;
  let count = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;
  });
  totalVal.innerHTML = `<b>$${total.toFixed(2)}</b>`;
  orderCount.textContent = count;
}

addToCartBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.style.display = "none";
    quantityControls[index].style.display = "flex";
    newCardImg.style.display = "none";
    newCardP.style.display = "none";
    newOrder.style.display = "block";
    confirmbox.style.display = "block"
    

    let foodCard = btn.closest(".card");
    let foodName = foodCard.querySelector(".food-text h2").textContent;
    let foodAmount = foodCard.querySelector(".food-text h5").textContent;
    let price = parseFloat(foodAmount.replace("$", ""));

    let quantity = 1;

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      margin-bottom: 5px;
      background-color: #eff0f0;
      border-radius: 5px;
      position: relative;
    `;

    itemDiv.innerHTML = `
      <span class="item-info">
        <strong>${foodName}</strong><br>
        <span class="item-qty" style="color:brown; float:left;">${quantity}</span>
        ${foodAmount}
      </span>
      <span class="remove-item" style="cursor:pointer; color:red; font-weight:bold; font-size:18px;">&times;</span>
    `;

    cardItemContainer.appendChild(itemDiv);
    let foodImg = foodCard.querySelector(".food-img").src;
    cartItems.push({ name: foodName, price, quantity, image: foodImg, element: itemDiv });


    updateTotalAndCount();

    let plusBtn = quantityControls[index].querySelector(".plus");
    let minusBtn = quantityControls[index].querySelector(".minus");
    let quantitySpan = quantityControls[index].querySelector(".quantity");
    let itemQtySpan = itemDiv.querySelector(".item-qty");

    plusBtn.addEventListener("click", () => {
      quantity++;
      quantitySpan.textContent = quantity;
      itemQtySpan.textContent = quantity;
      cartItems[index].quantity = quantity;
      updateTotalAndCount();
    });

    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
        itemQtySpan.textContent = quantity;
        cartItems[index].quantity = quantity;
        updateTotalAndCount();
      } else {
        quantityControls[index].style.display = "none";
        btn.style.display = "block";
        cardItemContainer.removeChild(itemDiv);
        cartItems.splice(index, 1);
        updateTotalAndCount();
      }
    });

    itemDiv.querySelector(".remove-item").addEventListener("click", () => {
      quantityControls[index].style.display = "none";
      btn.style.display = "block";
      cardItemContainer.removeChild(itemDiv);
      cartItems.splice(index, 1);
      updateTotalAndCount();
    });
  });
});


let cancelBtn = document.getElementById("cancelbtn")
let section3 = document.querySelector(".section3")
function CancelBtn(){
  section3.style.display = "none"
}

let orderedList = document.getElementById("orderedlist");
let orderedTotal = document.createElement("div");
orderedTotal.id = "orderedTotal";

function showOrderConfirmation() {
  orderedList.innerHTML = ""; // clear previous
  let total = 0;

  cartItems.forEach(item => {
    total += item.price * item.quantity;

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("ordered-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="ordered-details">
        <strong>${item.name}</strong><br>
        Quantity: ${item.quantity}<br>
        Price: $${(item.price * item.quantity).toFixed(2)}
      </div>
    `;

    orderedList.appendChild(itemDiv);
  });

  orderedTotal.innerHTML = `Total: $${total.toFixed(2)}`;
  orderedList.appendChild(orderedTotal);

  let deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteOrderBtn";
  deleteBtn.textContent = "Delete Order";
  deleteBtn.onclick = CancelBtn;
  orderedList.appendChild(deleteBtn);

  document.querySelector(".section3").style.display = "block";
}
document.getElementById("confirmOrderbtn").addEventListener("click", () => {
  showOrderConfirmation();
});

function confirmOrder(){
  section3.style.display = "block"

}
