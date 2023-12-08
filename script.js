const mainPage = document.querySelector('.main__page');
const loggedInStatus = document.querySelector('.logged-in-status');
const profileIcon = document.querySelector('.profile-icon');
const statusFilter = document.getElementById('status-filter');
const charactersSearch = document.getElementById('characters__search');
const priceFilter = document.getElementById('price-filter');
const accountUsername = document.querySelector('.account__username');
const pageScroll = document.querySelector('.page-scroll');
const prevPageBtn = document.querySelector('.prev__page-btn');
const nextPageBtn = document.querySelector('.next__page-btn');
const cartContent = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;

window.addEventListener('load', () => {
  const isLoggedIn = localStorage.getItem('loggedIn');
  const userData = localStorage.getItem('allUsers');
  if (isLoggedIn === 'true') {
    loggedInStatus.textContent = `${userData}`;
  }
});

profileIcon.addEventListener('mouseover', () => {
  loggedInStatus.style.display = 'block';
});

profileIcon.addEventListener('mouseout', () => {
  loggedInStatus.style.display = 'none';
});

function getPrice(id) {
  if (id % 3 === 0) {
    return id * 400;
  } else if (id % 5 === 0) {
    return id * 200;
  } else if (id % 2 === 0) {
    return id * 100;
  } else {
    return id * 1000;
  }
}

nextPageBtn.addEventListener('click', () => {
  currentPage++;
  fetchProducts(currentPage);
});

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts(currentPage);
  }
});

function fetchProducts(page) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(res => res.json())
    .then((data) => {
      displayProducts(data.results);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

function displayProducts(products) {
  mainPage.innerHTML = '';
  products.forEach(character => {
    displayCharacter(character);
  });
}

function displayCharacter(character) {
  const name = character.name;
  const div = document.createElement('div');
  div.classList.add('product__card');
  div.innerHTML = `
    <h1>${character.id}</h1>
    <h1>${name}</h1>
    <img src="${character.image}">
    <p>${character.species}</p>
    <p>${character.status}</p>
    <p>${getPrice(character.id)}$</p>
    <button class="buy__button" onclick="addToCart(${character.id}, '${name}', ${getPrice(character.id)} , '${character.image}')">Buy</button>
  `;
  mainPage.appendChild(div);
}

function searchAndFilterProducts() {
  const searchQuery = charactersSearch.value.toLowerCase();
  const selectedStatus = statusFilter.value;
  const selectedPrice = priceFilter.value;

  fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then((data) => {
      const filteredResults = data.results.filter(character =>
        (character.name.toLowerCase().includes(searchQuery) || searchQuery === '') &&
        (selectedStatus === 'All' || character.status === selectedStatus)
      );

      const sortedByPrice = evaluatePrice(filteredResults, selectedPrice);

      displayProducts(sortedByPrice);
    });
}

function evaluatePrice(data, selectedPrice) {
  if (selectedPrice === 'Cheap') {
    return data.sort((a, b) => getPrice(a.id) - getPrice(b.id));
  } else if (selectedPrice === 'Expensive') {
    return data.sort((a, b) => getPrice(b.id) - getPrice(a.id));
  }
  return data;
}

charactersSearch.addEventListener('input', searchAndFilterProducts);
statusFilter.addEventListener('change', searchAndFilterProducts);
priceFilter.addEventListener('change', searchAndFilterProducts);

function addToCart(id, name, price, image) {
  const existingItems = cartContent.find((e) => e.id == id)
  if(existingItems){
    existingItems.quantity++
  }
  else{
    const item = { id, name, price, image, quantity : 1 };
    cartContent.push(item);
    
  }
  localStorage.setItem('cart', JSON.stringify(cartContent));
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = `${name} added to cart!`;

  document.body.appendChild(notification);


  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}

const isLoggedIn = localStorage.getItem('loggedIn');

if (isLoggedIn === 'true') {
  pageScroll.style.display = 'flex';
  fetchProducts(currentPage);
} else {
  allProductsLimited();
  pageScroll.style.display = 'none';
}

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const title = item.querySelector('.accordion-title');

  title.addEventListener('click', () => {
    accordionItems.forEach(accItem => {
      if (accItem !== item) {
        accItem.classList.remove('active');
      }
    });
    item.classList.toggle('active');
  });
});

function allProductsLimited() {
  fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then((data) => {
      data.results.slice(0, 8).forEach(character => {
        displayCharacter(character);
      });
    });
  const divSearch = document.querySelector('.search');
  divSearch.style.display = 'none';
}
