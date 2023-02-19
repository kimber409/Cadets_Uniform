const form = document.querySelector('#add-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = form.querySelector('#name');
    const sizeInput = form.querySelector('#size');
    const quantityInput = form.querySelector('#quantity');
    console.log('nameInput.value:', nameInput.value);
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
            quantity
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
            <span>${name}</span>
            <span>${size}</span>
            <span><input type="number" class="quantity" value="${quantity}" data-id="${data.id}"></span>
            <span><button class="delete" data-id="${data.id}">X</button></span>
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
