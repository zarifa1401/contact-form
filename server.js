const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'contacts.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

const readData = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET /api/contacts
app.get('/api/contacts', (req, res) => {
    const contacts = readData();
    res.status(200).json(contacts);
});

// POST /api/contacts
app.post('/api/contacts', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    const newContact = {
        id: Date.now(),
        name,
        email,
        subject: subject || 'No Subject',
        message,
        date: new Date().toISOString()
    };

    const contacts = readData();
    contacts.push(newContact);
    writeData(contacts);

    res.status(201).json({ message: 'Contact saved successfully!', contact: newContact });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});