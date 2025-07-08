const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting Precision Website...');
console.log('Port:', PORT);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Database
let db = { contacts: [], events: [], loginDetails: [] };
const dbPath = path.join(__dirname, 'db.json');

if (fs.existsSync(dbPath)) {
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    console.log('Database loaded successfully');
  } catch (error) {
    console.error('Database load error:', error);
  }
}

// Routes
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <h1>Precision Cabling & Automation</h1>
      <p>Server is running on port ${PORT}</p>
      <ul>
        <li><a href="/calendar.html">Calendar</a></li>
        <li><a href="/contacts.html">Contacts</a></li>
        <li><a href="/login-details.html">Login Details</a></li>
      </ul>
    `);
  }
});

// API endpoints
app.get('/contacts', (req, res) => res.json(db.contacts || []));
app.get('/events', (req, res) => res.json(db.events || []));
app.get('/loginDetails', (req, res) => res.json(db.loginDetails || []));

app.post('/contacts', (req, res) => {
  const newContact = { ...req.body, id: Date.now() };
  db.contacts = db.contacts || [];
  db.contacts.push(newContact);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(newContact);
});

app.post('/events', (req, res) => {
  const newEvent = { ...req.body, id: Date.now() };
  db.events = db.events || [];
  db.events.push(newEvent);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(newEvent);
});

app.post('/loginDetails', (req, res) => {
  const newDetail = { ...req.body, id: Date.now() };
  db.loginDetails = db.loginDetails || [];
  db.loginDetails.push(newDetail);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(newDetail);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Precision Website running on port ${PORT}`);
});
