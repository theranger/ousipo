async function decrypt(key, iv, data, dst, log) {
    try {
        if (key === "") throw "Password cannot be empty.";
        
        const hash = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(key))
        
        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            hash,
            { name: "AES-CBC"} ,
            false,
            ["decrypt"]
        );

        const text = await window.crypto.subtle.decrypt(
            { name: "AES-CBC", iv: base64ToArray(iv)},
            cryptoKey,
            base64ToArray(data)
        );
        
        dst.innerHTML = new TextDecoder("utf-8").decode(text);
    }
    catch(err) {
        log.innerHTML = err.toString() === "OperationError" ? "Password is incorrect." : err;
    }
}

function base64ToArray(data) {
    const str = atob(data);
    const ret = new Uint8Array(str.length);
    for(let i = 0; i < str.length; i++) ret[i] = str.charCodeAt(i);
    return ret;
}
