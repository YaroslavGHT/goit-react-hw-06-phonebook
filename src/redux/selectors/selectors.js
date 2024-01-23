import { createSelector } from 'reselect'

const selectContacts = (store) => store.contactsScope.contacts;
const selectFilter = (store) => store.contactsScope.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = (filter || '').toLowerCase().trim();

    if (!normalizedFilter) {
      return contacts;
    }

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
