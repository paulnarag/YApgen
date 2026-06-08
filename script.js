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

function generateSecurePassword() {
    if (length < 12) {
        throw new Error("Password length should be at least 12 characters for adequate security.");
    }

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const mandatory = [
        getRandomChar(uppercase),
        getRandomChar(lowercase),
        getRandomChar(numbers),
        getRandomChar(symbols)
    ];

    const allChars = uppercase + lowercase + numbers + symbols;
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
