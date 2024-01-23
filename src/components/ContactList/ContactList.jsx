import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../../redux/contactSlice/contactSlice.js';
import {selectVisibleContacts} from '../../redux/selectors/selectors.js'
import css from './ContactList.module.css';

const ContactList = () => {
    const dispatch = useDispatch();
    
    const handleDeleteContact = contactId => {
        const action = removeContact(contactId);
        dispatch(action);
    };

    const visibleContacts = useSelector(selectVisibleContacts);
    
    return (
        <ul className={css.listContscts}>
          {visibleContacts.length > 0 && visibleContacts.map(contact => 
            <li key={contact.id}>
                <p>
                    <span className={css.contactName}>{contact.name}</span>
                    <span className={css.contactNumber}>{contact.number}</span>
                    <button className={css.contactDelete} onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                </p>
            </li>)}
        </ul>
  );
};

export {ContactList};

