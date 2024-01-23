import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/contactSlice/contactSlice.js';

import css from './Filter.module.css'

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(store => store.contactsScope.filter);

    const handleChangeFilter = event => {
        const newFilter = event.target.value;
        const action = setFilter(newFilter);
        dispatch(action);
    }
    
    return (
    <>
        <h3 className={css.title}>Find contacts by name</h3>
        <input 
            className={css.input}   
            type="text"
            name="findName"
            filter={filter}
            onChange={handleChangeFilter}
        />  
    </>
  );
};

export { Filter };