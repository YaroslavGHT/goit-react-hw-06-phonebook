import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid'
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx'
import { ContactList } from './ContactList/ContactList.jsx'

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) ?? [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ]);
  const [filteredProfiles, setfilteredProfiles] = useState(contacts);

  useEffect(() => {
    const saveLocalContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', saveLocalContacts); 
  }, [contacts]);

  useEffect(() => {
    const filteredProf = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
    setfilteredProfiles(filteredProf);
  }, [contacts, filter]);

  const handleChangeFilter = event => {
    const newFilter = event.target.value;
    return setFilter(newFilter);
  }

  const handleDeleteContact = contactId => {
    const contactAfterDel = contacts.filter(contact => contact.id !== contactId);
    return setContacts(contactAfterDel);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;
    const id = nanoid();
    const newContact = {
      name,
      number,
      id
    }
    handleAddProfile(newContact);
    event.currentTarget.reset();
  };

  const handleAddProfile = (newContact) => {
    const checkDuplication = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (checkDuplication) {
      alert(`${newContact.name} is alredy in contscts`);
      return;
    }
    return setContacts([...contacts, newContact]);
  };
  
  // const filteredProfiles = useMemo(() => {
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  //   );
  // }, [contacts, filter]);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm
        handleFormSubmit={handleFormSubmit}
      />
      <h2>Contacts</h2>
      <Filter
        handleChangeFilter={handleChangeFilter}
        value={filter}
      />
      <ContactList
        filteredProfiles={filteredProfiles}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
  
};
