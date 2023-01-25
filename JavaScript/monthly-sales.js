const contentContainer = document.querySelector('.content-container');
const returnIcon = document.querySelector('.return-icon');
const monthSection = document.querySelector('.month-section');
const totalPrice = document.querySelector('.total-price');
const totalCost = document.querySelector('.total-cost');
const totalProfit = document.querySelector('.total-profit');

const totalSalesArr = JSON.parse(localStorage.getItem('Total Sales')) || [];
const tempArr = JSON.parse(sessionStorage.getItem('Date')) || [];

returnIcon.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = 'report-monthly.html';
});

window.onload = displayMonthlySales();

function displayMonthlySales() {
  let finalArr = [];
  const arr = tempArr[0].date.split('-');
  const currentYear = arr[0];
  const currentMonth = arr[1];

  for(let i = 0; i < totalSalesArr.length; i++){
    const dailySalesArr = totalSalesArr[i].dailySalesArr;
    const year = dailySalesArr.slice(-1)[0].currentYear;
    const month = dailySalesArr.slice(-1)[0].currentMonth;

    if(year == currentYear && month == currentMonth){
      for (let j = 0; j < dailySalesArr.length - 1; j++) { //get the array of all product
        const productArr = dailySalesArr[j].productArr;
        for (let k = 0; k < productArr.length - 1; k++) {
          finalArr.push(productArr[k]);
        }
      }
    }else if(month > currentMonth){
      break;
    }
  }
  
  for(let i = 0; i < finalArr.length; i++){ // change the date type
    finalArr[i].quantity =  Number(finalArr[i].quantity);
    finalArr[i].cost = Number(finalArr[i].cost);
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

  for(let i = 0; i < finalArr.length; i++){
    const contentRow = document.createElement('div');
    const productNo = document.createElement('div');
    const productName = document.createElement('div');
    const productQuantity = document.createElement('div');
    const productCost = document.createElement('div')
    const productPrice = document.createElement('div');
    const productProfit = document.createElement('div');

    productNo.innerText = i + 1 + '.';
    productName.innerText = finalArr[i].name;
    productQuantity.innerText = finalArr[i].quantity;
    productCost.innerText = 'RM ' + Number(finalArr[i].cost * finalArr[i].quantity).toFixed(2);
    productPrice.innerText = 'RM ' + Number(finalArr[i].singlePrice).toFixed(2);
    productProfit.innerText = 'RM ' + Number(((finalArr[i].singlePrice) - (finalArr[i].cost * finalArr[i].quantity))).toFixed(2);
    monthSection.innerText = 'Date: ' + tempArr[0].date;

    contentRow.classList.add('content-row');
    productNo.classList.add('product-no');
    productName.classList.add('name');
    productQuantity.classList.add('quantity');
    productCost.classList.add('product-cost');
    productPrice.classList.add('product-price');
    productProfit.classList.add('product-profit');


    contentRow.append(productNo, productName, productQuantity, productCost, productPrice, productProfit);
    contentContainer.appendChild(contentRow);
  }
  totalPrice.innerText = tempArr[0].price;
  totalCost.innerText = tempArr[0].cost;
  totalProfit.innerText = tempArr[0].profit;

  if(contentContainer.offsetHeight >= 336){
    const productProfits = contentContainer.querySelectorAll('.product-profit');
    productProfits.forEach(profit => {
      profit.style.width = '143px';
      profit.style.paddingLeft = '20px';
    });
  }

}