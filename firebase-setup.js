// Firebase configuration and setup
// You'll need to create a Firebase project at https://console.firebase.google.com/

// 1. Create a new Firebase project
// 2. Enable Firestore Database
// 3. Get your config object and replace the values below

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Database functions for contacts
export const contactsDB = {
    // Save contact
    async saveContact(contact) {
        try {
            if (contact.id && contact.id !== Date.now()) {
                // Update existing contact
                const contactRef = doc(db, 'contacts', contact.id.toString());
                await updateDoc(contactRef, contact);
            } else {
                // Add new contact
                const docRef = await addDoc(collection(db, 'contacts'), {
                    ...contact,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                contact.id = docRef.id;
            }
            return contact;
        } catch (error) {
            console.error('Error saving contact:', error);
            throw error;
        }
    },

    // Load all contacts
    async loadContacts() {
        try {
            const querySnapshot = await getDocs(collection(db, 'contacts'));
            const contacts = [];
            querySnapshot.forEach((doc) => {
                contacts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return contacts;
        } catch (error) {
            console.error('Error loading contacts:', error);
            return [];
        }
    },

    // Delete contact
    async deleteContact(contactId) {
        try {
            await deleteDoc(doc(db, 'contacts', contactId.toString()));
        } catch (error) {
            console.error('Error deleting contact:', error);
            throw error;
        }
    }
};

// Database functions for calendar events
export const calendarDB = {
    async saveEvent(event) {
        try {
            if (event.id && typeof event.id === 'string') {
                const eventRef = doc(db, 'events', event.id);
                await updateDoc(eventRef, event);
            } else {
                const docRef = await addDoc(collection(db, 'events'), {
                    ...event,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                event.id = docRef.id;
            }
            return event;
        } catch (error) {
            console.error('Error saving event:', error);
            throw error;
        }
    },

    async loadEvents() {
        try {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const events = [];
            querySnapshot.forEach((doc) => {
                events.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return events;
        } catch (error) {
            console.error('Error loading events:', error);
            return [];
        }
    },

    async deleteEvent(eventId) {
        try {
            await deleteDoc(doc(db, 'events', eventId.toString()));
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
};
