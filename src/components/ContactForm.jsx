import { useState } from 'react';

const ContactForm = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const data = {
            nombre,
            apellido,
            telefono
        };

        fetch('https://railway-node-express-production-3b13.up.railway.app/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.exito) {
                    console.log('Contact created successfully:', result.nombre + ' ' + result.apellido + ' ' + result.telefono);
                    setNombre('');
                    setApellido('');
                    setTelefono('');
                } else {
                    console.error('Error creating contact:', result.error);
                }
            })
            .catch(error => {
                console.error('Error creating contact:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="First name"
                aria-label="First name"
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                name="nombre"
            />
            <input
                placeholder="Last name"
                aria-label="Last name"
                type="text"
                value={apellido}
                onChange={e => setApellido(e.target.value)}
                name="apellido"
            />
            <input
                placeholder="Phone number"
                aria-label="Phone number"
                type="text"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                name="telefono"
            />
            <button type="submit">New</button>
        </form>
    );
};

export default ContactForm;