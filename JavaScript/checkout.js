const logoutBtn = document.querySelector('.logout-img');
const noBtn = document.querySelector('.no-btn');
const popupMenu = document.querySelector('.pop-up');

logoutBtn.addEventListener('click', (e) => {
  popupMenu.classList.add('open-popup');
});

noBtn.addEventListener('click', (e) => {
  const popupMenu = document.querySelector('.pop-up');
  
  popupMenu.classList.remove('open-popup');
});

