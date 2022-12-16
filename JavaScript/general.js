const logoutBtn = document.querySelector('.logout-img');
const noBtn = document.querySelector('.logout-no-btn');
const popupMenu = document.querySelector('.logout-pop-up');
const cancel = document.querySelector('.logout-cancel-img');

logoutBtn.addEventListener('click', (e) => {
  popupMenu.classList.add('open-popup');
});

noBtn.addEventListener('click', (e) => {  
  popupMenu.classList.remove('open-popup');
});

cancel.addEventListener('click', () => {
  popupMenu.classList.remove('open-popup');
});