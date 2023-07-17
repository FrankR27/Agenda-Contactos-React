/* eslint-disable react/prop-types */

// Generar id único para cada contacto con uuid
import uuid from 'react-uuid';

const ContactList = ({ contacts }) => {
    return (
        <ul id="contact-list">
            {contacts.map(contact => (
                <li key={uuid()}>
                    {contact.nombre || contact.apellido ? `${contact.nombre} ${contact.apellido}` : "No Name"}
                </li>
            ))}
        </ul>
    );
};

export default ContactList;