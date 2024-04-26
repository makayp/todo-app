function InputForm({
  type,
  placeholder,
  onSubmit,
  onChange,
  value,
  buttonText,
}) {
  return (
    <form className={type} onSubmit={onSubmit}>
      <input
        id='input'
        type='text'
        value={value}
        placeholder={placeholder}
        autoComplete='off'
        required
        onChange={onChange}
        autoFocus
      />
      {/* <input id='submit' type='submit' value='+' /> */}
      <button id='submit' type='submit'>
        {buttonText}
      </button>
    </form>
  );
}

export default InputForm;
