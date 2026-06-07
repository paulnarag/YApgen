console.log("Script loaded");


const passwordGenerator = document.getElementById("passwordGenerator")
const lengthSlider = document.getElementById("lengthSlider")
const lengthOutput = document.getElementById("lengthOutput")

if (!(window.crypto && window.crypto.getRandomValues)) {
    console.log("Crypto API is unavailable")
}

function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    const numberChars = "0123456789"
    const specialChars = "!@#$%^&*()-=_+[]{}|;:,.<>?/"

    let allChars = ""
    let password = ""

    if (includeNumbers) allChars += numberChars
    if (includeUppercase) allChars+=uppercaseChars
    if (!includeUppercase) allChars+=lowercaseChars

    const allCharsLength = allChars.length

    for (let i=0; i<length; i++) {
        const randomIndex = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * allCharsLength)
        password += allChars.charAt(randomIndex)
    }

    return password
}

lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
