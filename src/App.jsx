import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid'

import { addContsct, removeContact, setFilter } from './redux/redux.js';

import { ContactForm } from './components/ContactForm/ContactForm.jsx';
import { Filter } from './components/Filter/Filter.jsx'
import { ContactList } from './components/ContactList/ContactList.jsx'
import css from './App.module.css'

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contactsScope.contacts);
  const filter = useSelector(store => store.contactsScope.filter);

  const handleChangeFilter = event => {
    const newFilter = event.target.value;
    const action = setFilter(newFilter);
    dispatch(action);
  }

  const handleDeleteContact = contactId => {
    const action = removeContact(contactId);
    dispatch(action);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;
    const id = nanoid();
    const newContact = { name, number, id };
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
    const action = addContsct(newContact);
    dispatch(action);
  };
  
  const filteredProfiles = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }, [contacts, filter]);
  
  return (
    <div className={css.main}>
      <h2 className={css.title}>Phonebook</h2>
      <div className={css.form}>
        <ContactForm
          handleFormSubmit={handleFormSubmit}
        />
      </div>
      <h2 className={css.title}>Contacts</h2>
      <div className={css.formFilter}>
        <Filter
          handleChangeFilter={handleChangeFilter}
          value={filter}
        />
      </div>
      <div className={css.listContact}>
        <ContactList
          filteredProfiles={filteredProfiles}
          handleDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
