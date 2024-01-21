import css from './ContactForm.module.css'

const ContactForm = ({
  handleFormSubmit
}) => {
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
       