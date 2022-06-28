function InputField({ label, textarea, name, children, ...props }) {
	return (
		<div className="input-field">
			<label htmlFor={name}>{label}</label>
			{textarea ? <textarea name={name} {...props} /> : <input name={name} {...props} />}
			{children}
		</div>
	);
}

export default InputField;