const contentContainer = document.querySelector('.content-container');
const productProfits = document.querySelectorAll('.product-profit');
const returnIcon = document.querySelector('.return-icon');
const totalPrice = document.querySelector('.total-price');
const totalCost = document.querySelector('.total-cost');
const totalProfit = document.querySelector('.total-profit');

const totalSales = JSON.parse(localStorage.getItem('Total Sales')) || [];
const tempArr = JSON.parse(sessionStorage.getItem('Date')) || [];

if(contentContainer.offsetHeight >= 336){
  productProfits.forEach(profit => {
    profit.style.width = '143px';
    profit.style.paddingLeft = '20px';
  });
}

returnIcon.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = 'report-weekly.html';
});

window.onload = displayProduct();

function displayProduct() {
  let finalArr = [];
  const dateArr = tempArr[0].date.split(' ');
  const begin = dateArr[0];
  const end = dateArr[2];

  let arr = begin.split('-');
  const beginYear = arr[0]; // 22
  const beginMonth = arr[1]; // 11
  const beginDate = arr[2] // 29

  arr = end.split('-');
  const endYear = arr[0]; // 22
  const endMonth = arr[1]; // 12
  const endDate = arr[2] // 3

  const currentMonth = tempArr[0].month.slice(-2);
  const currentYear = tempArr[0].month.slice(0, 4);

  for(let i = 0; i < totalSales.length; i++){
    const dailySalesArr = totalSales[i].dailySalesArr;
    const dateData = dailySalesArr.slice(-1)[0];
    if(beginDate != 29){
      if(dateData.currentMonth == currentMonth && dateData.currentYear == currentYear && (dateData.currentDate >= tempArr[0].beginDate && dateData.currentDate <= tempArr[0].endDate)){
        for(let j = 0; j < dailySalesArr.length - 1; j++){
          const productArr = dailySalesArr[j].productArr;
          for(let k = 0; k < productArr.length - 1; k++){
            finalArr.push(productArr[k]);
          }
        }
      }else if(dateData.currentMonth == currentMonth && dateData.currentYear == currentYear && dateData.currentDate > tempArr[0].endDate){
        break;
      }
    }else {
      if(dateData.currentMonth == beginMonth && dateData.currentYear == beginYear && dateData.currentDate >= beginDate && dateData.currentDate <= 31 || dateData.currentMonth == endMonth && dateData.currentYear == endYear && dateData.currentDate >= 1 && dateData.currentDate <= endDate){
        for(let j = 0; j < dailySalesArr.length - 1; j++){
          const productArr = dailySalesArr[j].productArr;
          for(let k = 0; k < productArr.length - 1; k++){
            finalArr.push(productArr[k]);
          }
        }
      }
    }
  }

  console.log(finalArr);

  // not related
  
  for(let i = 0; i < finalArr.length; i++){ // change the date type
    finalArr[i].quantity =  Number(finalArr[i].quantity);
    finalArr[i].cost = Number(finalArr[i].cost);
    finalArr[i].singlePrice = Number(finalArr[i].singlePrice.replace('RM ', ''));
  }

  for(let i = 0; i < finalArr.length; i++){ // remove the same product & cal quantity, singlePrice
    for(let j = i + 1; j < finalArr.length; j++){
      if(finalArr[i].name == finalArr[j].name){
        finalArr[i].quantity += finalArr[j].quantity;
        finalArr[i].cost += finalArr[j].cost;
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
    productCost.innerText = 'RM ' + Number(finalArr[i].cost).toFixed(2);
    productPrice.innerText = 'RM ' + Number(finalArr[i].singlePrice).toFixed(2);
    productProfit.innerText = 'RM ' + Number(((finalArr[i].singlePrice) - (finalArr[i].cost))).toFixed(2);

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