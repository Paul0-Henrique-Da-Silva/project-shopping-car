const sectionAtDom = document.querySelector('.items');
const olAtDom = document.querySelector('.cart__items');
const btncleanDom = document.querySelector('.empty-cart');

btncleanDom.addEventListener('click', function () {
  olAtDom.innerHTML = '';
  localStorage.clear(); 
});

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// bora ...
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element); 
  e.className = className;// msm nome do paremtro do valor sendo usado na chave :3
  e.innerText = innerText;
  return e;
}
// função cria um filho para section e atribui com calsse e info dos objs
// sku|ide , thumnai|img

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));// ivocado da linha 12 a 16
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image)); // invoca linha 5
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

async function computerfecth() {
  const promisse = await fetchProducts('computador');
  const computer = promisse.results;
  computer.forEach((element) => { 
  const { id: sku, title: name, thumbnail: image, price } = element;
  const obj = { sku, name, image, price };
 const item = createProductItemElement(obj);
 sectionAtDom.appendChild(item);
 });  
}

/*
 function getItemAndpushSection() {
 fetchProducts('computador').then(({ results }) => 
  results.map((element) => { 
   const { id: sku, title: name, thumbnail: image } = element;
  const obj = { sku, name, image };
  const item = createProductItemElement(obj);
 items.appendChild(item);
  }));
 } */

 function getSkuFromProductItem(item) {
   return item.querySelector('span.item__sku').innerText; // span(element)/item(class)
 }

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function cartDetails(sku) {
  const promise = await fetchItem(sku);
  const { title: name, price: salePrice } = promise;
  const obj = { sku, name, salePrice };
  const makeCart = createCartItemElement(obj);
   olAtDom.appendChild(makeCart);
   saveCartItems(olAtDom.innerHTML);
}
function itemBtn() {
  const btn = document.querySelectorAll('.item__add');
  const eventAddBtn = (element) => element.addEventListener('click', function (event) {
    const sku = getSkuFromProductItem(event.target.parentNode); 
    cartDetails(sku);
  });
   btn.forEach(eventAddBtn);
 }

function saveEternal() {
const saveme = getSavedCartItems();
olAtDom.innerHTML = saveme; 
const li = document.querySelectorAll('li'); // nodelist
li.forEach((element) => {
  element.addEventListener('click', function (event) {
    event.target.remove();
    saveCartItems(olAtDom.innerHTML);
  });
});
}
window.onload = async () => { 
 await computerfecth();
  itemBtn();
  saveEternal();
};
