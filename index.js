const express = require('express');
const app = express();
app.use(express.text());

let currentScript = "NO_SCRIPT";
let lastRobloxPing = 0;

app.post('/upload-script', (req, res) => {
    currentScript = req.body;
    console.log("Nový skript z Visual Studia přijat!");
    res.send("OK");
});

app.get('/get-script', (req, res) => {
    lastRobloxPing = Date.now();
    res.send(currentScript);
    currentScript = "NO_SCRIPT";
});

app.get('/check-status', (req, res) => {
    if (Date.now() - lastRobloxPing < 5000) {
        res.send("ACTIVE");
    } else {
        res.send("INACTIVE");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));

