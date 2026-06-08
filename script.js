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

let uppercaseStatus = includeUppercase.checked


if (!(window.crypto && window.crypto.getRandomValues)) {
    console.log("Crypto API is unavailable")
}



function generateSecurePassword(length = 20) {
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

function getCrypto() {
    const cryptoObj = window.crypto || window.msCrypto;

    if (!cryptoObj || !cryptoObj.getRandomValues) {
        throw new Error("Cryptography API not supported in this environment.");
    }

    return cryptoObj;
}

function getSecureRandomIndex(max) {
    const cryptoObj = getCrypto();
    const array = new Uint32Array(1);

    const maxValidValue = Math.floor(4294967296 / max) * max;

    let randomValue;

    do {
        cryptoObj.getRandomValues(array);
        randomValue = array[0];
    } while (randomValue >= maxValidValue);

    return randomValue % max;
}

function getRandomChar(charSet) {
    const randomIndex = getSecureRandomIndex(charSet.length);
    return charSet[randomIndex];
}

function secureShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getSecureRandomIndex(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}






lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
