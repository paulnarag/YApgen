const passwordInput = document.getElementById("passwordInput")
const databreachStatus = document.getElementById("databreachStatus")

async function sha1(input) {
    // Encode the input string to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    // Generate the SHA-1 hash
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
    
    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex; // Return the SHA-1 hash as a hex string
}
// Example usage
sha1("Hello, World!").then(hash => console.log(hash));

passwordInput.addEventListener("input", (e) => {
    const password = e.target.value

    if (password == "") {
        databreachStatus.textContent = "Enter a password to check."
        return
    }

})
