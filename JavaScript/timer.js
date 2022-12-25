setTimeout(clearLocalStorage, 5000);

function clearLocalStorage() {
  localStorage.removeItem('Timer');
}