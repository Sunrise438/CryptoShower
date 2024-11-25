document.getElementById('claim-button').addEventListener('click', function() {
    fetch('https://faucetpay.io/api/v1/claim', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
        },
        body: JSON.stringify({
            user_id: 'USER_ID', // Replace with the actual user ID
            amount: '0.0001' // Amount to claim
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Claim successful! Amount credited: ' + data.amount);
            // Update balance
            let balanceElement = document.getElementById('balance');
            let currentBalance = parseFloat(balanceElement.innerText);
            balanceElement.innerText = (currentBalance + parseFloat(data.amount)).toFixed(4);
        } else {
            alert('Claim failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
