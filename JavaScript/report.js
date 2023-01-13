const contentContainer = document.querySelector('.content-container');
const monthInput = document.querySelector('.month');
const dailyCost = document.querySelector('.total-cost');
const dailyPrice = document.querySelector('.total-price');
const dailyProfit = document.querySelector('.total-profit');
const myChart = document.querySelector('#my-chart').getContext('2d');
const graphIcon = document.querySelector('.graph-icon');
const graphContainer = document.querySelector('.graph-container');
const removeIcon = document.querySelector('.remove-icon');

const totalSales = JSON.parse(localStorage.getItem('Total Sales')) || [];

graphIcon.addEventListener('click', () => {
  updateGraph(monthInput.value); // 2023-01
  graphContainer.style.display = 'block';
});

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
  saveData();
  const dateProfits = contentContainer.querySelectorAll('.date-profit');
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

      date.addEventListener('click', () => {
        const dateArr = [{
          date:date.innerText,
          day,
          month,
          year,
          cost:dateCost.innerText,
          price:datePrice.innerText,
          profit:dateProfit.innerText
        }]
        sessionStorage.setItem('Date', JSON.stringify(dateArr));
        window.location.href = 'daily-sales.html';
      });
      dateNumber++;
    }
  }

  // const contentRows = contentContainer.querySelectorAll('.content-row');

  // const monthlyArr = [];

  // contentRows.forEach(row => {
  //   const date = row.querySelector('.date');
  //   const dateArr = date.innerText.split('-');
  //   const currentDate = dateArr[2];
    
  //   const dataArr = [];
  //   dataArr.push({
  //     dateCost:row.querySelector('.date-cost').innerText,
  //     datePrice:row.querySelector('.date-price').innerText,
  //     dateProfit:row.querySelector('.date-profit').innerText
  //   });
  //   dataArr.push({
  //     currentYear,
  //     currentMonth,
  //     currentDate
  //   });
  //   monthlyArr.push(dataArr);
  // });
  // monthlyArr.push({
  //   currentYear,
  //   currentMonth
  // });
  // arr.push(monthlyArr);
  // console.log(arr);
  // localStorage.setItem('Monthly Sales', JSON.stringify(arr));
}

function saveData() {
  saveWeeklyData();
  saveMonthlyData();
}

function saveWeeklyData() {
  localStorage.removeItem('Weekly Sales');
  if(totalSales.length == 0){
    return;
  }
  let start = 0;
  while(start != -1){
    const numOfWeek = 5;
    let mul = 1;
    let index;
    let weekArr = [];
    let arr = JSON.parse(localStorage.getItem('Weekly Sales')) || [];
    let currentMonth;
    let currentYear;

    if(arr.length != 0){
      for(let i = start; i < totalSales.length; i++){ // start from the next month
        const dailySalesArr = totalSales[i].dailySalesArr;
        if(dailySalesArr.slice(-1)[0].currentMonth == '0' + (Number(arr.slice(-1)[0].slice(-1)[0].currentMonth) + 1)){
          currentMonth = dailySalesArr.slice(-1)[0].currentMonth;
          currentYear = dailySalesArr.slice(-1)[0].currentYear;
          index = i;
          break;
        }
      }
    }else {
      currentMonth = totalSales[0].dailySalesArr.slice(-1)[0].currentMonth;
      currentYear = totalSales[0].dailySalesArr.slice(-1)[0].currentYear;
      index = 0;
      if(totalSales[0].dailySalesArr.slice(-1)[0].currentDate >= 1 || totalSales[0].dailySalesArr.slice(-1)[0].currentDate <= 7){
        mul = 1;
      }else if(totalSales[0].dailySalesArr.slice(-1)[0].currentDate >= 8 || totalSales[0].dailySalesArr.slice(-1)[0].currentDate <= 14){
        mul = 2;
      }else if(totalSales[0].dailySalesArr.slice(-1)[0].currentDate >= 15 || totalSales[0].dailySalesArr.slice(-1)[0].currentDate <= 21){
        mul = 3;
      }else if(totalSales[0].dailySalesArr.slice(-1)[0].currentDate >= 22 || totalSales[0].dailySalesArr.slice(-1)[0].currentDate <= 28){
        mul = 4;
      }else {
        mul = 5;
      }
    }

    for(j = 0; j < numOfWeek; j++){ // calculate for 5 weeks
      let totalCost = 0;
      let totalPrice = 0;
      let totalProfit;
      let beginDateBoolean = false;
      if(mul * 7 > totalSales.slice(-1)[0].dailySalesArr.slice(-1)[0].currentDate && totalSales[index].dailySalesArr.slice(-1)[0].currentMonth == totalSales.slice(-1)[0].dailySalesArr.slice(-1)[0].currentMonth){ 
        weekArr.push({
          currentYear:totalSales.slice(-1)[0].dailySalesArr.slice(-1)[0].currentYear,
          currentMonth:totalSales.slice(-1)[0].dailySalesArr.slice(-1)[0].currentMonth
        });
        arr.push(weekArr);
        localStorage.setItem('Weekly Sales', JSON.stringify(arr));
        break;
      }
      if(mul == 5){
        let lastBeginDateBoolen = false;
        if(totalSales.slice(-1)[0].dailySalesArr.slice(-1)[0].currentDate < 3){ // didn't reach one week
          weekArr.push({
            currentYear:totalSales[index].dailySalesArr.slice(-1)[0].currentYear,
            currentMonth:totalSales[index].dailySalesArr.slice(-1)[0].currentMonth
          });
          arr.push(weekArr);
          localStorage.setItem('Weekly Sales', JSON.stringify(arr));
          break; // end for loop
        }else {
          while(totalSales[index].dailySalesArr.slice(-1)[0].currentDate <= 3 || totalSales[index].dailySalesArr.slice(-1)[0].currentMonth != totalSales.slice(-1)[0].dailySalesArr.slice(-1)[0].currentMonth){
            if(!lastBeginDateBoolen){
              beginDate = ((mul - 1) * 7) + 1;
              lastBeginDateBoolen = true;
            }
            const dailySalesArr = totalSales[index].dailySalesArr;
            for(let k = 0; k < dailySalesArr.length - 1; k++){ // calculate daily total
              const productArr = dailySalesArr[k].productArr;
              totalCost += productArr.slice(-1)[0].totalCost;
              totalPrice += productArr.slice(-1)[0].totalPrice;
            }
            index++;
            if(index == totalSales.length){
              index--;
              break;
            }
          }
          totalProfit = totalPrice - totalCost;
          weekArr.push({
            totalCost,
            totalPrice,
            totalProfit,
            beginDate,
            endDate:totalSales[index - 1].dailySalesArr.slice(-1)[0].currentDate,
            endMonth:totalSales[index].dailySalesArr.slice(-1)[0].currentMonth,
            endYear:totalSales[index].dailySalesArr.slice(-1)[0].currentYear
          });
          weekArr.push({
            currentYear,
            currentMonth
          });
          arr.push(weekArr);
          localStorage.setItem('Weekly Sales', JSON.stringify(arr));
          break; // end the for loop
        }
      }
      while(totalSales[index].dailySalesArr.slice(-1)[0].currentDate <= mul * 7){ // calculate weekly total
        if(!beginDateBoolean){
          beginDate = ((mul - 1) * 7) + 1;
          beginDateBoolean = true;
        }
        const dailySalesArr = totalSales[index].dailySalesArr;
        for(let k = 0; k < dailySalesArr.length - 1; k++){ // calculate daily total
          const productArr = dailySalesArr[k].productArr;
          totalCost += productArr.slice(-1)[0].totalCost;
          totalPrice += productArr.slice(-1)[0].totalPrice;
        }
        index++;
        if(index == totalSales.length){
          index--;
          break; // break while loop to avoid error
        }
      }
      totalProfit = totalPrice - totalCost;
      weekArr.push({
        totalCost,
        totalPrice,
        totalProfit,
        beginDate,
        endDate:mul * 7
      });
      mul++;
    }
    if(mul == 5 && totalSales[index].dailySalesArr.slice(-1)[0].currentDate >= 27 || totalSales[index].dailySalesArr.slice(-1)[0].currentDate == 1 || totalSales[index].dailySalesArr.slice(-1)[0].currentDate == 2 || mul < 5){
      start = -1;
    }else if(mul == 5 && totalSales[index].dailySalesArr.slice(-1)[0].currentDate >= 3){
      start = index - 7;
    }
  }  
}

function saveMonthlyData() {
  localStorage.removeItem('Monthly Sales');
  if(totalSales.length == 0){
    return;
  }

  let start = 0;
  while(start != -1){
    let index;
    let monthArr = [];
    let arr = JSON.parse(localStorage.getItem('Monthly Sales')) || [];
    let currentMonth;
    let currentYear;
    let totalCost = 0;
    let totalPrice = 0;
    let totalProfit;
    let enoughMonth = false;

    if(arr.length != 0){
      for(let i = start; i < totalSales.length; i++){
        const dailySalesArr = totalSales[i].dailySalesArr;
        if(dailySalesArr.slice(-1)[0].currentMonth == '0' + (Number(arr.slice(-1)[0].slice(-1)[0].currentMonth) + 1)){ // find next month
          currentMonth = dailySalesArr.slice(-1)[0].currentMonth;
          currentYear = dailySalesArr.slice(-1)[0].currentYear;
          index = i;
          break;
        }
      }
    }else {
      const dailySalesArr = totalSales[0].dailySalesArr;
      currentMonth = dailySalesArr.slice(-1)[0].currentMonth;
      currentYear = dailySalesArr.slice(-1)[0].currentYear;
      index = 0;
    }
    for(let i = index; i < totalSales.length; i++){
      if(totalSales[index].dailySalesArr.slice(-1)[0].currentMonth == currentMonth && totalSales[index].dailySalesArr.slice(-1)[0].currentYear == currentYear){
        const dailySalesArr = totalSales[index].dailySalesArr;
        for(let k = 0; k < dailySalesArr.length - 1; k++){ // calculate daily total
          const productArr = dailySalesArr[k].productArr;
          totalCost += productArr.slice(-1)[0].totalCost;
          totalPrice += productArr.slice(-1)[0].totalPrice;
        }
        index++;
        if(index == totalSales.length){
          index--;
          if((totalSales[index].dailySalesArr.slice(-1)[0].currentDate == 28 && currentMonth == 2) || (totalSales[index].dailySalesArr.slice(-1)[0].currentDate == 30 && (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)) || (totalSales[index].dailySalesArr.slice(-1)[0].currentDate == 31 && (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 ||currentMonth == 10 || currentMonth == 12))){
            enoughMonth = true;
          }
          break;
        }
      }else if((totalSales[index - 1].dailySalesArr.slice(-1)[0].currentDate == 28 && currentMonth == 2) || (totalSales[index - 1].dailySalesArr.slice(-1)[0].currentDate == 30 && (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)) || (totalSales[index - 1].dailySalesArr.slice(-1)[0].currentDate == 31 || (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 ||currentMonth == 10 || currentMonth == 12))){
        enoughMonth = true;
        break;
      }
    }
    totalProfit = totalPrice - totalCost;
    monthArr.push({
      totalCost,
      totalPrice,
      totalProfit,
      currentMonth,
      currentYear
    });
    if(enoughMonth){
      arr.push(monthArr);
      localStorage.setItem('Monthly Sales', JSON.stringify(arr));
      start = index;
    }else {
      start = -1;
    }
  }
}

function updateGraph(month) {

  const monthValue = month.slice(-2);
  const monthArr = [0];

  const profits = document.querySelectorAll('.date-profit');
  const profitArr = [0];

  for(let i = 0; i < profits.length; i++){
    profitArr.push(profits[i].innerText.replace('RM ', ''));
  }
  for(let i = 0; i < totalSales.length; i++){
    if(totalSales[i].dailySalesArr.slice(-1)[0].currentMonth == monthValue){
      monthArr.push(totalSales[i].dailySalesArr.slice(-1)[0].currentDate);
    }
  }

  const newChart = new Chart('my-chart', {
    type: "line",
    data: {
      labels: monthArr,
      datasets: [{
        label: 'Daily Profit',
        fill: false, // highlight area underneath the line
        lineTension: 0.4,
        backgroundColor: "rgba(0,0,255)",
        borderColor: "rgba(0,0,255)",
        data: profitArr
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Total Daily Profit'
      },
      tension: 0.4,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
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