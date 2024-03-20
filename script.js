import { menuArray } from "./data.js";

const ulEl = document.getElementById("ul-el");
const list = document.getElementById("menuTable");
const orderList = document.getElementById("orderList");
const form = document.getElementById("form");
const name = document.getElementById("name");

// Declarate order list

class Orderlist {
  constructor() {
    this.list = [];
    this.price = [];
  }
  addItem(item) {
    this.list.push(item);
  }
  addPrice(price) {
    this.price.push(price);
  }
}

// initialization order list by user

const orderRightNow = new Orderlist();

// give listener by all commands when click a button's

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addOrder(e.target.dataset.add);
  }

  if (e.target.id === "completeOrder") {
    ulEl.style.display = "block";
  }

  if (e.target.dataset.remove) {
    deleteOrder(e.target.dataset.remove);
  }

  if (e.target.id === "pay") {
    if (form.checkValidity()) {
      e.preventDefault();
      renderAppreciation();
      orderRightNow.list = [];
      orderRightNow.price = [];
      ulEl.style.display = "none";
      form.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
    }
  }
});

// Rendering all page

function renderOrder() {
  if (orderRightNow.list.length > 0) {
    orderList.innerHTML = `<h2 id='order'>Your order</h2>`;
  }
  for (let i = 0; i < orderRightNow.list.length; i++) {
    orderList.innerHTML += `    
                              <div class='containerOrders'>
                                  <div class='orderList'>
                                      <div class='blockInOrderList'>
                                      <h4>${orderRightNow.list[i]}</h4>
                                      <button id='remBtn' data-remove='${i}'>remove</button>
                                      </div>
                                      <p id = 'priceItem'>$${orderRightNow.price[i]}</p>
                                  </div>
                              </div> 
                            `;
  }

  if (orderRightNow.list.length > 0) {
    let totalPrice = orderRightNow.price.reduce(
      (total, currentNumber) => total + currentNumber
    );
    orderList.innerHTML += `  
                            <div class = 'totalPrice'>
                                <h4>Total price</h4>
                                <p>$${totalPrice}</p>
                            </div>
                            <button id='completeOrder'>Complete order</button>
                              `;
  } else {
    orderList.innerHTML = "";
  }
}

function addOrder(target) {
  let targetObj = menuArray.filter((offer) => offer.name === target)[0];

  orderRightNow.addItem(target);
  orderRightNow.addPrice(targetObj.price);

  renderOrder();
}

function deleteOrder(index) {
  orderRightNow.list.splice(index, 1); // Remove item from list
  orderRightNow.price.splice(index, 1); // Remove corresponding price
  renderOrder();
  console.log(orderRightNow);
}

// Render apprication when user is make transaction

function renderAppreciation() {
  orderList.innerHTML = `
                        <div class='containerApprication'>
                        <h2 id='appricationText'>Thanks, ${name.value}! Your order is on its way!<h2>
                        </div>
                     `;
}

// Rendering Menu(What we use for order)

function renderMenu(menu) {
  let renderedMenu = "";
  menu.forEach((proposition) => {
    renderedMenu += `
                        <section>
                            <h2 id="emoji">${proposition.emoji}</h2>
                            <div class="mainContentOfList">
                            <h3>${proposition.name}</h3>
                            <p id='proposition'>${proposition.ingredients}</p>
                            <p id='price'>$${proposition.price}</p>
                            </div>
                            <button class='btn' data-add='${proposition.name}'>+</button>
                        </section>
                      `;
  });
  return (list.innerHTML = renderedMenu);
}

renderMenu(menuArray);
