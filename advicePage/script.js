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

// AI GENERATED FUNCTION
function cleanSentence(text) {
    text = text.trim()

    if (text === "") {
        return ""
    }

    if (text.endsWith(".") || text.endsWith("!") || text.endsWith("?")) {
        return text
    }

    return text + "."
}

function checkPasswordStrength(password) {
    const result = zxcvbn(password)
    
    return {
        crackTime: result.crack_times_display.offline_fast_hashing_1e10_per_second,
        score: result.score,
        warning: result.feedback.warning,
        suggestions: result.feedback.suggestions
    }
}

passwordInput.addEventListener("input", async (e) => {
    const password = e.target.value

    if (password == "") {
        databreachStatus.textContent = "Enter a password to check."
        crackTime.textContent = "Enter a password to check."
        suggestions.textContent = "Enter a password to see suggestions."
        return
    }

    const strengthResult = checkPasswordStrength(password)

    crackTime.textContent = strengthResult.crackTime

    let adviceParts = []

    const warningText = cleanSentence(strengthResult.warning)

    if (warningText !== "") {
        adviceParts.push(warningText)
    }

    const suggestionTexts = strengthResult.suggestions
        .map(cleanSentence)
        .filter(text => text !== "")

    adviceParts.push(...suggestionTexts)

    if (adviceParts.length === 0) {
        suggestions.textContent = "No suggestions. This password looks stronger."
    } else {
        suggestions.textContent = adviceParts.join(" ")
    }

    const hash = await sha1(password)
    const breachResult = await callAPI(hash)

    if (breachResult.found === true) {
        databreachStatus.textContent = `This password has appeared in known data breaches ${breachResult.occurrences} time(s). You should not use this password.`
    } else if (breachResult.found === false) {
        databreachStatus.textContent = "This password was not found in known data breaches."
    } else {
        databreachStatus.textContent = "Unable to check this password right now. Please try again."
    }
})