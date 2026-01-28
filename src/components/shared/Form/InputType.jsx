const InputType = ({
  labelText,
  lableForm,
  inputType,
  value,
  onChange,
  name,
  placeholder,
  required = true
}) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={lableForm}>
        {labelText}
        {!required && <span style={{ color: '#999', fontSize: '12px', marginLeft: '5px' }}>(optional)</span>}
      </label>
      <input
        type={inputType}
        name={name}
        id={lableForm}
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputType;
