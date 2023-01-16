const contentContainer = document.querySelector('.content-container');
const monthInput = document.querySelector('.month');
const monthlyCost = document.querySelector('.total-cost');
const monthlyPrice = document.querySelector('.total-price');
const monthlyProfit = document.querySelector('.total-profit');
const myChart = document.querySelector('#my-chart').getContext('2d');
const graphIcon = document.querySelector('.graph-icon');
const graphContainer = document.querySelector('.graph-container');
const removeIcon = document.querySelector('.remove-icon');
const graphDate = document.querySelector('.graph-date');

const monthlySalesArr = JSON.parse(localStorage.getItem('Monthly Sales')) || [];

graphIcon.addEventListener('click', () => {
  updateGraph(monthInput.value); // 2023-01
  graphContainer.style.display = 'block';
});

monthInput.addEventListener('change', () => {
  contentContainer.innerHTML = '';
  monthlyCost.innerText = '';
  monthlyPrice.innerText = '';
  monthlyProfit.innerText = '';
  const yearInput = monthInput.value.slice(0, 4);
  updateTable(yearInput);
});

function getCurrentMonth() {
  const d = new Date();
  const month = "0" + (d.getMonth() + 1);
  const year = d.getFullYear();
  monthInput.value = `${year}-${month.slice(-2)}`;
}

window.onload= displayMontnlyReport();

function displayMontnlyReport() {
  getCurrentMonth();
  const yearInput = monthInput.value.slice(0, 4);
  createElement(yearInput);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function updateTable(year) {
  createElement(year);
  const dateProfits = document.querySelectorAll('.date-profit');
  dateProfits.forEach(profit => {
    if(contentContainer.offsetHeight >= 360){
      profit.style.width = '207px';
      profit.style.paddingLeft = '20px';
    } 
  });
}

function createElement(year){
  for(let i = 0; i < monthlySalesArr.length; i++){
    if(year == monthlySalesArr[i][0].currentYear){
      let totalCost = 0;
      let totalPrice = 0;
      let totalProfit = 0;

      for(let j = 0; j < monthlySalesArr[i].length; j++){
        const currentArr = monthlySalesArr[i];
        const container = document.createElement('div');
        const dateNo = document.createElement('div');
        const date = document.createElement('div')
        const dateCost = document.createElement('div');
        const datePrice = document.createElement('div');
        const dateProfit = document.createElement('div');

        dateNo.innerText = (j + 1) + '.';
        date.innerText = year + '-' + currentArr[0].currentMonth;
        dateCost.innerText = 'RM ' + Number(currentArr[j].totalCost).toFixed(2);
        datePrice.innerText = 'RM ' + Number(currentArr[j].totalPrice).toFixed(2);
        dateProfit.innerText = 'RM ' + Number(currentArr[j].totalProfit).toFixed(2);

        totalCost += currentArr[j].totalCost;
        totalPrice += currentArr[j].totalPrice;
        totalProfit += currentArr[j].totalProfit;

        container.classList.add('content-row');
        dateNo.classList.add('date-no');
        date.classList.add('date');
        dateCost.classList.add('date-cost');
        datePrice.classList.add('date-price');
        dateProfit.classList.add('date-profit');

        date.addEventListener('click', () => {
          const dateArr = [{
            date:date.innerText,
            cost:dateCost.innerText,
            price:datePrice.innerText,
            profit:dateProfit.innerText
          }];
          sessionStorage.setItem('Date', JSON.stringify(dateArr));
          window.location.href = 'monthly-sales.html';
        });

        container.append(dateNo, date, dateCost, datePrice, dateProfit);
        contentContainer.appendChild(container);
      }
      monthlyCost.innerText = 'RM ' + Number(totalCost).toFixed(2);
      monthlyPrice.innerText = 'RM ' + Number(totalPrice).toFixed(2);
      monthlyProfit.innerText = 'RM ' + Number(totalProfit).toFixed(2);
    }
  }
}

function updateGraph(month) {

  const yearValue = month.slice(0, 4);
  const yearArr = [0];
  graphDate.innerText = yearValue;
  const numOfMonth = 12;

  const profits = document.querySelectorAll('.date-profit');
  const profitArr = [0];

  for(let i = 0; i < profits.length; i++){
    profitArr.push(profits[i].innerText.replace('RM ', ''));
  }
  for(let i = profitArr.length; i <= numOfMonth; i++){
    profitArr.push(0);
  }

  for(let i = 0; i < monthlySalesArr.length; i++){
    if(monthlySalesArr[i][0].currentYear == yearValue){
      yearArr.push(monthlySalesArr[i][0].currentMonth);
    }
  }
  for(let i = yearArr.length; i <= numOfMonth; i++){
    if(yearArr.length <= 9){
      yearArr.push('0' + i);
    }else {
      yearArr.push(i);
    }
  }

  const newChart = new Chart('my-chart', {
    type: "line",
    data: {
      labels: yearArr,
      datasets: [{
        label: 'Monthly Profit',
        fill: false, // highlight area underneath the line
        lineTension: 0.4,
        backgroundColor: "rgba(0,0,255)",
        borderColor: "rgba(0,0,255)",
        data: profitArr
      }]
    },
    options: {
      tension: 0.4,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
            font: {
              size: 20,
              weight: 'bold',
              lineHeight: 1.2
            },
            padding: {top: 10, left: 0, right: 0, bottom: 10}
          }
        },
        y: {
          title: {
            display: true,
            text: 'Profit (RM)',
            font: {
              size: 20,
              weight: 'bold',
              lineHeight: 1.2
            },
            padding: {top: 10, left: 0, right: 0, bottom: 10}
          }
        },
      }
    }
  });

  removeIcon.addEventListener('click', () => {
    newChart.destroy();
    graphContainer.style.display = 'none';
  });
}