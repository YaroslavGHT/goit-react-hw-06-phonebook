import css from './Filter.module.css'

const Filter = ({
    handleChangeFilter,
    value
    }) => {
    return (
    <>
        <h3 className={css.title}>Find contacts by name</h3>
        <input 
            className={css.input}   
            type="text"
            name="findName"
            value={value}
            onChange={handleChangeFilter}
        />  
    </>
  );
};

export { Filter };