console.log("Script loaded");


const passwordGenerator = document.getElementById("passwordGenerator")
const lengthSlider = document.getElementById("lengthSlider")
const lengthOutput = document.getElementById("lengthOutput")

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
  
  // 1. Ensure at least one character from each set is included
  const mandatory = [
    getRandomChar(uppercase),
    getRandomChar(lowercase),
    getRandomChar(numbers),
    getRandomChar(symbols)
  ];

  // 2. Build the remaining pool of characters
  const allChars = uppercase + lowercase + numbers + symbols;
  const pool = [];
  
  // Fill the rest of the password length
  const remainingLength = length - mandatory.length;
  for (let i = 0; i < remainingLength; i++) {
    pool.push(getRandomChar(allChars));
  }

  // 3. Combine and securely shuffle the arrays to hide pattern positions
  const combined = [...mandatory, ...pool];
  return secureShuffle(combined).join('');
}

// Securely picks a single character using the Web Crypto API
function getRandomChar(charSet) {
  const cryptoObj = window.crypto || window.msCrypto;
  if (!cryptoObj) {
    throw new Error("Cryptography API not supported in this environment.");
  }

  const array = new Uint32Array(1);
  let randomValue;
  
  // Eliminate modulo bias by discarding values that fall outside an exact multiple
  const maxValidValue = Math.floor(4294967296 / charSet.length) * charSet.length;
  
  do {
    cryptoObj.getRandomValues(array);
    randomValue = array[0];
  } while (randomValue >= maxValidValue);

  return charSet[randomValue % charSet.length];
}

// Securely shuffles an array using the Fisher-Yates algorithm and CSPRNG
function secureShuffle(array) {
  const cryptoObj = window.crypto || window.msCrypto;
  const uint32Array = new Uint32Array(array.length);
  cryptoObj.getRandomValues(uint32Array);

  for (let i = array.length - 1; i > 0; i--) {
    const j = uint32Array[i] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Example usage:
const mySecurePassword = generateSecurePassword(24);
console.log(mySecurePassword);




lengthOutput.innerHTML = lengthSlider.value

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value
}
