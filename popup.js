// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the generate button element
    const generateButton = document.getElementById("generate");
    
    // Add a click event listener to the generate button
    generateButton.addEventListener("click", () => {
        // Get the minimum and maximum values from the input fields and convert them to integers
        const min = parseInt(document.getElementById("min").value);
        const max = parseInt(document.getElementById("max").value);
        // Get the result element where the random number will be displayed
        const resultElement = document.getElementById("result");

        // Check if the inputs are valid numbers
        if (isNaN(min) || isNaN(max)) {
            resultElement.textContent = "Please enter valid numbers.";
            return;
        }

        // Check if the minimum value is less than or equal to the maximum value
        if (min > max) {
            resultElement.textContent = "Minimum should be less than or equal to Maximum.";
            return;
        }

        // Generate a random number between min and max (inclusive)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        // Display the generated random number
        resultElement.textContent = `Random Number: ${randomNumber}`;

        // Copy the random number to the clipboard
        navigator.clipboard.writeText(randomNumber.toString()).then(() => {
            console.log('Random number copied to clipboard');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
});
