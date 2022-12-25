const printButton = document.querySelector('.print-btn');
const printPopup = document.querySelector('.print-popup');
const wholeContainer = document.querySelector('.whole-container');

printButton.addEventListener('click', () => {
  printPopup.classList.add('open-popup');
  wholeContainer.classList.add('active');
  setTimeout(backToReport, 5000);
});

function backToReport() {
  window.location.href = 'report.html';
}