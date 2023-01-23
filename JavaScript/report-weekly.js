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

const totalSales = JSON.parse(localStorage.getItem('Total Sales')) || [];
const weeklySalesArr = JSON.parse(localStorage.getItem('Weekly Sales')) || [];

graphIcon.addEventListener('click', () => {
  updateGraph(monthInput.value); // 2023-01
  graphContainer.style.display = 'block';
});

monthInput.addEventListener('change', () => {
  contentContainer.innerHTML = '';
  monthlyCost.innerText = '';
  monthlyPrice.innerText = '';
  monthlyProfit.innerText = '';
  updateTable(monthInput.value);
});

window.onload = displayWeeklyReport();

function displayWeeklyReport() {
  const month = getCurrentMonth();
  createElement(month);
  if(contentContainer.childElementCount == 0){
    monthlyCost.innerText = '';
    monthlyPrice.innerText = '';
    monthlyProfit.innerText = '';
  }
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

function createElement(month){
  for(let i = 0; i < weeklySalesArr.length; i++){
    if(month == `${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}`){
      let totalCost = 0;
      let totalPrice = 0;
      let totalProfit = 0;
      for(let j = 0; j < weeklySalesArr[i].length - 1; j++){
        const currentArr = weeklySalesArr[i];
        const container = document.createElement('div');
        const dateNo = document.createElement('div');
        const date = document.createElement('div');
        const arrow = document.createElement('span');
        const dateCost = document.createElement('div');
        const datePrice = document.createElement('div');
        const dateProfit = document.createElement('div');

        dateNo.innerText = (j + 1) + '.';
        arrow.innerText = '->';
        if(j == 4){
          date.innerText = `${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}-${currentArr[j].beginDate} ${arrow.innerText} ${weeklySalesArr[i][4].endYear}-${weeklySalesArr[i][4].endMonth}-${currentArr[j].endDate}`;
        }else {
          date.innerText = `${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}-${currentArr[j].beginDate} ${arrow.innerText} ${weeklySalesArr[i].slice(-1)[0].currentYear}-${weeklySalesArr[i].slice(-1)[0].currentMonth}-${currentArr[j].endDate}`;
        }
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
            beginDate:currentArr[j].beginDate,
            endDate:currentArr[j].endDate,
            month,
            date:date.innerText,
            cost:dateCost.innerText,
            price:datePrice.innerText,
            profit:dateProfit.innerText
          }];
          sessionStorage.setItem('Date', JSON.stringify(dateArr));
          window.location.href = 'weekly-sales.html';
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

  const monthValue = month.slice(-2);
  const yearValue = month.slice(0, 4);
  const monthArr = [0];
  graphDate.innerText = monthInput.value;
  const numOfWeek = 5;

  const profits = document.querySelectorAll('.date-profit');
  const profitArr = [0];

  for(let i = 0; i < profits.length; i++){
    profitArr.push(profits[i].innerText.replace('RM ', ''));
  }
  for(let i = profitArr.length; i <= numOfWeek; i++){
    profitArr.push(0);
  }

  for(let i = 0; i < weeklySalesArr.length; i++){
    if(weeklySalesArr[i].slice(-1)[0].currentMonth == monthValue && weeklySalesArr[i].slice(-1)[0].currentYear == yearValue){
      for(let j = 0; j < weeklySalesArr[i].length - 1; j++)
      monthArr.push("Week " + (j + 1));
    }
  }
  for(let i = monthArr.length; i <= numOfWeek; i++){
    monthArr.push("Week " + i);
  }

  const newChart = new Chart('my-chart', {
    type: "line",
    data: {
      labels: monthArr,
      datasets: [{
        label: 'Weekly Profit',
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
            text: 'Week',
            font: {
              size: 20,
              weight: 'bold',
              lineHeight: 1.2
            },
            padding: {top: 10, left: 0, right: 0, bottom: 10}
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Profit (RM)',
            font: {
              size: 20,
              weight: 'bold',
              lineHeight: 1.2
            },
            padding: {top: 10, left: 0, right: 0, bottom: 10},
          },
          ticks: {
            beginAtZero: true
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