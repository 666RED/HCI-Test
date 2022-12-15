const logoutBtn = document.querySelector('.logout-img');
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
const popupMenu = document.querySelector('.pop-up');
const cancel = document.querySelector('.cancel-img');

logoutBtn.addEventListener('click', (e) => {
  popupMenu.classList.add('open-popup');
});

noBtn.addEventListener('click', (e) => {  
  popupMenu.classList.remove('open-popup');
});

yesBtn.addEventListener('click', () => {
  popupMenu.classList.remove('open-popup');
});

cancel.addEventListener('click', () => {
  popupMenu.classList.remove('open-popup');
});