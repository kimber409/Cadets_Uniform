const form = document.querySelector('#add-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = form.querySelector('#name');
    const sizeInput = form.querySelector('#size');
    const quantityInput = form.querySelector('#quantity');
    const genderInput = form.querySelector('#gender');
    const gender = genderInput.value;
    const name = nameInput.value;
    const size = sizeInput.value;
    const quantity = quantityInput.value;
   
 
    console.log('name:', name);


    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            size,
            quantity,
            gender
        })
    })
    .then(response => {
        console.log(response); // log the response from the server
        return response.json(); // parse the response as JSON
    })
    .then(data => {
        const itemList = document.querySelector('#item-list');
        const item = document.createElement('li');
        item.dataset.id = data.id;
        item.innerHTML = `
            <span">${name}</span>
            <span>${size}</span>
            <span><input type="number" class="quantity" value="${quantity}" data-id="${data.id}"></span>
            <span><button class="delete" data-id="${data.id}">Delete</button></span>
        `;

        itemList.appendChild(item);
        nameInput.value = '';
        sizeInput.value = '';
        quantityInput.value = '';
    })
    .catch(error => console.error(error));
});

const itemList = document.querySelector('#item-list');
itemList.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity')) {
        const id = event.target.dataset.id;
        const quantity = event.target.value;
        fetch(`/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity
            })
        })
        .catch(error => console.error(error));
    }
});

itemList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const id = event.target.dataset.id;
        fetch(`/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const item = event.target.parentElement.parentElement;
            item.parentElement.removeChild(item);
        })
        .catch(error => console.error(error));
    }
});

var addBtn = document.getElementById('add-btn');
var popup = document.getElementById('popup');
var popupClose = document.getElementById("popup-close");
var submitBtn = document.getElementById("submit-btn");

addBtn.addEventListener('click', function() {
  popup.style.display = 'block';
});

popupClose.addEventListener("click", function() {
  popup.style.display = "none";
});

submitBtn.addEventListener("click", function() {
  // Handle form submission here
  popup.style.display = "none";
});



const filterForm = document.querySelector('#filter-form');


const openFilterPopupButton = document.querySelector('#open-filter-popup');
const closeFilterPopupButton = document.querySelector('#close-filter-popup');

openFilterPopupButton.addEventListener('click', () => {
  document.querySelector('#filter-popup').style.display = 'block';
});

closeFilterPopupButton.addEventListener('click', () => {
  document.querySelector('#filter-popup').style.display = 'none';
});

filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const genderFilter = filterForm.elements.gender.value;
  const sizeFilter = filterForm.elements.size.value;


  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const gender = filterForm.querySelector('#gender-select').value;
    const size = filterForm.querySelector('#size-select').value;
    // const name = filterForm.querySelector('#name-select').value;
    const itemList = document.querySelector('#item-list');
    const items = itemList.querySelectorAll('li');

    items.forEach((item) => {
        const itemGender = item.querySelector('span:first-child').textContent;
        const itemSize = item.querySelector('span:nth-child(2)').textContent;
        // const nameSize = item.querySelector('span:nth-child(3)').textContent;
        if ((gender === '' || itemGender === gender) && (size === '' || itemSize === size )) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
});



function toggleList(id) {
    var list = document.getElementById(id + "-list");
    var button = document.getElementById(id + "-toggle-button");
    var header = list.getElementsByTagName("li")[0];
    if (list.style.display === "none") {
      list.style.display = "block";
      button.textContent = "▼";
    //   header.style.display = "block";
    } else {
      list.style.display = "none";
      button.textContent = "▶";
    //   header.style.display = "none";
    }
  }
  
