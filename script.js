console.log("Script loaded");


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


if (!(window.crypto && window.crypto.getRandomValues)) {
    console.log("Crypto API is unavailable")
}






lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
