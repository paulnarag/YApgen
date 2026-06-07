console.log("Script loaded");


const passwordGenerator = document.getElementById("passwordGenerator")
const lengthSlider = document.getElementById("lengthSlider")
const lengthOutput = document.getElementById("lengthOutput")

if (!(window.crypto && window.crypto.getRandomValues)) {
    console.log("Crypto API is unavailable")
}

lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
