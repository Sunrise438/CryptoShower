// Initialize EmailJS
emailjs.init({
  publicKey: 'qFZMYU6AuJWP0pzl-',
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: ['foo@emailjs.com', 'bar@emailjs.com'],
    // The variable contains the email address
    watchVariable: 'wwillow829@gmail.com',
  },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000,
  },
});

// Claim Timer and User Balance
const claimButton = document.getElementById('claimButton');
const timer = document.getElementById('timer');
const balanceDisplay = document.getElementById('balance');
const claimMessage = document.getElementById('claimMessage');

let lastClaimTime = localStorage.getItem('lastClaimTime') || 0;
let balance = parseInt(localStorage.getItem('balance')) || 0;
const claimAmount = 1;
const claimInterval = 15; // 15 seconds
const minWithdrawal = 30; // Minimum balance to withdraw

balanceDisplay.innerText = `Your Balance: ${balance} Satoshi`;

// Update claim button state
function updateClaimButton() {
  const now = Math.floor(Date.now() / 1000);
  if (now - lastClaimTime < claimInterval) {
    claimButton.disabled = true;
    const remaining = claimInterval - (now - lastClaimTime);
    timer.innerText = `Please wait ${remaining} seconds to claim again.`;
    setTimeout(updateClaimButton, 1000);
  } else {
    claimButton.disabled = false;
    timer.innerText = 'You can claim now.';
  }
}
updateClaimButton();

// Handle claim
claimButton.addEventListener('click', () => {
  const now = Math.floor(Date.now() / 1000);
  lastClaimTime = now;
  localStorage.setItem('lastClaimTime', now);

  balance += claimAmount;
  localStorage.setItem('balance', balance);

  balanceDisplay.innerText = `Your Balance: ${balance} Satoshi`;
  logTransaction(`Claimed ${claimAmount} Satoshi`);
  claimMessage.innerText = 'Claim successful!';
  updateClaimButton();
});

// Withdrawal Form
const withdrawForm = document.getElementById('withdrawForm');
const withdrawMessage = document.getElementById('withdrawMessage');

withdrawForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const withdrawFaucetPayEmail = document.getElementById('withdrawFaucetPayEmail').value;

  if (!withdrawFaucetPayEmail) {
    withdrawMessage.innerText = 'Please enter a valid FaucetPay Email.';
    return;
  }

  if (balance < minWithdrawal) {
    withdrawMessage.innerText = `You need at least ${minWithdrawal} Satoshi to withdraw.`;
    return;
  }

  withdrawMessage.innerText = 'Processing withdrawal request...';

  // EmailJS configuration
  const templateParams = {
    wallet: withdrawFaucetPayEmail,
    amount: balance,
  };

  emailjs
  var templateParams = {
  name: 'James',
  notes: 'Check this out!',
};

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams).then(
  (response) => {
    console.log('SUCCESS!', response.status, response.text);
  },
  (error) => {
    console.log('FAILED...', error);
  },
);

// Transaction Log
const transactionLog = document.getElementById('transactionLog');

function logTransaction(message) {
  const log = JSON.parse(localStorage.getItem('transactionLog')) || [];
  log.push({ message, time: new Date().toLocaleString() });
  localStorage.setItem('transactionLog', JSON.stringify(log));
  displayLog();
}

function displayLog() {
  const log = JSON.parse(localStorage.getItem('transactionLog')) || [];
  transactionLog.innerHTML = log.map(entry => `<li>${entry.time}: ${entry.message}</li>`).join('');
}

// Load transaction log on page load
displayLog();                                                   
