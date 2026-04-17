<!DOCTYPE html>
<html>
<head>
    <title>Substitution Cipher</title>

    <style>
        body {
            font-family: Arial;
            text-align: center;
            margin-top: 100px;
            background-color: #e6f2ff;
        }

        h1 {
            color: black;
        }

        button {
            padding: 10px 25px;
            margin: 10px;
            font-size: 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }


        button:hover {
            background-color: #45a049;
        }

        #result {
            margin-top: 25px;
            font-size: 14px;
            color: black;


            background-color: #ffffff;
            border: 2px solid #4CAF50;
            padding: 15px;
            width: 300px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>

<body>

    <h1>Substitution Cipher</h1>

    <button onclick="affineCipher()">Affine Cipher</button>
    <button onclick="vigenereCipher()">Vigenere Cipher</button>
    <button onclick="playfairCipher()">Playfair Cipher</button>


    <div id="result">

    </div>

    <script src="script.js"></script>
</body>
</html>



///Script file

// -------- AFFINE CIPHER --------
function affineCipher() {
    let text = prompt("Enter the message to encrypt:");
    if (text === null || text === "") return;

    let a = 5;
    let b = 8;
    let a_inv = 21;

    let encrypted = "";
    let decrypted = "";
    let intermediate = "<b>Intermediate Encryption Steps:</b><br>";

    // Encryption
    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        if (ch >= 'A' && ch <= 'Z') {
            let x = ch.charCodeAt(0) - 65;
            let enc = (a * x + b) % 26;
            let res = String.fromCharCode(enc + 65);
            intermediate += `${ch} (val:${x}) -> (5*${x}+8)%26 = ${enc} (${res})<br>`;
            encrypted += res;
        }
        else if (ch >= 'a' && ch <= 'z') {
            let x = ch.charCodeAt(0) - 97;
            let enc = (a * x + b) % 26;
            let res = String.fromCharCode(enc + 97);
            intermediate += `${ch} (val:${x}) -> (5*${x}+8)%26 = ${enc} (${res})<br>`;
            encrypted += res;
        }
        else {
            encrypted += ch;
        }
    }

    // Decryption (Logic remains exactly yours)
    for (let i = 0; i < encrypted.length; i++) {
        let ch = encrypted[i];
        if (ch >= 'A' && ch <= 'Z') {
            let y = ch.charCodeAt(0) - 65;
            let dec = (a_inv * (y - b + 26)) % 26;
            decrypted += String.fromCharCode(dec + 65);
        }
        else if (ch >= 'a' && ch <= 'z') {
            let y = ch.charCodeAt(0) - 97;
            let dec = (a_inv * (y - b + 26)) % 26;
            decrypted += String.fromCharCode(dec + 97);
        }
        else {
            decrypted += ch;
        }
    }

    document.getElementById("result").innerHTML =
        "<b>Affine Cipher</b><br><br>" +
        intermediate + "<br>" +
        "Encrypted Text: " + encrypted + "<br>" +
        "Decrypted Text: " + decrypted;
}

// -------- VIGENERE CIPHER --------
function vigenereCipher() {
    let text = prompt("Enter the message:");
    let key = prompt("Enter the key:");
    if (text === null || key === null || text === "" || key === "") return;

    text = text.toUpperCase();
    key = key.toUpperCase();

    let encrypted = "";
    let decrypted = "";
    let keyMapping = ""; // To show intermediate key alignment
    let j = 0;

    // ENCRYPTION
    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        if (ch >= 'A' && ch <= 'Z') {
            let p = ch.charCodeAt(0) - 65;
            let kChar = key[j % key.length];
            let k = kChar.charCodeAt(0) - 65;

            keyMapping += kChar; // Store aligned key char
            let c = (p + k) % 26;
            encrypted += String.fromCharCode(c + 65);
            j++;
        } else {
            encrypted += ch;
            keyMapping += " ";
        }
    }

    // DECRYPTION (Logic remains exactly yours)
    j = 0;
    for (let i = 0; i < encrypted.length; i++) {
        let ch = encrypted[i];
        if (ch >= 'A' && ch <= 'Z') {
            let c = ch.charCodeAt(0) - 65;
            let k = key[j % key.length].charCodeAt(0) - 65;
            let p = (c - k + 26) % 26;
            decrypted += String.fromCharCode(p + 65);
            j++;
        } else {
            decrypted += ch;
        }
    }

    document.getElementById("result").innerHTML =
        "<b>Vigenere Cipher</b><br><br>" +
        "Intermediate Key Alignment:<br>" +
        "<pre>Text: " + text + "<br>Key:  " + keyMapping + "</pre><br>" +
        "Encrypted Text: " + encrypted + "<br>" +
        "Decrypted Text: " + decrypted;
}

// -------- PLAYFAIR CIPHER --------
function playfairCipher() {
    let text = prompt("Enter message:");
    let key = prompt("Enter key:");
    if (text === null || key === null || text === "" || key === "") return;

    text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");

    let matrix = [];
    let used = "";
    for (let i = 0; i < key.length; i++) {
        if (!used.includes(key[i])) used += key[i];
    }
    for (let i = 0; i < 26; i++) {
        let ch = String.fromCharCode(65 + i);
        if (ch === 'J') continue;
        if (!used.includes(ch)) used += ch;
    }

    let index = 0;
    let matrixDisplay = "<b>5x5 Matrix:</b><br>";
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
        for (let j = 0; j < 5; j++) {
            matrix[i][j] = used[index++];
            matrixDisplay += matrix[i][j] + " ";
        }
        matrixDisplay += "<br>";
    }

    let prepared = "";
    for (let i = 0; i < text.length; i++) {
        prepared += text[i];
        if (i + 1 < text.length && text[i] === text[i + 1]) prepared += "X";
    }
    if (prepared.length % 2 !== 0) prepared += "X";

    function findPos(char) {
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (matrix[r][c] === char) return { r, c };
            }
        }
    }

    // ENCRYPTION
    let encrypted = "";
    let digraphs = "<b>Intermediate Digraphs:</b> ";
    for (let i = 0; i < prepared.length; i += 2) {
        digraphs += prepared[i] + prepared[i+1] + " ";
        let p1 = findPos(prepared[i]);
        let p2 = findPos(prepared[i + 1]);

        if (p1.r === p2.r) {
            encrypted += matrix[p1.r][(p1.c + 1) % 5];
            encrypted += matrix[p2.r][(p2.c + 1) % 5];
        } else if (p1.c === p2.c) {
            encrypted += matrix[(p1.r + 1) % 5][p1.c];
            encrypted += matrix[(p2.r + 1) % 5][p2.c];
        } else {
            encrypted += matrix[p1.r][p2.c];
            encrypted += matrix[p2.r][p1.c];
        }
    }

    // DECRYPTION (Logic remains exactly yours)
    let decrypted = "";
    for (let i = 0; i < encrypted.length; i += 2) {
        let p1 = findPos(encrypted[i]);
        let p2 = findPos(encrypted[i + 1]);
        if (p1.r === p2.r) {
            decrypted += matrix[p1.r][(p1.c + 4) % 5];
            decrypted += matrix[p2.r][(p2.c + 4) % 5];
        } else if (p1.c === p2.c) {
            decrypted += matrix[(p1.r + 4) % 5][p1.c];
            decrypted += matrix[(p2.r + 4) % 5][p2.c];
        } else {
            decrypted += matrix[p1.r][p2.c];
            decrypted += matrix[p2.r][p1.c];
        }
    }

    document.getElementById("result").innerHTML =
        "<b>Playfair Cipher</b><br><br>" +
        matrixDisplay + "<br>" +
        digraphs + "<br><br>" +
        "Encrypted Text: " + encrypted + "<br>" +
        "Decrypted Text: " + decrypted;
}
