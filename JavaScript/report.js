const contentContainer = document.querySelector('.content-container');
const monthInput = document.querySelector('.month');
const dailyCost = document.querySelector('.total-cost');
const dailyPrice = document.querySelector('.total-price');
const dailyProfit = document.querySelector('.total-profit');

const totalSales = JSON.parse(localStorage.getItem('Total Sales')) || [];

monthInput.addEventListener('change', () => {
  contentContainer.innerHTML = '';
  dailyCost.innerText = '';
  dailyPrice.innerText = '';
  dailyProfit.innerText = '';
  updateTable(monthInput.value);
});

window.onload = displayTable();

function displayTable() {
  const month = getCurrentMonth();
  createElement(month);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function updateTable(month) {
  createElement(month);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function getCurrentMonth() {
  const d = new Date();
  const month = "0" + (d.getMonth() + 1);
  const year = d.getFullYear();
  monthInput.value = `${year}-${month.slice(-2)}`;
  return monthInput.value;
}

function createElement(month) {
  let dailyTotalCost = 0;
  let dailyTotalPrice = 0;
  let dailyTotalProfit = 0;
  let dateNumber = 1;

  const currentYear = month.slice(0, 4); //2022
  const currentMonth = month.slice(-2); //12
  for(let i = 0; i < totalSales.length; i++){
    if(totalSales[i].dailySalesArr.slice(-1)[0].currentMonth == currentMonth && totalSales[i].dailySalesArr.slice(-1)[0].currentYear == currentYear){
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

      dateNo.innerText = dateNumber + '.';
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

      dateNumber++;
    }
  }
}

var xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
var yValues = [100, 200, 150, 120, 130, 90, 50, 190, 200, 140, 138, 159, 85, 159, 130, 158, 105, 157, 159, 135, 100, 205, 154, 104, 94, 105, 140, 138, 195, 92, 194];

new Chart("my-chart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false, // highlight area underneath the line
      lineTension: 0.4,
      backgroundColor: "rgba(0,0,255)",
      borderColor: "rgba(0,0,255)",
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: 'hello'
    },
    legend: {display: false},
    tension: 0.4,
    scales: {
      yAxes: [
        {
          ticks: {min: 0, max:250},
        }
      ]
    }
  }
});