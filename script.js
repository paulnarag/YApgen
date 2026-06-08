import { getRandomChar, secureShuffle } from "./cryptoUtils.js";

const passwordOutput = document.getElementById("passwordOutput")
const togglePasswordButton = document.getElementById("togglePasswordButton")

const lengthSlider = document.getElementById("lengthSlider")
const lengthOutput = document.getElementById("lengthOutput")

const includeUppercase = document.getElementById("includeUppercase")
const includeNumbers = document.getElementById("includeNumbers")
const includeSymbols = document.getElementById("includeSymbols")

const copyButton = document.getElementById("copyButton")
const generateButton = document.getElementById("generateButton")

includeUppercase.defaultChecked = true
includeNumbers.defaultChecked = true
includeSymbols.defaultChecked = true

function generateSecurePassword(length, useUppercase, useNumbers, useSymbols) {
    if (length < 12) {
        throw new Error("Password length should be at least 12 characters for adequate security.");
    }

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let allChars = lowercase

    const mandatory = [
        getRandomChar(lowercase),
    ];

    if (useUppercase) {
        allChars+=uppercase
        mandatory.push(getRandomChar(uppercase))
    }

    if (useNumbers) {
        allChars+=numbers
        mandatory.push(getRandomChar(numbers))
    }

    if (useSymbols) {
        allChars+=symbols
        mandatory.push(getRandomChar(symbols))
    }

    const passwordChars = [...mandatory];
    const remainingLength = length - mandatory.length;

    for (let i = 0; i < remainingLength; i++) {
        passwordChars.push(getRandomChar(allChars));
    }

    return secureShuffle(passwordChars).join("");
}

if (!(window.crypto && window.crypto.getRandomValues)) {
    console.log("Crypto API is unavailable")
}


generateButton.addEventListener("click", () => {
    let uppercase = includeUppercase.checked
    let numbers = includeNumbers.checked
    let symbols = includeSymbols.checked


})


lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
