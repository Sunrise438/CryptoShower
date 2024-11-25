document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    const paymentHistoryBody = document.getElementById('payment-history-body');

    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const apiKey = document.getElementById('api-key').value;

        fetch('https://faucetpay.io/api/v1/admin/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                amount: amount
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const paymentHistoryRow = document.createElement('tr');
                paymentHistoryRow.innerHTML = `
                    <td>${data.user_id}</td>
                    <td>${data.amount}</td>
                    <td>${data.payment_date}</td>
                `;
                paymentHistoryBody.appendChild(paymentHistoryRow);
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
