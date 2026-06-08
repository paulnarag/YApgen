function getCrypto() {
    const cryptoObj = window.crypto || window.msCrypto;

    if (!cryptoObj || !cryptoObj.getRandomValues) {
        throw new Error("Cryptography API not supported in this environment.");
    }

    return cryptoObj;
}

export function getSecureRandomIndex(max) {
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

export function getRandomChar(charSet) {
    const randomIndex = getSecureRandomIndex(charSet.length);
    return charSet[randomIndex];
}

export function secureShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getSecureRandomIndex(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}