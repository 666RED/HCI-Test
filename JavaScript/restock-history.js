const returnIcon = document.querySelector('.return-icon');
const contentContainer = document.querySelector('.content-container');
// const invoice = document.querySelector('.invoice-no');
const supplierCategory = document.querySelector('.supplier');

const restockArr = JSON.parse(localStorage.getItem('Restock Product')) || [];
const supplierArr = JSON.parse(localStorage.getItem('Supplier')) || [];

supplierCategory.addEventListener('change', updateHistory);

returnIcon.addEventListener('click', () => {
  window.location.href = 'restock.html';  
});

window.onload = displayHistory();

function displayHistory() {
  for(let i = 0; i < restockArr.length; i++){
    const contentRow = document.createElement('div');
    const no = document.createElement('div');
    const invoiceNo = document.createElement('div');
    const supplierName = document.createElement('div');
    const placedDate = document.createElement('div');
    const receivedDate = document.createElement('div');
    const restockFee = document.createElement('div');

    no.innerText = i + 1 + '.';
    invoiceNo.innerText = restockArr[i].invoiceArr.slice(-1)[0].invoiceNo;
    supplierName.innerText = restockArr[i].invoiceArr.slice(-1)[0].supplierName;
    placedDate.innerText = restockArr[i].invoiceArr.slice(-1)[0].placedDate;
    receivedDate.innerText = restockArr[i].invoiceArr.slice(-1)[0].receivedDate;
    restockFee.innerText = 'RM ' + Number(restockArr[i].invoiceArr.slice(-1)[0].restockFee).toFixed(2);

    contentRow.classList.add('content-row');
    no.classList.add('no');
    invoiceNo.classList.add('invoice-no');
    supplierName.classList.add('supplier-name');
    placedDate.classList.add('placed');
    receivedDate.classList.add('received');
    restockFee.classList.add('restock-fee');

    contentRow.append(no, invoiceNo, supplierName, placedDate, receivedDate, restockFee);
    contentContainer.appendChild(contentRow);

    contentRow.addEventListener('click', goToInvoice);

    if(contentContainer.offsetHeight >= 336){
      const restockFees = contentContainer.querySelectorAll('.restock-fee');
      restockFees.forEach(fee => {
        fee.style.width = '143px';
        fee.style.paddingLeft = '17px';
      });
    }
  }
  for(let i = 0; i < supplierArr.length; i++){
    const supplierOption = document.createElement('option');
    supplierOption.setAttribute('value', supplierArr[i].supplierName);
    supplierOption.innerText = supplierArr[i].supplierName;
    supplierCategory.append(supplierOption);
  }
}

function goToInvoice(e) {
  const rowClicked = e.target.parentElement;
  for(let i = 0; i < restockArr.length; i++){
    const invoiceArr = restockArr[i].invoiceArr;
    if(rowClicked.querySelector('.invoice-no').innerText == invoiceArr.slice(-1)[0].invoiceNo){
      sessionStorage.setItem('Invoice', JSON.stringify(invoiceArr));
      window.location.href = 'invoice.html';
      return;
    }
  }
}

function updateHistory(e) {
  const category = e.target;
  contentContainer.innerHTML = '';
  let numOfRow = 1;
  if(category.value == 'all'){
    for(let i = 0; i < restockArr.length; i++){
      const contentRow = document.createElement('div');
      const no = document.createElement('div');
      const invoiceNo = document.createElement('div');
      const supplierName = document.createElement('div');
      const placedDate = document.createElement('div');
      const receivedDate = document.createElement('div');
      const restockFee = document.createElement('div');

      no.innerText = i + 1 + '.';
      invoiceNo.innerText = restockArr[i].invoiceArr.slice(-1)[0].invoiceNo;
      supplierName.innerText = restockArr[i].invoiceArr.slice(-1)[0].supplierName;
      placedDate.innerText = restockArr[i].invoiceArr.slice(-1)[0].placedDate;
      receivedDate.innerText = restockArr[i].invoiceArr.slice(-1)[0].receivedDate;
      restockFee.innerText = 'RM ' + Number(restockArr[i].invoiceArr.slice(-1)[0].restockFee).toFixed(2);

      contentRow.classList.add('content-row');
      no.classList.add('no');
      invoiceNo.classList.add('invoice-no');
      supplierName.classList.add('supplier-name');
      placedDate.classList.add('placed');
      receivedDate.classList.add('received');
      restockFee.classList.add('restock-fee');

      contentRow.addEventListener('click', () => {
        window.location.href = 'invoice.html';
      });

      contentRow.append(no, invoiceNo, supplierName, placedDate, receivedDate, restockFee);
      contentContainer.appendChild(contentRow);

      if(contentContainer.offsetHeight >= 336){
        const restockFees = contentContainer.querySelectorAll('.restock-fee');
        restockFees.forEach(fee => {
          fee.style.width = '143px';
          fee.style.paddingLeft = '17px';
        });
      }
    }
  }else{
    for(let i = 0; i < restockArr.length; i++){
      if(category.value == restockArr[i].invoiceArr.slice(-1)[0].supplierName){
        const contentRow = document.createElement('div');
        const no = document.createElement('div');
        const invoiceNo = document.createElement('div');
        const supplierName = document.createElement('div');
        const placedDate = document.createElement('div');
        const receivedDate = document.createElement('div');
        const restockFee = document.createElement('div');

        no.innerText = numOfRow + '.';
        invoiceNo.innerText = restockArr[i].invoiceArr.slice(-1)[0].invoiceNo;
        supplierName.innerText = restockArr[i].invoiceArr.slice(-1)[0].supplierName;
        placedDate.innerText = restockArr[i].invoiceArr.slice(-1)[0].placedDate;
        receivedDate.innerText = restockArr[i].invoiceArr.slice(-1)[0].receivedDate;
        restockFee.innerText = 'RM ' + Number(restockArr[i].invoiceArr.slice(-1)[0].restockFee).toFixed(2);

        contentRow.classList.add('content-row');
        no.classList.add('no');
        invoiceNo.classList.add('invoice-no');
        supplierName.classList.add('supplier-name');
        placedDate.classList.add('placed');
        receivedDate.classList.add('received');
        restockFee.classList.add('restock-fee');

        contentRow.addEventListener('click', () => {
          window.location.href = 'invoice.html';
        });

        contentRow.append(no, invoiceNo, supplierName, placedDate, receivedDate, restockFee);
        contentContainer.appendChild(contentRow);

        if(contentContainer.offsetHeight >= 336){
          const restockFees = contentContainer.querySelectorAll('.restock-fee');
          restockFees.forEach(fee => {
            fee.style.width = '143px';
            fee.style.paddingLeft = '17px';
          });
        }
        numOfRow++;
      }
    }
  }
}