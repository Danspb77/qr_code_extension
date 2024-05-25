document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate");
    generateButton.addEventListener("click", () => {
        const min = parseInt(document.getElementById("min").value);
        const max = parseInt(document.getElementById("max").value);
        const resultElement = document.getElementById("result");

        if (isNaN(min) || isNaN(max)) {
            resultElement.textContent = "Please enter valid numbers.";
            return;
        }

        if (min > max) {
            resultElement.textContent = "Minimum should be less than or equal to Maximum.";
            return;
        }

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        resultElement.textContent = `Random Number: ${randomNumber}`;
    });
});
