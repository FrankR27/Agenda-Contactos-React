import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://railway-node-express-production-3b13.up.railway.app/scrape')
      .then(response => response.json())
      .then(data => {
        const contacts = data || [];
        setContacts(contacts);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  const filterContacts = () => {
    return contacts.filter(contact => {
      const contactName = `${contact.nombre || ''} ${contact.apellido || ''}`.toLowerCase();
      return contactName.includes(searchTerm.toLowerCase());
    });
  };

  return (
    <div id="sidebar">
      <h1>Contacts</h1>
      <div>
        <form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div id="search-spinner" aria-hidden="true" hidden></div>
          <div className="sr-only" aria-live="polite"></div>
        </form>
        <ContactForm />
      </div>
      <nav id="contact-list-container">
        <ContactList contacts={filterContacts()} />
      </nav>
    </div>
  );
}

export default App;
