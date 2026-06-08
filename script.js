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


if (!(window.crypto && window.crypto.getRandomValues)) {
    console.log("Crypto API is unavailable")
}

includeUppercase.addEventListener("change", () => {
    let uppercaseStatus=includeUppercase.checked
    console.log(uppercaseStatus)
})

includeNumbers.addEventListener("change", () => {
    let numbersStatus=includeNumbers.checked
    console.log(numbersStatus)
})

includeSymbols.addEventListener("change", () => {
    let symbolsStatus=includeSymbols.checked
    console.log(symbolsStatus)
})




lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
