document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("faucet-form");
    const emailInput = document.getElementById("faucetpay-email");
    const messageDiv = document.getElementById("message");
    const claimButton = document.getElementById("claim-btn");

    const faucetPayApiKey = "3f1f60d48c8913449bab8682a4f0a69780e5dcf471f9d831ec2b945271755f51"; // Replace with your API key
    const cooldownMinutes = 1; // Cooldown period in minutes
    const rewardAmount = 0.00000001; // BTC reward
    const currency = "BTC";

    // Check cooldown on page load
    const lastClaimTime = localStorage.getItem("lastClaimTime");
    if (lastClaimTime) {
        const now = new Date().getTime();
        const cooldown = cooldownMinutes * 60 * 1000;
        if (now - lastClaimTime < cooldown) {
            disableClaimButton();
        }
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            showMessage("Invalid email address.", "error");
            return;
        }

        if (isCooldownActive()) {
            showMessage("Please wait before claiming again.", "error");
            return;
        }

        disableClaimButton();
        showMessage("Processing your claim...", "info");

        try {
            // Send request to FaucetPay API
            const response = await fetch("https://faucetpay.io/api/v1/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    api_key: faucetPayApiKey,
                    to: email,
                    amount: rewardAmount,
                    currency: currency
                })
            });

            const result = await response.json();

            if (result.status === 200) {
                showMessage("Success! BTC has been sent to your FaucetPay account.", "success");
                localStorage.setItem("lastClaimTime", new Date().getTime());
            } else {
                showMessage("Error: " + result.message, "error");
                enableClaimButton();
            }
        } catch (error) {
            showMessage("An error occurred. Please try again later.", "error");
            enableClaimButton();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function disableClaimButton() {
        claimButton.disabled = true;
        claimButton.textContent = "Please wait...";
    }

    function enableClaimButton() {
        claimButton.disabled = false;
        claimButton.textContent = "Claim BTC";
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.style.color = type === "success" ? "green" : type === "error" ? "red" : "#555";
    }

    function isCooldownActive() {
        const lastClaimTime = localStorage.getItem("lastClaimTime");
        if (!lastClaimTime) return false;

        const now = new Date().getTime();
        const cooldown = cooldownMinutes * 60 * 1000;
        return now - lastClaimTime < cooldown;
    }
});                                    
