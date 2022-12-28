const printButton = document.querySelector('.print-btn');
const printPopup = document.querySelector('.print-popup');
const wholeContainer = document.querySelector('.whole-container');
const productContainer = document.querySelector('.product-container');
const totalPrice = document.querySelector('.total-price');
const totalCost = document.querySelector('.total-cost');
const totalProfit = document.querySelector('.total-profit');

const totalSalesArr = JSON.parse(localStorage.getItem('Total Sales')) || [];
const dateArr = JSON.parse(sessionStorage.getItem('Date')) || [];

printButton.addEventListener('click', () => {
  printPopup.classList.add('open-popup');
  wholeContainer.classList.add('active');
  setTimeout(backToReport, 5000);
});

function backToReport() {
  window.location.href = 'report.html';
}

window.onload = displayDailySales();

function displayDailySales() {
  let finalArr = [];
  for (let i = 0; i < totalSalesArr.length; i++) { // find the correct date
    const dailySalesArr = totalSalesArr[i].dailySalesArr;
    const date = dailySalesArr.slice(-1)[0].currentDate;
    const month = dailySalesArr.slice(-1)[0].currentMonth;
    const year = dailySalesArr.slice(-1)[0].currentYear;

    if (dateArr[0].day == date && dateArr[0].month == month && dateArr[0].year == year) {
      const dailySalesArr = totalSalesArr[i].dailySalesArr;

      for (let j = 0; j < dailySalesArr.length - 1; j++) { //get the array of all product
        const productArr = dailySalesArr[j].productArr;
        for (let k = 0; k < productArr.length - 1; k++) {
          finalArr.push(productArr[k]);
        }
      }
      break;
    }
  }
  
  for(let i = 0; i < finalArr.length; i++){ // change the date type
    finalArr[i].quantity =  Number(finalArr[i].quantity);
    finalArr[i].singlePrice = Number(finalArr[i].singlePrice.replace('RM ', ''));
  }

  for(let i = 0; i < finalArr.length; i++){ // remove the same product & cal quantity, singlePrice
    for(let j = i + 1; j < finalArr.length; j++){
      if(finalArr[i].name == finalArr[j].name){
        finalArr[i].quantity += finalArr[j].quantity;
        finalArr[i].singlePrice += finalArr[j].singlePrice;
        finalArr.splice(j, 1);
        j--;
      }
    }
  }

  console.log(finalArr);
  
  for(let i = 0; i < finalArr.length; i++){
    const productRow = document.createElement('div');
    const productNo = document.createElement('div');
    const productName = document.createElement('div');
    const productQuantity = document.createElement('div');
    const productPrice = document.createElement('div');

    productNo.innerText = i + 1 + '.';
    productName.innerText = finalArr[i].name;
    productQuantity.innerText = finalArr[i].quantity;
    productPrice.innerText = 'RM ' + Number(finalArr[i].singlePrice).toFixed(2);

    productRow.classList.add('product-row');
    productNo.classList.add('product-no');
    productName.classList.add('product-name');
    productQuantity.classList.add('product-quantity');
    productPrice.classList.add('product-price');

    productRow.append(productNo, productName, productQuantity, productPrice);
    productContainer.appendChild(productRow);
  }
  totalPrice.innerText = dateArr[0].price;
  totalCost.innerText = dateArr[0].cost;
  totalProfit.innerText = dateArr[0].profit;

}