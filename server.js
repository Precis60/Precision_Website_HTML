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

// PUT endpoints for updating records
app.put('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.contacts.findIndex(c => c.id === id);
  if (index !== -1) {
    db.contacts[index] = { ...db.contacts[index], ...req.body, id };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.contacts[index]);
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
});

app.put('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.events.findIndex(e => e.id === id);
  if (index !== -1) {
    db.events[index] = { ...db.events[index], ...req.body, id };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.events[index]);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.put('/loginDetails/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.loginDetails.findIndex(l => l.id === id);
  if (index !== -1) {
    db.loginDetails[index] = { ...db.loginDetails[index], ...req.body, id };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.loginDetails[index]);
  } else {
    res.status(404).json({ error: 'Login detail not found' });
  }
});

// DELETE endpoints
app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = db.contacts.length;
  db.contacts = db.contacts.filter(c => c.id !== id);
  if (db.contacts.length < initialLength) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
});

app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = db.events.length;
  db.events = db.events.filter(e => e.id !== id);
  if (db.events.length < initialLength) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.delete('/loginDetails/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = db.loginDetails.length;
  db.loginDetails = db.loginDetails.filter(l => l.id !== id);
  if (db.loginDetails.length < initialLength) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Login detail not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.url });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Precision Website running on port ${PORT}`);
});
