const contentContainer = document.querySelector('.content-container');
const dateProfits = document.querySelectorAll('.date-profit');
const monthInput = document.querySelector('.month');
const dailyCost = document.querySelector('.total-cost');
const dailyPrice = document.querySelector('.total-price');
const dailyProfit = document.querySelector('.total-profit');

const dates = document.querySelectorAll('.date');

const totalSales = JSON.parse(localStorage.getItem('Total Sales')) || [];

dates.forEach(date => {
  date.addEventListener('click', () => {
    window.location.href = 'daily-sales.html';
  })
});

window.onload = updateTable();

function updateTable() {
  getCurrentMonth();
  createElement();
}

function getCurrentMonth() {
  const d = new Date();
  const month = "0" + (d.getMonth() + 1);
  const year = d.getFullYear();
  monthInput.value = `${year}-${month.slice(-2)}`;
}

function createElement() {
  let dailyTotalCost = 0;
  let dailyTotalPrice = 0;
  let dailyTotalProfit = 0;
  for(let i = 0; i < totalSales.length; i++){
    const contentRow = document.createElement('div');
    const dateNo = document.createElement('div');
    const date = document.createElement('div');
    const dateCost = document.createElement('div');
    const datePrice = document.createElement('div');
    const dateProfit = document.createElement('div');

    contentRow.classList.add('content-row');
    dateNo.classList.add('date-no');
    date.classList.add('date');
    dateCost.classList.add('date-cost');
    datePrice.classList.add('date-price');
    dateProfit.classList.add('date-profit');

    const dailySalesArr = totalSales[i].dailySalesArr;

    dateNo.innerText = (i + 1) + '.';
    const year = dailySalesArr.slice(-1)[0].currentYear;
    const month = dailySalesArr.slice(-1)[0].currentMonth;
    const day = dailySalesArr.slice(-1)[0].currentDate;
    date.innerText = `${year}-${month}-${day}`;

    date.addEventListener('click', () => {
      window.location.href = 'daily-sales.html';
    });

    let totalCost = 0;
    let totalPrice = 0;
    for(let j = 0; j < dailySalesArr.length - 1; j++){
      const productArr = dailySalesArr[j].productArr;
      totalCost += Number(productArr.slice(-1)[0].totalCost);
      totalPrice += Number(productArr.slice(-1)[0].totalPrice);
    }
    const totalProfit = totalPrice - totalCost;

    dateCost.innerText = 'RM ' + totalCost.toFixed(2);
    datePrice.innerText = 'RM ' + totalPrice.toFixed(2);
    dateProfit.innerText = 'RM ' + totalProfit.toFixed(2);

    dailyTotalCost += totalCost;
    dailyTotalPrice += totalPrice;
    dailyTotalProfit += totalProfit;

    contentRow.append(dateNo, date, dateCost, datePrice, dateProfit);
    contentContainer.appendChild(contentRow);

    if(contentContainer.offsetHeight >= 360){
      dateProfit.style.width = '207px';
      dateProfit.style.paddingLeft = '20px';
    }

    dailyCost.innerText = 'RM ' + dailyTotalCost.toFixed(2);
    dailyPrice.innerText = 'RM ' + dailyTotalPrice.toFixed(2);
    dailyProfit.innerText = 'RM ' + dailyTotalProfit.toFixed(2);
  }
}