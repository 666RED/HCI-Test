const editButtons = document.querySelectorAll('.edit-btn');
const productNames = document.querySelectorAll('.product-name');

const itemArr = [];

editButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // const buttonClicked = e.target;
    // const itemContainer = buttonClicked.parentElement.parentElement;
    window.location.href = 'edit-item.html';
    // const 
  })
});

productNames.forEach(name => {
  name.addEventListener('click', () => {
    window.location.href = 'edit-item.html';
  })
});