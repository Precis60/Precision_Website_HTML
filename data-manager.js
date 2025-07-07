// Database abstraction layer - switches between localStorage and API
class DataManager {
    constructor(useAPI = false) {
        this.useAPI = useAPI;
        // Use the correct URL for your environment
        this.apiBaseUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000' 
            : 'https://your-app-name.railway.app'; // Replace with your actual deployment URL
    }

    // Contacts methods
    async getContacts() {
        if (this.useAPI) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/contacts`);
                return await response.json();
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                return JSON.parse(localStorage.getItem('precisionContacts')) || [];
            }
        } else {
            return JSON.parse(localStorage.getItem('precisionContacts')) || [];
        }
    }

    async saveContact(contact) {
        if (this.useAPI) {
            try {
                const method = contact.id && typeof contact.id === 'string' ? 'PUT' : 'POST';
                const url = contact.id && typeof contact.id === 'string' 
                    ? `${this.apiBaseUrl}/contacts/${contact.id}` 
                    : `${this.apiBaseUrl}/contacts`;
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contact)
                });
                return await response.json();
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                // Fallback to localStorage
                let contacts = JSON.parse(localStorage.getItem('precisionContacts')) || [];
                if (!contact.id) {
                    contact.id = Date.now();
                    contacts.push(contact);
                } else {
                    const index = contacts.findIndex(c => c.id === contact.id);
                    if (index !== -1) {
                        contacts[index] = contact;
                    }
                }
                localStorage.setItem('precisionContacts', JSON.stringify(contacts));
                return contact;
            }
        } else {
            let contacts = JSON.parse(localStorage.getItem('precisionContacts')) || [];
            if (!contact.id) {
                contact.id = Date.now();
                contacts.push(contact);
            } else {
                const index = contacts.findIndex(c => c.id === contact.id);
                if (index !== -1) {
                    contacts[index] = contact;
                }
            }
            localStorage.setItem('precisionContacts', JSON.stringify(contacts));
            return contact;
        }
    }

    async deleteContact(contactId) {
        if (this.useAPI) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/contacts/${contactId}`, {
                    method: 'DELETE'
                });
                return response.ok;
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                // Fallback to localStorage
                let contacts = JSON.parse(localStorage.getItem('precisionContacts')) || [];
                contacts = contacts.filter(contact => contact.id !== contactId);
                localStorage.setItem('precisionContacts', JSON.stringify(contacts));
                return true;
            }
        } else {
            let contacts = JSON.parse(localStorage.getItem('precisionContacts')) || [];
            contacts = contacts.filter(contact => contact.id !== contactId);
            localStorage.setItem('precisionContacts', JSON.stringify(contacts));
            return true;
        }
    }

    // Events methods
    async getEvents() {
        if (this.useAPI) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/events`);
                return await response.json();
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                return JSON.parse(localStorage.getItem('calendarEvents')) || [];
            }
        } else {
            return JSON.parse(localStorage.getItem('calendarEvents')) || [];
        }
    }

    async saveEvent(event) {
        if (this.useAPI) {
            try {
                const method = event.id && typeof event.id === 'string' ? 'PUT' : 'POST';
                const url = event.id && typeof event.id === 'string' 
                    ? `${this.apiBaseUrl}/events/${event.id}` 
                    : `${this.apiBaseUrl}/events`;
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event)
                });
                return await response.json();
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                // Fallback to localStorage
                let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
                if (!event.id) {
                    event.id = Date.now();
                    events.push(event);
                } else {
                    const index = events.findIndex(e => e.id === event.id);
                    if (index !== -1) {
                        events[index] = event;
                    }
                }
                localStorage.setItem('calendarEvents', JSON.stringify(events));
                return event;
            }
        } else {
            let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
            if (!event.id) {
                event.id = Date.now();
                events.push(event);
            } else {
                const index = events.findIndex(e => e.id === event.id);
                if (index !== -1) {
                    events[index] = event;
                }
            }
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            return event;
        }
    }

    async deleteEvent(eventId) {
        if (this.useAPI) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/events/${eventId}`, {
                    method: 'DELETE'
                });
                return response.ok;
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                // Fallback to localStorage
                let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
                events = events.filter(event => event.id !== eventId);
                localStorage.setItem('calendarEvents', JSON.stringify(events));
                return true;
            }
        } else {
            let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
            events = events.filter(event => event.id !== eventId);
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            return true;
        }
    }

    // Login Details methods
    async getLoginDetails() {
        if (this.useAPI) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/loginDetails`);
                return await response.json();
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                return JSON.parse(localStorage.getItem('loginDetails')) || [];
            }
        } else {
            return JSON.parse(localStorage.getItem('loginDetails')) || [];
        }
    }

    async saveLoginDetail(loginDetail) {
        if (this.useAPI) {
            try {
                const method = loginDetail.id && typeof loginDetail.id === 'string' ? 'PUT' : 'POST';
                const url = loginDetail.id && typeof loginDetail.id === 'string' 
                    ? `${this.apiBaseUrl}/loginDetails/${loginDetail.id}` 
                    : `${this.apiBaseUrl}/loginDetails`;
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginDetail)
                });
                return await response.json();
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                // Fallback to localStorage
                let loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];
                if (!loginDetail.id) {
                    loginDetail.id = Date.now();
                    loginDetails.push(loginDetail);
                } else {
                    const index = loginDetails.findIndex(l => l.id === loginDetail.id);
                    if (index !== -1) {
                        loginDetails[index] = loginDetail;
                    }
                }
                localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
                return loginDetail;
            }
        } else {
            let loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];
            if (!loginDetail.id) {
                loginDetail.id = Date.now();
                loginDetails.push(loginDetail);
            } else {
                const index = loginDetails.findIndex(l => l.id === loginDetail.id);
                if (index !== -1) {
                    loginDetails[index] = loginDetail;
                }
            }
            localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
            return loginDetail;
        }
    }

    async deleteLoginDetail(loginDetailId) {
        if (this.useAPI) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/loginDetails/${loginDetailId}`, {
                    method: 'DELETE'
                });
                return response.ok;
            } catch (error) {
                console.error('API Error, falling back to localStorage:', error);
                // Fallback to localStorage
                let loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];
                loginDetails = loginDetails.filter(detail => detail.id !== loginDetailId);
                localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
                return true;
            }
        } else {
            let loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];
            loginDetails = loginDetails.filter(detail => detail.id !== loginDetailId);
            localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
            return true;
        }
    }
}

// Initialize the data manager
// Set to true to use API, false to use localStorage
const dataManager = new DataManager(true); // Using API for online storage
