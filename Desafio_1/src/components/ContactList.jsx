import React, { useState, useEffect } from 'react';
import Contact from './Contact';
import contactsData from '../data/contacts.json';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', surname: '', phone: '' });

  useEffect(() => {
    setContacts(contactsData);
  }, []);

  const addContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.surname || !newContact.phone) return;

    const newEntry = {
      id: Date.now(),
      ...newContact,
      favorite: false,
    };

    setContacts([...contacts, newEntry]);
    setNewContact({ name: '', surname: '', phone: '' });
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const toggleFavorite = (id) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
    ));
  };

  return (
    <div>
      <h2>Lista de Contactos</h2>
      <form onSubmit={addContact} style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newContact.surname}
          onChange={(e) => setNewContact({ ...newContact, surname: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <button type="submit">Agregar Contacto</button>
      </form>
      {contacts
        .sort((a, b) => b.favorite - a.favorite)
        .map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            onDelete={deleteContact}
            onToggleFavorite={toggleFavorite}
          />
        ))}
    </div>
  );
};

export default ContactList;