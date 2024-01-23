import css from './ContactForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid'

import { addContsct } from '../../redux/contactSlice/contactSlice.js';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contactsScope.contacts);

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

  return (
    <div className={css.formAdd}>
        <form onSubmit={handleFormSubmit} className={css.form}>
          <h3 className={css.titleForm}>Name</h3>
          <input className={css.inputNum} type="text" name="name" required placeholder='Entered name'/>
          <h3 className={css.titleForm}>Number</h3>
          <input className={css.inputNum} type="tel" name="number" required placeholder='Entered number'/>
          <button className={css.buttonAdd} type='submit'>Add contact</button>
        </form>
      </div> 
  );
};

export { ContactForm };
       