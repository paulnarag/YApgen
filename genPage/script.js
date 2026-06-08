import { getRandomChar, secureShuffle } from "./cryptoUtils.js";

const passwordOutput = document.getElementById("passwordOutput")
const togglePassword = document.getElementById("togglePassword")

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
    let length = lengthSlider.value

    let uppercase = includeUppercase.checked
    let numbers = includeNumbers.checked
    let symbols = includeSymbols.checked

    passwordOutput.value = generateSecurePassword(length, uppercase, numbers, symbols)
})

togglePassword.addEventListener("click", () => {
    const type = passwordOutput.getAttribute("type") === "password" ? "text" : "password"
    passwordOutput.setAttribute("type", type)

    togglePassword.classList.toggle("fa-eye")
    togglePassword.classList.toggle("fa-eye-slash")

})

copyButton.addEventListener("click", () => {
    passwordOutput.select()
    passwordOutput.setSelectionRange(0, 99999)

    if (passwordOutput.value=="") {
        alert("Please generate a password first.")
    } else {
        navigator.clipboard.writeText(passwordOutput.value)
        alert("Password copied to clipboard.")
    }
})

lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
