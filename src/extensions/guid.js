

const randomHexDigit = () => {
    return Math.floor(Math.random() * 16).toString(16);
}

const createGuid = () => {
    let uuid = '';
    for (let i = 0; i < 32; i++) {
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        if (i === 12) {
            uuid += '4'; // A versão do UUID v4
        } else if (i === 16) {
            uuid += (Math.floor(Math.random() * 4) + 8).toString(16); // Variante
        } else {
            uuid += randomHexDigit();
        }
    }
    return uuid;
}

export default createGuid;