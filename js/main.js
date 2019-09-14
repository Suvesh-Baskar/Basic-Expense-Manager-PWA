// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../service_worker.js')
    .then(res => console.log(`Service Worker: Registered`))
    .catch(err => console.log(`Service Worker: Error`, err));
}

// Local Storage

document.getElementById('expense').addEventListener('click', addExpense);
document.getElementById('income').addEventListener('click', income);

function addExpense() {
  let amount = document.getElementById('inputNumber').value;
  //   Check wallet in local storage
  if (localStorage.getItem('wallet')) {
    //   Get Wallet and update value
    let wallet = JSON.parse(localStorage.getItem('wallet'));
    wallet.value = Number(wallet.value) + Number(amount ? amount : 0);
    localStorage.setItem('wallet', JSON.stringify(wallet));
  } else {
    //   Initalize Wallet with the amount
    let wallet = {
      value: Number(amount ? amount : 0)
    };
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }
  fetchAmount();
  //   document.getElementById('amountForm').reset();
}

function income() {
  let amount = document.getElementById('inputNumber').value;

  if (localStorage.getItem('wallet')) {
    let wallet = JSON.parse(localStorage.getItem('wallet'));
    let amountResult = Number(wallet.value) - Number(amount ? amount : 0);
    //console.log(amountResult, 'AMOUNT RESULT');
    wallet.value = amountResult >= 0 ? amountResult : 0;
    localStorage.setItem('wallet', JSON.stringify(wallet));
  } else {
    //   Initalize Wallet with the amount
    let wallet = {
      value: Number(amount ? amount : 0)
    };
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }
  fetchAmount();
}

function fetchAmount() {
  //console.log(
  //     localStorage.getItem('wallet')
  //       ? JSON.parse(localStorage.getItem('wallet')).value
  //       : 0
  //   );

  let result = localStorage.getItem('wallet')
    ? JSON.parse(localStorage.getItem('wallet')).value
    : 0;
  document.getElementById('amount').innerText = `₹ ${result}`;
  //console.log('HELLO');
}
