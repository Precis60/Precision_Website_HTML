const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('=== PRECISION WEBSITE STARTING ===');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Port:', PORT);
console.log('Working directory:', process.cwd());

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS headers for API requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from public directory
const publicPath = path.join(__dirname, 'public');
console.log('Public directory path:', publicPath);
console.log('Public directory exists:', fs.existsSync(publicPath));

app.use(express.static(publicPath));

// Database with safe file operations
let db = { contacts: [], events: [], loginDetails: [] };
const dbPath = path.join(__dirname, 'db.json');

function loadDatabase() {
  if (fs.existsSync(dbPath)) {
    try {
      const data = fs.readFileSync(dbPath, 'utf8');
      db = JSON.parse(data);
      console.log('Database loaded successfully');
      console.log('Data counts:', {
        contacts: (db.contacts || []).length,
        events: (db.events || []).length,
        loginDetails: (db.loginDetails || []).length
      });
    } catch (error) {
      console.error('Database load error:', error);
      db = { contacts: [], events: [], loginDetails: [] };
    }
  } else {
    console.log('No database file found, starting with empty data');
    saveDatabase(); // Create initial file
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('Database saved successfully');
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  }
}

// Load database on startup
loadDatabase();

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
  try {
    const newContact = { ...req.body, id: Date.now() };
    db.contacts = db.contacts || [];
    db.contacts.push(newContact);
    saveDatabase();
    res.json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

app.post('/events', (req, res) => {
  try {
    const newEvent = { ...req.body, id: Date.now() };
    db.events = db.events || [];
    db.events.push(newEvent);
    saveDatabase();
    res.json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.post('/loginDetails', (req, res) => {
  try {
    const newDetail = { ...req.body, id: Date.now() };
    db.loginDetails = db.loginDetails || [];
    db.loginDetails.push(newDetail);
    saveDatabase();
    res.json(newDetail);
  } catch (error) {
    console.error('Error creating login detail:', error);
    res.status(500).json({ error: 'Failed to create login detail' });
  }
});

// PUT endpoints for updating records
app.put('/contacts/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = db.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      db.contacts[index] = { ...db.contacts[index], ...req.body, id };
      saveDatabase();
      res.json(db.contacts[index]);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

app.put('/events/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = db.events.findIndex(e => e.id === id);
    if (index !== -1) {
      db.events[index] = { ...db.events[index], ...req.body, id };
      saveDatabase();
      res.json(db.events[index]);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.put('/loginDetails/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = db.loginDetails.findIndex(l => l.id === id);
    if (index !== -1) {
      db.loginDetails[index] = { ...db.loginDetails[index], ...req.body, id };
      saveDatabase();
      res.json(db.loginDetails[index]);
    } else {
      res.status(404).json({ error: 'Login detail not found' });
    }
  } catch (error) {
    console.error('Error updating login detail:', error);
    res.status(500).json({ error: 'Failed to update login detail' });
  }
});

// DELETE endpoints
app.delete('/contacts/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const initialLength = db.contacts.length;
    db.contacts = db.contacts.filter(c => c.id !== id);
    if (db.contacts.length < initialLength) {
      saveDatabase();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

app.delete('/events/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const initialLength = db.events.length;
    db.events = db.events.filter(e => e.id !== id);
    if (db.events.length < initialLength) {
      saveDatabase();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

app.delete('/loginDetails/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const initialLength = db.loginDetails.length;
    db.loginDetails = db.loginDetails.filter(l => l.id !== id);
    if (db.loginDetails.length < initialLength) {
      saveDatabase();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Login detail not found' });
    }
  } catch (error) {
    console.error('Error deleting login detail:', error);
    res.status(500).json({ error: 'Failed to delete login detail' });
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
