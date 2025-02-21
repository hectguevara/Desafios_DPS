import React from 'react';

const Contact = ({ contact, onDelete, onToggleFavorite }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: contact.favorite ? '#90ee90' : '#00FFFF',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div>
        <h3 style={{ margin: '0', color: '#333' }}>
          {contact.name} {contact.surname}
        </h3>
        <p style={{ margin: '5px 0', color: '#666' }}>{contact.phone}</p>
        <p style={{ margin: '0', color: '#888' }}>
          {contact.favorite ? '⭐ Favorito' : 'No favorito'}
        </p>
      </div>
      <div>
        <button
          onClick={() => onToggleFavorite(contact.id)}
          style={{
            backgroundColor: contact.favorite ? '#ffc107' : 'gray',
            color: 'black',
            border: 'groove',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          {contact.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          style={{
            backgroundColor: 'pink',
            color: 'red',
            border: 'ridge',
            borderRadius: '14px',
            padding: '8px 40px',
            cursor: 'pointer',
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Contact;