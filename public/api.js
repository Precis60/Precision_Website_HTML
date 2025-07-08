// API functions for JSON Server
const API_BASE_URL = 'http://localhost:3000'; // Change this to your server URL

export const api = {
    // Contacts API
    contacts: {
        async getAll() {
            const response = await fetch(`${API_BASE_URL}/contacts`);
            return response.json();
        },

        async create(contact) {
            const response = await fetch(`${API_BASE_URL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact)
            });
            return response.json();
        },

        async update(id, contact) {
            const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact)
            });
            return response.json();
        },

        async delete(id) {
            const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        }
    },

    // Events API
    events: {
        async getAll() {
            const response = await fetch(`${API_BASE_URL}/events`);
            return response.json();
        },

        async create(event) {
            const response = await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });
            return response.json();
        },

        async update(id, event) {
            const response = await fetch(`${API_BASE_URL}/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });
            return response.json();
        },

        async delete(id) {
            const response = await fetch(`${API_BASE_URL}/events/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        }
    },

    // Login Details API
    loginDetails: {
        async getAll() {
            const response = await fetch(`${API_BASE_URL}/loginDetails`);
            return response.json();
        },

        async create(loginDetail) {
            const response = await fetch(`${API_BASE_URL}/loginDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetail)
            });
            return response.json();
        },

        async update(id, loginDetail) {
            const response = await fetch(`${API_BASE_URL}/loginDetails/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetail)
            });
            return response.json();
        },

        async delete(id) {
            const response = await fetch(`${API_BASE_URL}/loginDetails/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        }
    }
};
