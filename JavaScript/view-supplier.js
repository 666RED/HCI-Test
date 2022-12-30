const returnIcon = document.querySelector('.return-icon');
const addNewSupplierButton = document.querySelector('.add-new-supplier-btn');
const contentContainer = document.querySelector('.content-container');
const removeSupplierPopup = document.querySelector('.remove-product-pop-up');
const removeSupplierCancelIcon = document.querySelector('.remove-product-cancel-img');
const removeSupplierNoButton = document.querySelector('.remove-product-no-btn');
const removeSupplierYesButton = document.querySelector('.remove-product-yes-btn');
const successfulPopup = document.querySelector('.successful-popup');
const doneButton = document.querySelector('.done-btn');
const deletedSupplier = document.querySelector('.deleted-supplier');
const searchBar = document.querySelector('#search-bar');
const suggestedSupplierBox = document.querySelector('.suggested-supplier-box');
const wholeScreen = document.querySelector('.whole-screen');

const supplierArr = JSON.parse(localStorage.getItem('Supplier')) || [];

searchBar.addEventListener('keyup', searchSupplier);

searchBar.addEventListener('click', searchSupplier);

doneButton.addEventListener('click', () => {
  window.location.reload();
});

removeSupplierCancelIcon.addEventListener('click', () => {
  removeSupplierPopup.classList.remove('open-popup');
});

removeSupplierNoButton.addEventListener('click', () => {
  removeSupplierPopup.classList.remove('open-popup');
});

addNewSupplierButton.addEventListener('click', () => {
  window.location.href = 'add-new-supplier.html';
});

returnIcon.addEventListener('click', () => {
  window.location.href = 'restock.html';
});

window.onload = displaySupplier();

function displaySupplier() {
  for(let i = 0; i < supplierArr.length; i++){
    const contentRow = document.createElement('div');
    const no = document.createElement('div');
    const supplierNameBox = document.createElement('div');
    const supplierName = document.createElement('div');
    const removeIcon = document.createElement('img');
    const phoneNumber = document.createElement('div');

    contentRow.classList.add('content-row');
    no.classList.add('no');
    supplierNameBox.classList.add('supplier-name-box');
    supplierName.classList.add('supplier-name');
    removeIcon.classList.add('remove-icon');
    phoneNumber.classList.add('phone-number');

    no.innerText = (i + 1) + '.';
    supplierName.innerText = supplierArr[i].supplierName;
    removeIcon.src = '/image/dustbin.png';
    phoneNumber.innerText = supplierArr[i].phoneNumber;

    supplierName.addEventListener('click', editSupplier);

    supplierNameBox.append(supplierName, removeIcon);
    contentRow.append(no, supplierNameBox, phoneNumber);
    contentContainer.appendChild(contentRow);

    removeIcon.addEventListener('click', (e) => {
      const supplierNameBox = e.target.parentElement;
      const supplierName = supplierNameBox.querySelector('.supplier-name');
      deletedSupplier.innerText = `( ${supplierName.innerText} )`;
      removeSupplierPopup.classList.add('open-popup');
      removeSupplierYesButton.addEventListener('click', () => {
        for(let i = 0; i < supplierArr.length; i++){
          if(contentRow.querySelector('.supplier-name').innerText == supplierArr[i].supplierName){
            supplierArr.splice(i, 1);
            break;
          }
        }
        localStorage.setItem('Supplier', JSON.stringify(supplierArr));
        removeSupplierPopup.classList.remove('open-popup');
        successfulPopup.classList.add('open-popup');
        wholeScreen.classList.add('active');
      }); 
    });
  }

  if(contentContainer.offsetHeight >= 320){
    const phoneNumbers = contentContainer.querySelectorAll('.phone-number');
    phoneNumbers.forEach(number => {
      number.style.width = '218px';
      number.style.paddingLeft = '12px';
    });
  }
}

function editSupplier(e) {
  const supplierClicked = e.target;
  const tempArr = [];
  for(let i = 0; i < supplierArr.length; i++){
    if(supplierClicked.innerText == supplierArr[i].supplierName){
      tempArr.push({
        supplierName:supplierArr[i].supplierName,
        phoneNumber:supplierArr[i].phoneNumber,
        supplierLocation:supplierArr[i].supplierLocation
      });
      sessionStorage.setItem('Supplier', JSON.stringify(tempArr));
      window.location.href = 'manage-supplier.html';
    }
  }
}

function searchSupplier(e) {
  const text = e.target;
  suggestedSupplierBox.innerHTML = '';
  for(let i = 0; i < supplierArr.length; i++){
    const suggestedSupplier = document.createElement('div');
    if(supplierArr[i].supplierName.toLowerCase().includes(text.value.toLowerCase()) && supplierArr[i].supplierName[0].toLowerCase() == text.value[0].toLowerCase()){
      suggestedSupplierBox.style.display = 'block';
      suggestedSupplier.classList.add('suggested-supplier');
      suggestedSupplier.innerText = supplierArr[i].supplierName;
      suggestedSupplierBox.appendChild(suggestedSupplier);

      suggestedSupplier.addEventListener('click', goToManageSupplier);
    }else if(!suggestedSupplierBox.querySelector('.suggested-supplier') && i == supplierArr.length - 1){
      suggestedSupplierBox.style.display = 'none';
    }
  }
}

function goToManageSupplier(e) {
  const supplierClicked = e.target;
  for(let i = 0; i < supplierArr.length; i++){
    if(supplierClicked.innerText == supplierArr[i].supplierName){
      const clickSupplierArr = [];
      clickSupplierArr.push({
        supplierName:supplierArr[i].supplierName,
        phoneNumber:supplierArr[i].phoneNumber,
        supplierLocation:supplierArr[i].supplierLocation
      });
      sessionStorage.setItem('Supplier', JSON.stringify(clickSupplierArr));
      window.location.href = 'manage-supplier.html';
    }
  }
}