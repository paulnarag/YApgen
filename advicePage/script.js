const passwordInput = document.getElementById("passwordInput")
const databreachStatus = document.getElementById("databreachStatus")

const crackTime = document.getElementById("crackTime")

const suggestionsTitle = document.getElementById("suggestionsTitle")
const suggestions = document.getElementById("suggestions")



// SHA-1 Function 
// https://mojoauth.com/hashing/sha-1-in-javascript-in-browser#implementing-sha-1-in-javascript-in-browser
async function sha1(input) {
    // Encode the input string to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    // Generate the SHA-1 hash
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
    
    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex.toUpperCase(); // Return the SHA-1 hash as a hex string
}

async function callAPI(hash) {
    const first5Chars = hash.slice(0, 5)
    const remainingChars = hash.slice(5)    

    const url = `https://api.pwnedpasswords.com/range/${first5Chars}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.text();
        const lines = result.split("\n")

        const found = lines.find(line => {
            const [suffix] = line.split(":")
            return suffix.trim() === remainingChars
        })

        if (found) {
            const [, occurrences] = found.split(":")
            return {
                found: true,
                occurrences: Number(occurrences.trim())
            }
        }

        return {
            found: false,
            occurrences: 0
        }

    } catch (error) {
        console.error(error.message);

        return {
            found: null,
            occurrences: null
        }
    }
}

function checkPasswordStrength(password) {
    const result = zxcvbn(password)
    
    return {
        crackTime: result.crack_times_display,
        score: result.score,
        warning: result.feedback.warning,
        suggestions: result.feedback.suggestions
    }
}

passwordInput.addEventListener("input", async (e) => {
    const password = e.target.value

    if (password == "") {
        databreachStatus.textContent = "Enter a password to check."
        return
    }

    const hash = await sha1(password)
    const result = await callAPI(hash)

    if (result.found === true) {
        databreachStatus.textContent = `This password has appeared in known data breaches ${result.occurrences} time(s). You should not use this password.`;
    } else if (result.found === false) {
        databreachStatus.textContent = "This password was not found in known data breaches.";
    } else {
        databreachStatus.textContent = "Unable to check this password right now. Please try again.";
    }
})