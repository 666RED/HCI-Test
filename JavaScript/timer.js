setTimeout(clearLocalStorage, 1000000);

function clearLocalStorage() {
  localStorage.removeItem('Timer');
}