// Shira koka, Moshe Meron

// This JavaScript code is used to create a base converter that converts numbers between different bases (binary, octal, decimal, and hexadecimal).
// The code uses event listeners to handle user interactions and performs the conversion based on the selected bases.
// The code is structured to allow the user to select the base they want to convert from and to, and then enter a number to be converted.
// The result is displayed in a formatted manner, showing the input number with its base and the converted number with its base.
// Select the base buttons for FROM and TO using their IDs
// The buttons are selected using the querySelector method and stored in variables for later use
// The buttons are grouped into two sections: fromBase and toBase
// The fromBase buttons are used to select the base of the input number, and the toBase buttons are used to select the base of the output number


let fromBase = null; // Initialize fromBase to null
let toBase = null;  // Initialize toBase to null

// Select the base buttons for FROM and TO
const fromBinary = document.querySelector('#from_box #binary');
const fromOctal = document.querySelector('#from_box #octal');
const fromDecimal = document.querySelector('#from_box #decimal');
const fromHex = document.querySelector('#from_box #hex');

// Select the base buttons for TO
const toBinary = document.querySelector('#to_box #binary');
const toOctal = document.querySelector('#to_box #octal');
const toDecimal = document.querySelector('#to_box #decimal');
const toHex = document.querySelector('#to_box #hex');

// Select the input field and button
const inputDiv = document.getElementById('input');
const inputField = document.createElement('input');
inputField.type = 'text'; //
inputField.id = 'input-number';
inputField.placeholder = 'Enter number';
inputDiv.appendChild(inputField);

// Select the convert button
const convertBtn = document.getElementById('convert');

// Function to select the base buttons and highlight the selected one
// This function removes the 'selected' class from all buttons and adds it to the selected button
function selectBase(divs, selectedDiv) {
    divs.forEach(div => div.classList.remove('selected')); // Remove 'selected' class from all buttons
    selectedDiv.classList.add('selected'); // Add 'selected' class to the clicked button
}

// Add event listeners to the base buttons for FROM and TO
fromBinary.addEventListener('click', () => {
    fromBase = 2;
    selectBase([fromBinary, fromOctal, fromDecimal, fromHex], fromBinary);
});
fromOctal.addEventListener('click', () => {
    fromBase = 8;
    selectBase([fromBinary, fromOctal, fromDecimal, fromHex], fromOctal);
});
fromDecimal.addEventListener('click', () => {
    fromBase = 10;
    selectBase([fromBinary, fromOctal, fromDecimal, fromHex], fromDecimal);
});
fromHex.addEventListener('click', () => {
    fromBase = 16;
    selectBase([fromBinary, fromOctal, fromDecimal, fromHex], fromHex);
});

// Add event listeners to the base buttons for TO
toBinary.addEventListener('click', () => {
    toBase = 2;
    selectBase([toBinary, toOctal, toDecimal, toHex], toBinary);
});
toOctal.addEventListener('click', () => {
    toBase = 8;
    selectBase([toBinary, toOctal, toDecimal, toHex], toOctal);
});
toDecimal.addEventListener('click', () => {
    toBase = 10;
    selectBase([toBinary, toOctal, toDecimal, toHex], toDecimal);
});
toHex.addEventListener('click', () => {
    toBase = 16;
    selectBase([toBinary, toOctal, toDecimal, toHex], toHex);
});

// Function to convert the number from one base to another
// This function checks if the input is valid, converts it to decimal, and then to the target base
function convert() {
    const inputValue = inputField.value.trim(); // Get the trimmed value from the input field

    if (fromBase == null || toBase == null) { // Check if both bases are selected
        alert('Please select both FROM and TO bases.');
        return;
    }

    if (inputValue === '') {
        alert('Please enter a number.');
        return;
    }

    // Check if the input value is valid for the selected base
    // This object contains regular expressions to validate the input for each base
    const validInputs = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^\d+$/,
        16: /^[0-9a-fA-F]+$/
    };

    // Check if the input value matches the regular expression for the selected base
    // If it doesn't match, show an alert and return
    if (!validInputs[fromBase].test(inputValue)) {
        alert('Invalid number for selected base.');
        return;
    }

    // Convert the input value to decimal using parseInt
    // The parseInt function takes the input value and the base as arguments
    const decimalValue = parseInt(inputValue, fromBase);
    let result = decimalValue.toString(toBase);
    // Convert the result to uppercase if the target base is 16
    // This is done to match the common representation of hexadecimal numbers
    if (toBase === 16) {
        result = result.toUpperCase();
    }

    // Create an object to map the base numbers to their respective symbols
    // This object contains the symbols for bases 2, 8, 10, and 16
    const baseSymbols = {
        2: '₂',
        8: '₈',
        10: '₁₀',
        16: '₁₆'
    };

    // Display the result in the output div
    // The output div is selected using its ID and the result is displayed in a formatted string
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `result : ${inputValue}${baseSymbols[fromBase]}   =   ${result}${baseSymbols[toBase]}`;

    // Clear the input field after conversion  
    inputField.value = '';

}
// Add event listener to the convert button
// This event listener calls the convert function when the button is clicked
convertBtn.addEventListener('click', convert);
