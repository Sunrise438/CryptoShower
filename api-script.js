fetch('https://faucetpay.io/api/v1/payment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
    },
    body: JSON.stringify({
        user_id: 'USER_ID', // Replace with the actual user ID
        amount: '0.0001' // Amount to pay
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('Payment successful! Amount credited: ' + data.amount);
    } else {
        alert('Payment failed: ' + data.message);
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
});
