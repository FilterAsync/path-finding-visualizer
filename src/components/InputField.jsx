function InputField({ label, textarea, name, children, ...props }) {
	return (
		<div className="input-field">
			<label htmlFor={name}>{label}</label>
			{textarea ? <textarea id={name} {...props} /> : <input id={name} {...props} />}
			{children}
		</div>
	);
}

export default InputField;
